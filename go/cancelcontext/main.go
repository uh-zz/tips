package main

import (
	"context"
	"fmt"
	"time"
)

func main() {

	// キャンセル可能なコンテキスト
	ctx, cancel := context.WithTimeout(context.Background())

	// cancel()が呼ばれると、ctxChildも完了する
	defer cancel()

	// ctxを親コンテキストにした、１秒でタイムアウトするコンテキスト
	ctxChild, cancelChild := context.WithTimeout(ctx, time.Second)

	// これが呼ばれても親コンテキストは完了せずに、子だけ完了する
	defer cancelChild()

	// どちらかのコンテキストが完了するまで待つ
	select {
	case <-ctxChild.Done():
		fmt.Println("child", ctxChild.Err())
	case <-ctx.Done():
		fmt.Println("parent", ctx.Err())
	}
}
