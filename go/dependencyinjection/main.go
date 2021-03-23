package main

import (
	"database/sql"
	"net/http"
)

func main() {

	var err error
	db, err := sql.Open("postgres", "user=hoge dbname=hoge password=hoge sslmode=disable")
	if err != nil {
		panic(err)
	}

	server := http.Server{
		Addr: ":8080",
	}

	// Textインターフェースを実装したPostを引数にする
	http.HandleFunc("/post/", handleRequest(&Post{Db: db}))
	server.ListenAndServe()
}
