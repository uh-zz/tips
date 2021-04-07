package models

import (
	"time"

	"gorm.io/gorm"
)

type Todo struct {
	DB *gorm.DB `gorm:"-" json:"-"`

	// gorm.Model をフィールドに持つとdeletedAtもくっついてくるから
	// 論理削除になってしまう。
	ID        uint `gorm:"primarykey" json:"id"`
	CreatedAt time.Time
	UpdatedAt time.Time

	Event    string    `json:"event"`
	Deadline time.Time `json:"deadline"`

	UserID int
	User   User `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type ITodo interface {
	Creat() error
	Read() error
	Update() error
	Delete() error
}

func (todo *Todo) Create() error {
	err := todo.DB.Create(&todo).Error
	return err
}

// Todo.IDに欲しいレコードのIDを入れておいてね。
func (todo *Todo) Read() error {
	err := todo.DB.Take(&todo, todo.ID).Error
	return err
}

func (todo *Todo) Update() error {
	err := todo.DB.Updates(&todo).Error
	return err
}

func (todo *Todo) Delete() error {
	err := todo.DB.Delete(&todo).Error
	return err
}

func ConstructTodo(db *gorm.DB) *Todo {
	return &Todo{DB: db}
}

type Todos []Todo

type ITodos interface {
	All(db *gorm.DB, user User) error
	DeleteAll(db *gorm.DB, user User) error
}

func (todos *Todos) All(db *gorm.DB, user User) error {
	err := db.Find(&todos, " user_id = ? ", user.ID).Error
	for _, todo := range *todos {
		todo.DB = db
	}
	return err
}

func (todos *Todos) DeleteAll(db *gorm.DB, user User) error {
	err := db.Session(&gorm.Session{AllowGlobalUpdate: true}).Delete(&Todo{}, " user_id = ? ", user.ID).Error
	return err
}
