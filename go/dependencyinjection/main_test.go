package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

type FakePost struct {
	Id      int
	Content string
	Author  string
}

func (f *FakePost) fetch(id int) (err error) {
	f.Id = id
	f.Content = "hoge"
	f.Author = "hoge"

	return
}

func (f *FakePost) create() (err error) {
	return
}

func (f *FakePost) update() (err error) {
	return
}

func (f *FakePost) delete() (err error) {
	return
}

func TestHandleGet(t *testing.T) {

	mux := http.NewServeMux()

	// sql.DBをフィールドにもつ、Postを渡す代わりに、
	// Textインターフェースを実装したFakePostを渡せる
	// →　依存性の注入
	mux.HandleFunc("/post/", handleRequest(&FakePost{}))

	writer := httptest.NewRecorder()
	request, _ := http.NewRequest("GET", "/post/1", nil)

	mux.ServeHTTP(writer, request)

	if writer.Code != 200 {
		t.Errorf("Response code is %v", writer.Code)
		return
	}

	var post Post
	json.Unmarshal(writer.Body.Bytes(), &post)
	if post.Id != 1 {
		t.Errorf("cannot retrieve json post")
		return
	}

	t.Log("post success!!", post)
}
