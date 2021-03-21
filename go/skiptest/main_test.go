package main

import (
	"fmt"
	"testing"
)

func TestEncode(t *testing.T) {

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
