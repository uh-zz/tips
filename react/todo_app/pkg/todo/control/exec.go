package control

import (
	"database/sql"
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
	err = db.AutoMigrate(&models.Todo{}, &models.Duration{}, &models.User{}, &models.Session{})
	if err != nil {
		fmt.Println(err)
		return err
	}

	// routerの設定
	r := gin.Default()
	// 静的ファイルのServe
	r.Use(static.Serve("/", static.LocalFile("../web-ui/build", true)))

	r.GET("/todo/all", func(ctx *gin.Context) {
		session, err := fetchSessionFromCookie(ctx, db)
		if err != nil {
			fmt.Println(err)
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error":   true,
				"message": "Can't get user from your cookie.",
			})
			return
		}

		user := &models.User{}
		user.ID = uint(session.UserID)

		todos := models.Todos{}
		err = todos.All(db, *user)
		if err != nil {
			fmt.Println(err)
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"error":   true,
				"message": "Can't save your todos.",
			})
		}
		ctx.JSON(http.StatusOK, todos)
	})

	r.POST("/todo/create", func(ctx *gin.Context) {
		session, err := fetchSessionFromCookie(ctx, db)
		if err != nil {
			fmt.Println(err)
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error":   true,
				"message": "Can't get user from your cookie.",
			})
			return
		}
		todo := models.ConstructTodo(db)
		err = ctx.BindJSON(&todo)
		// todo.UserID = session.UserID
		if err != nil {
			fmt.Println(err)
			return
		}

		todo.UserID = session.UserID
		if err != nil {
			fmt.Println(err)
			return
		}
		err = todo.Create()
		if err != nil {
			fmt.Println(err)
			return
		}
		ctx.JSON(http.StatusOK, todo)

	})

	r.DELETE("/todo/delete/all", func(c *gin.Context) {
		session := models.ConstructSession(db)
		session.Read()
		todos := &models.Todos{}
		err := todos.DeleteAll(db, session.User)
		if err != nil {
			fmt.Println(err)
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"message": "All Delete",
		})
	})

	r.DELETE("/todo/delete", func(ctx *gin.Context) {
		// Sessionの有無をチェック
		session, err := fetchSessionFromCookie(ctx, db)
		if err != nil {
			fmt.Println(err)
			return
		}
		// Todoの読み込み
		todo := models.ConstructTodo(db)
		err = ctx.BindJSON(&todo)
		if err != nil {
			fmt.Println(err)
			return
		}
		// Todoを消去
		err = todo.Delete()
		if err != nil {
			fmt.Println(err)
			return
		}

		// 消去後のTODOの全要素を取得
		session.Read()
		user := models.User{}
		user.ID = uint(session.UserID)
		todos := &models.Todos{}
		todos.All(db, user)
		ctx.JSON(http.StatusOK, todos)

	})

	r.GET("/clock/durations", func(ctx *gin.Context) {
		// Sessionを取得
		session, err := fetchSessionFromCookie(ctx, db)
		if err != nil {
			fmt.Println(err)
			return
		}
		user := &models.User{}
		user.ID = uint(session.UserID)

		// 全てのdurationを取得
		durations := &models.Durations{}
		durations.FetchAllToday(db, *user)
		ctx.JSON(http.StatusOK, durations)
	})
	r.POST("/clock/stop", func(ctx *gin.Context) {
		// Sessionを取得
		session, err := fetchSessionFromCookie(ctx, db)
		if err != nil {
			fmt.Println(err)
			return
		}
		user := &models.User{}
		user.ID = uint(session.UserID)

		duration := models.ConstructDuration(db)
		duration.UserID = session.UserID
		err = ctx.BindJSON(&duration)
		if err != nil {
			fmt.Println(err)
			return
		}
		duration.Start = duration.Start.Local()
		duration.End.Time = duration.End.Time.Local()
		// ここにめっちゃモデル側の詳細を書いてるの良くないから直した方がいい。
		var durations []*models.Duration
		start := duration.Start
		tommorow_midnight := time.Date(start.Year(), start.Month(), start.Local().Day()+1, 0, 0, 0, 0, time.Local)
		if duration.End.Time.After(tommorow_midnight) {
			duration.End = models.NullTime{NullTime: sql.NullTime{Time: tommorow_midnight}}
			nextday_duration := &models.Duration{DB: db, Start: tommorow_midnight, End: duration.End}
			durations = append(durations, duration, nextday_duration)
		} else {
			durations = append(durations, duration)
		}
		for i, v := range durations {
			if i != 0 {
				err = v.Create()
			} else {
				err = v.Update()
			}
			if err != nil {
				fmt.Println(err)
				return
			}
			fmt.Printf("Clock Stop : %+v\n", v)
		}

		resp_durations := models.Durations{}
		err = resp_durations.FetchAllToday(db, *user)
		if err != nil {
			fmt.Println(err)
			return
		}

		ctx.JSON(http.StatusOK, resp_durations)
	})
	r.POST("/clock/start", func(ctx *gin.Context) {
		// Sessionを取得
		session, err := fetchSessionFromCookie(ctx, db)
		if err != nil {
			fmt.Println(err)
			return
		}
		user := &models.User{}
		user.ID = uint(session.UserID)

		duration := models.ConstructDuration(db)
		duration.UserID = session.UserID
		err = ctx.BindJSON(&duration)
		if err != nil {
			fmt.Println(err)
			return
		}
		duration.Start = duration.Start.Local()
		duration.End.Time = duration.End.Time.Local()

		all_durations := models.Durations{}
		err = all_durations.FetchAllToday(db, *user)
		if err != nil {
			fmt.Println(err)
			return
		}
		for _, v := range all_durations {
			fmt.Println(v)
			if v.End.Valid == false {
				fmt.Println("return not ended item")
				fmt.Printf("%+v\n", v)
				ctx.JSON(http.StatusOK, v)
				return
			}
		}

		duration.Create()
		fmt.Printf("New Created Duration: %+v\n", duration)
		ctx.JSON(http.StatusOK, duration)
	})

	r.DELETE("/clock/delete", func(ctx *gin.Context) {
		// Sessionを取得
		session, err := fetchSessionFromCookie(ctx, db)
		if err != nil {
			fmt.Println(err)
			return
		}
		user := &models.User{}
		user.ID = uint(session.UserID)

		duration := models.ConstructDuration(db)
		err = ctx.BindJSON(&duration)
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
		durations.FetchAllToday(db, *user)
		ctx.JSON(http.StatusOK, durations)

	})

	r.POST("/user/create", func(c *gin.Context) {
		user := models.ConstructUser(db)
		err := c.BindJSON(&user)
		if err != nil {
			fmt.Println(err)
			return
		}
		user.Create()
		fmt.Printf("%+v\n", user)
		c.JSON(http.StatusOK, user)
	})

	r.POST("login", func(c *gin.Context) {
		user := models.ConstructUser(db)
		err := c.BindJSON(&user)
		err = user.ReadFromPasswordAndName()
		if err != nil {
			fmt.Println(err, "Password", user.Password, "Name", user.UserName)
			fmt.Println("Cant't find item", err)
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "error",
			})
			return
		}
		session := models.ConstructSession(db)
		err = session.ReadFromUser(*user)
		if err != nil {
			fmt.Println("Reqest can't process cookie:", err)
			c.JSON(http.StatusBadRequest, nil)
			return
		}
		c.SetCookie("SessionID", session.UUID, 60*60*24*1, "/", "", false, false)
		c.JSON(http.StatusOK, nil)
	})

	// Session管理
	ticker := time.NewTicker(24 * time.Hour)
	go func() {
		for {
			select {
			case _ = <-ticker.C:
				session := models.ConstructSession(db)
				err := session.Clean(120 * time.Millisecond)
				if err != nil {
					fmt.Println(err)
				}
			}
		}
	}()

	err = r.Run(":8080") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
	if err != nil {
		return err
	}
	return nil
}

func fetchSessionFromCookie(ctx *gin.Context, db *gorm.DB) (*models.Session, error) {
	session := models.ConstructSession(db)
	sessionID, err := ctx.Cookie("SessionID")
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	session.UUID = sessionID
	err = session.Read()
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	ctx.SetCookie("SessionID", sessionID, 60*60*24*1, "/", "", false, false)
	return session, nil
}
