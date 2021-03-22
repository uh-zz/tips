package main

import (
	"fmt"
	"time"
)

func thrower(c chan int) {

	for i := 0; i < 5; i++ {
		c <- i
		fmt.Println("Threw >>", i)
	}
}

func catcher(c chan int) {

	for i := 0; i < 5; i++ {
		num := <-c
		fmt.Println("caught >>", num)
	}
}
func main() {

	// バッファなし
	// c := make(chan int)

	// バッファあり
	c := make(chan int, 3)

	go thrower(c)
	go catcher(c)

	time.Sleep(100 * time.Millisecond)

	// caught >> 0
	// Threw >> 0
	// Threw >> 1
	// caught >> 1
	// caught >> 2
	// Threw >> 2
	// Threw >> 3
	// caught >> 3
	// caught >> 4
	// Threw >> 4
	//
	// 送信と受信のログ出力が逆になっているのはそれほど重要ではない
	// 重要なのは数字が順に並んでいるということ
	// →　受信側が取り出さない限り、送信できない
}
