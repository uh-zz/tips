package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	DB *gorm.DB `gorm:"-" json:"-"`

	// gorm.Model をフィールドに持つとdeletedAtもくっついてくるから
	// 論理削除になってしまう。
	ID        uint `gorm:"primarykey" json:"id"`
	CreatedAt time.Time
	UpdatedAt time.Time

	UserName string `json:"userName"`
	Password string `json:"password"`
}

type IUser interface {
	Creat() error
	Read() error
	Update() error
	Delete() error
}

func (user *User) Create() error {
	err := user.DB.Create(&user).Error
	return err
}

// User.IDに欲しいレコードのIDを入れておいてね。
func (user *User) Read() error {
	err := user.DB.Take(&user, user.ID).Error
	return err
}

func (user *User) ReadFromPasswordAndName() error {
	err := user.DB.Where(" password = ? AND user_name = ? ", user.Password, user.UserName).Take(&user).Error
	return err
}

func (user *User) Update() error {
	err := user.DB.Updates(&user).Error
	return err
}

func (user *User) Delete() error {
	err := user.DB.Delete(&user).Error
	return err
}

func ConstructUser(db *gorm.DB) *User {
	return &User{DB: db}
}

type Users []User

type IUsers interface {
	All(db *gorm.DB) error
	DeleteAll(db *gorm.DB) error
}

func (users *Users) All(db *gorm.DB) error {
	err := db.Find(&users).Error
	for _, user := range *users {
		user.DB = db
	}
	return err
}

func (users *Users) DeleteAll(db *gorm.DB) error {
	err := db.Session(&gorm.Session{AllowGlobalUpdate: true}).Delete(&User{}).Error
	return err
}
