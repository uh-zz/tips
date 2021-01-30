package main

import "github.com/davecgh/go-spew/spew"

func main() {

	hoge := NewMapStatus()
	// clone := hoge.clone()

	spew.Dump(hoge)
	// spew.Dump(clone)

	hoge.Right()
	hoge.Down()
	hoge.Right()
	spew.Dump(hoge)
}
