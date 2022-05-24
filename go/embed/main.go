package main

import (
	"embed"
	"fmt"
	"log"
)

//go:embed hoge/*
var static embed.FS

//go:embed all:allhoge
var allstatic embed.FS

// //go:embed .dotdir
// var dotstatic embed.FS これだと動作しない

//go:embed all:.dotdir
var dotstatic embed.FS

func main() {
	ReadStaticDir()
	ReadAllStaticDir()
	ReadDotDir()
}

func ReadStaticDir() {
	b, err := static.ReadFile("hoge/fuga/sample.json")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%+v\n", string(b))

	b1, err := static.ReadFile("hoge/sample_1.json")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%+v\n", string(b1))
}

func ReadAllStaticDir() {
	b, err := allstatic.ReadFile("allhoge/sample.json")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%+v\n", string(b))

	b1, err := allstatic.ReadFile("allhoge/sample_1.json")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%+v\n", string(b1))
}

func ReadDotDir() {
	d, err := dotstatic.ReadFile(".dotdir/.dotfile")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%+v\n", string(d))
}
