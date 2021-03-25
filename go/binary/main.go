package main

import (
	"bytes"
	"encoding/binary"
	"fmt"
)

type T1 struct {
	A int8
	B int8
}

type T2 struct {
	T1
	C [10]byte
	D int8
}

func main() {

	var (
		t2 T2 // 書き込み用
		r2 T2 // 読み込み用
	)

	buf := new(bytes.Buffer)

	// 固定長byteにコピー
	copy(t2.C[:], "hoge")

	// バッファに書き込み
	err := binary.Write(buf, binary.LittleEndian, &t2)
	if err != nil {
		fmt.Println(err)
	}

	// バッファから読み込み
	err = binary.Read(buf, binary.LittleEndian, &r2)
	if err != nil {
		fmt.Println(err)
	}

	// 固定長byteをstringに変換
	fmt.Println(string(r2.C[:]))

}
