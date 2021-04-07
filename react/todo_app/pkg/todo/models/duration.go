package models

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"time"

	"gorm.io/gorm"
)

type NullTime struct {
	sql.NullTime
}

func (t NullTime) MarshalJSON() ([]byte, error) {
	if t.Valid {
		return json.Marshal(t.Time)
	} else {
		return json.Marshal(nil)
	}
}

func (t *NullTime) UnmarshalJSON(data []byte) error {
	// Unmarshalling into a pointer will let us detect null
	var x *time.Time
	if err := json.Unmarshal(data, &x); err != nil {
		return err
	}
	if x != nil {
		t.Valid = true
		t.Time = *x
	} else {
		t.Valid = false
	}
	return nil
}

type Duration struct {
	DB *gorm.DB `gorm:"-" json:"-"`

	// gorm.Model をフィールドに持つとdeletedAtもくっついてくるから
	// 論理削除になってしまう。
	ID        uint `gorm:"primarykey" json:"id"`
	CreatedAt time.Time
	UpdatedAt time.Time

	Start time.Time `json:"start"`
	End   NullTime  `json:"end"`
	// End   NullTime  `json:"end" gorm:"default:'NULL'"`

	UserID int
	User   *User `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type IDuration interface {
	Creat() error
	Read() error
	Update() error
	Delete() error
}

func (duration *Duration) Create() error {
	err := duration.DB.Create(&duration).Error
	return err
}

// Duration.IDに欲しいレコードのIDを入れておいてね。
func (duration *Duration) Read() error {
	err := duration.DB.Take(&duration, duration.ID).Error
	return err
}

func (duration *Duration) Update() error {
	err := duration.DB.Updates(duration).Error
	return err
}

func (duration *Duration) Delete() error {
	err := duration.DB.Delete(&duration).Error
	return err
}

func ConstructDuration(db *gorm.DB) *Duration {
	return &Duration{DB: db}
}

type Durations []Duration

type IDurations interface {
	All(db *gorm.DB, user User) error
	DeleteAll(db *gorm.DB, user User) error
}

func (durations *Durations) All(db *gorm.DB, user User) error {
	err := db.Find(&durations, " user_id = ? ", user.ID).Error
	for _, duration := range *durations {
		duration.DB = db
	}
	return err
}
func (durations *Durations) FetchWithPeriod(db *gorm.DB, start time.Time, end time.Time, user User) error {
	err := db.Where("start >= ? AND ( end <= ? OR end IS NULL ) AND user_id = ? ", start, end, user.ID).Find(&durations).Error
	fmt.Println("end", end)
	for _, duration := range *durations {
		duration.DB = db
	}
	return err
}

func (durations *Durations) FetchAllToday(db *gorm.DB, user User) error {
	now := time.Now()
	today := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, time.Local)
	tommorow := today.AddDate(0, 0, 1)
	err := durations.FetchWithPeriod(db, today, tommorow, user)
	return err
}

func (durations *Durations) DeleteAll(db *gorm.DB, user User) error {
	err := db.Session(&gorm.Session{AllowGlobalUpdate: true}).Delete(&Duration{}, " user_id = ? ", user.ID).Error
	return err
}
