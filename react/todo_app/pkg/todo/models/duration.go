package models

import (
	"time"

	"gorm.io/gorm"
)

type Duration struct {
	DB *gorm.DB `gorm:"-" json:"-"`

	// gorm.Model をフィールドに持つとdeletedAtもくっついてくるから
	// 論理削除になってしまう。
	ID        uint `gorm:"primarykey" json:"id"`
	CreatedAt time.Time
	UpdatedAt time.Time

	Start time.Time `json:"start"`
	End   time.Time `json:"end"`
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
	err := duration.DB.First(&duration, duration.ID).Error
	return err
}

func (duration *Duration) Update() error {
	err := duration.DB.Save(&duration).Error
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
	All(db *gorm.DB) error
	DeleteAll(db *gorm.DB) error
}

func (durations *Durations) All(db *gorm.DB) error {
	err := db.Find(&durations).Error
	for _, duration := range *durations {
		duration.DB = db
	}
	return err
}
func (durations *Durations) FetchWithPeriod(db *gorm.DB, start time.Time, end time.Time) error {
	err := db.Where("start >= ? AND end <= ?", start, end).Find(&durations).Error
	for _, duration := range *durations {
		duration.DB = db
	}
	return err
}

func (durations *Durations) FetchAllToday(db *gorm.DB) error {
	now := time.Now()
	today := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, time.Local)
	tommorow := today.AddDate(0, 0, 1)
	err := durations.FetchWithPeriod(db, today, tommorow)
	return err
}

func (durations *Durations) DeleteAll(db *gorm.DB) error {
	err := db.Session(&gorm.Session{AllowGlobalUpdate: true}).Delete(&Duration{}).Error
	return err
}
