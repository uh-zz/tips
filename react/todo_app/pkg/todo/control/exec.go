package control

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/contrib/static"
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
	err = db.AutoMigrate(&models.Todo{}, &models.Duration{})
	if err != nil {
		fmt.Println(err)
		return err
	}

	// routerの設定
	r := gin.Default()
	// 静的ファイルのServe
	r.Use(static.Serve("/", static.LocalFile("../web-ui/build", true)))

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
	r.DELETE("/clock/delete", func(c *gin.Context) {
		duration := models.ConstructDuration(db)
		err = c.BindJSON(&duration)
		if err != nil {
			fmt.Println(err)
			return
		}
		err = duration.Delete()
		if err != nil {
			fmt.Println(err)
			return
		}
		durations := &models.Durations{}
		durations.FetchAllToday(db)
		c.JSON(http.StatusOK, durations)

	})

	r.GET("/clock/durations", func(c *gin.Context) {
		res := &models.Durations{}
		// res.All(db)
		res.FetchAllToday(db)
		c.JSON(http.StatusOK, res)
	})
	r.POST("/clock/stop", func(c *gin.Context) {
		// やはり、Context周りの詳細が増えていってしまうの良くないので
		// modelのフィールドにしたほうがスッキリするのでは？
		duration := models.ConstructDuration(db)
		err = c.BindJSON(&duration)
		if err != nil {
			fmt.Println(err)
			return
		}
		duration.Start = duration.Start.Local()
		duration.End = duration.End.Local()
		// ここにめっちゃモデル側の詳細を書いてるの良くないから直した方がいい。
		var durations []*models.Duration
		start := duration.Start
		tommorow_midnight := time.Date(start.Year(), start.Month(), start.Local().Day()+1, 0, 0, 0, 0, time.Local)
		if duration.End.After(tommorow_midnight) {
			lastday_duration := &models.Duration{DB: db, Start: duration.Start, End: tommorow_midnight}
			nextday_duration := &models.Duration{DB: db, Start: tommorow_midnight, End: duration.End}
			durations = append(durations, lastday_duration, nextday_duration)
		} else {
			durations = append(durations, duration)
		}
		for _, v := range durations {
			err = v.Create()
			if err != nil {
				fmt.Println(err)
				return
			}
			fmt.Printf("%+v\n", v)
		}

		resp_durations := models.Durations{}
		err = resp_durations.FetchAllToday(db)
		if err != nil {
			fmt.Println(err)
			return
		}

		c.JSON(http.StatusOK, resp_durations)
	})

	err = r.Run(":8080") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
	if err != nil {
		return err
	}
	return nil
}
