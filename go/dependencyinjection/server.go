package main

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"path"
	"strconv"
)

type Text interface {
	fetch(id int) (err error)
	create() (err error)
	update() (err error)
	delete() (err error)
}

type Post struct {
	Db      *sql.DB
	Id      int    `json:"id"`
	Content string `json:"content"`
	Author  string `json:"author"`
}

func (p *Post) fetch(id int) (err error) {

	// グローバルな構造体sql.DBを使う代わりに
	// 構造体Postのフィールドとしてメソッドに渡したDbを使用
	//
	// グローバル構造体を除去できた
	err = p.Db.QueryRow(
		"select id, content author from posts where id = $1",
		id,
	).Scan(
		&p.Id,
		&p.Content,
		&p.Author,
	)

	return

}

func (p *Post) create() (err error) {
	return

}

func (p *Post) update() (err error) {
	return

}

func (p *Post) delete() (err error) {
	return

}

func handleRequest(t Text) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		var err error

		// Textインターフェースを実装した型を各handler関数に渡すことができる
		switch r.Method {
		case "GET":
			err = handleGet(w, r, t)
		case "POST":
			err = handlePost(w, r, t)
		case "PUT":
			err = handlePut(w, r, t)
		case "DELETE":
			err = handleDelete(w, r, t)

		}
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

func handleGet(w http.ResponseWriter, r *http.Request, post Text) (err error) {

	id, err := strconv.Atoi(path.Base(r.URL.Path))
	if err != nil {
		return
	}

	// idをキーにして検索
	err = post.fetch(id)
	if err != nil {
		return
	}

	output, err := json.Marshal(post)
	if err != nil {
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(output)

	return
}

func handlePost(w http.ResponseWriter, r *http.Request, post Text) (err error) {
	return
}
func handlePut(w http.ResponseWriter, r *http.Request, post Text) (err error) {
	return
}
func handleDelete(w http.ResponseWriter, r *http.Request, post Text) (err error) {
	return
}
