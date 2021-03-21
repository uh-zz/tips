package control

import (
	// "fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Run is an execution function
func Run() {
	r := gin.Default()
	r.Static("/web", "../web-ui/build")
	r.GET("/todo/events", func(c *gin.Context) {
		todos := Todos{}
		todos.Events = []Event{{Event: "hoge"}, {Event: "fuga"}, {Event: "foo"}}
		c.JSON(http.StatusOK, todos)
	})
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

type Event struct {
	Event string `json:"event" binding:"required"`
}
type Todos struct {
	Events []Event `json:"events" binding:"dive"`
}

func serveTodos() {
	var todos []string
	todos = append(todos, "hoge")
	println(todos)
}
