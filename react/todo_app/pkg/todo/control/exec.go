package control

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"todo_app/pkg/todo/models"
)

// Exec is an execution function
func Exec() error {

	// データベースの接続、オートマイグレーション
	const (
		// データベース
		Dialect = "mysql"

		// ユーザー名
		DBUser = "todo_user"

		// パスワード
		DBPass = "todo_password"

		// プロトコル
		DBProtocol = "tcp(todo_db:3306)"

		// DB名
		DBName = "todo_db"
	)
	connectTemplate := "%s:%s@%s/%s?charset=utf8mb4&parseTime=True&loc=Local"
	connect := fmt.Sprintf(connectTemplate, DBUser, DBPass, DBProtocol, DBName)
	// dsn := "user:pass@tcp(todo_db)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(connect), &gorm.Config{})
	if err != nil {
		fmt.Println(err)
		return err
	}
	err = db.AutoMigrate(&models.Todo{})
	if err != nil {
		fmt.Println(err)
		return err
	}

	// routerの設定
	r := gin.Default()
	// 静的ファイルのServe
	r.Static("/web", "../web-ui/build")

	r.GET("/todo/all", func(c *gin.Context) {
		todos := &models.Todos{}
		err = todos.All(db)
		if err != nil {
			fmt.Println(err)
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":   true,
				"message": "Can't save your todos.",
			})
		}
		c.JSON(http.StatusOK, todos)
	})

	r.POST("/todo/create", func(c *gin.Context) {
		todo := models.ConstructTodo(db)
		err = c.BindJSON(&todo)
		if err != nil {
			fmt.Println(err)
			return
		}
		todo.Create()
		c.JSON(http.StatusOK, todo)

	})

	r.DELETE("/todo/delete/all", func(c *gin.Context) {
		todos := &models.Todos{}
		err := todos.DeleteAll(db)
		if err != nil {
			fmt.Println(err)
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"message": "All Delete",
		})
	})

	r.DELETE("/todo/delete", func(c *gin.Context) {
		todo := models.ConstructTodo(db)
		err = c.BindJSON(&todo)
		if err != nil {
			fmt.Println(err)
			return
		}
		err = todo.Delete()
		if err != nil {
			fmt.Println(err)
			return
		}
		todos := &models.Todos{}
		todos.All(db)
		c.JSON(http.StatusOK, todos)

	})

	err = r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
	if err != nil {
		return err
	}
	return nil
}
