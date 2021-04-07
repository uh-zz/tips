package models

import (
	"fmt"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Session struct {
	DB *gorm.DB `gorm:"-" json:"-"`

	UUID       string `gorm:"primaryKey"`
	LastUsedAt time.Time
	UserID     int
	User       User `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`

	CreatedAt time.Time
	UpdatedAt time.Time
}

type ISession interface {
	Creat() error
	Read() error
	Update() error
	Delete() error
}

func (session *Session) Create() error {
	err := session.DB.Create(&session).Error
	return err
}

// Session.IDに欲しいレコードのIDを入れておいてね。
func (session *Session) Read() error {
	err := session.DB.Take(&session).Error

	now := time.Now().Local()
	session.LastUsedAt = now
	err = session.Update()
	if err != nil {
		fmt.Println(err)
		return err
	}
	return err
}

func (session *Session) ReadFromUser(user User) error {
	err := session.DB.Take(&session, "user_id = ?", user.ID).Error
	if err != nil {
		session.UUID = uuid.NewString()
		session.LastUsedAt = time.Now()
		session.User = user
		err = session.Create()
	}
	return err
}

func (session *Session) Update() error {
	err := session.DB.Updates(&session).Error
	return err
}

func (session *Session) Delete() error {
	err := session.DB.Delete(&session).Error
	return err
}

func (session *Session) Clean(d time.Duration) error {
	err := session.DB.Delete(&session, " last_used_at <= ? ", time.Now().Add(-d)).Error
	return err
}

func ConstructSession(db *gorm.DB) *Session {
	return &Session{DB: db}
}

type Sessions []Session

type ISessions interface {
	All(db *gorm.DB, user User) error
	DeleteAll(db *gorm.DB, user User) error
}

func (sessions *Sessions) All(db *gorm.DB, user User) error {
	err := db.Find(&sessions).Error
	for _, session := range *sessions {
		session.DB = db
	}
	return err
}

func (sessions *Sessions) DeleteAll(db *gorm.DB, user User) error {
	err := db.Session(&gorm.Session{AllowGlobalUpdate: true}).Delete(&Session{}).Error
	return err
}
