package main

import (
	"fmt"
	"testing"
	"time"
)

func TestEncode(t *testing.T) {

	if testing.Short() {
		t.Skip("skipping!")
	}
	data := "abc123!?$*&()'-=@~"
	resStr := encode([]byte(data))
	if resStr != "YWJjMTIzIT8kKiYoKSctPUB+" {
		t.Fatal("test failed")
		return
	}
}

func TestSkip(t *testing.T) {

	// フラグ-shortが付与されている場合
	if testing.Short() {
		t.Skip("skipping!")
	}
	fmt.Println("TestSkip executed")
}

// フラグ-parallelが付与されている場合、並行してテストが実行される
// go test -v -short -parallel 3
// →　最大で３つのテストを並行実行させたいことを意味する
//
// --- PASS: TestParallel_1 (1.00s)
// --- PASS: TestParallel_2 (2.00s)
// --- PASS: TestParallel_3 (3.00s)
// PASS
// ok      github.com/uh-zz/tips/go/skiptest       3.332s
//
//
// 全体で３秒弱しかかからない
func TestParallel_1(t *testing.T) {

	t.Parallel()
	time.Sleep(1 * time.Second)
}

func TestParallel_2(t *testing.T) {
	t.Parallel()
	time.Sleep(2 * time.Second)
}

func TestParallel_3(t *testing.T) {
	t.Parallel()
	time.Sleep(3 * time.Second)
}
