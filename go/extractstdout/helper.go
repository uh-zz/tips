package appevent

import (
	"io/ioutil"
	"os"
	"testing"
	"unsafe"
)

func ExtractStdOut(t *testing.T, f func()) string {

	// FYI: https://qiita.com/ichiban@github/items/b5f8e5c7e00c85cb5ca7
	t.Helper()

	original := os.Stdout
	defer func() {
		os.Stdout = original // 出力先を戻す
	}()

	pipeReader, pipeWriter, _ := os.Pipe()

	// StdOutの出力先をパイプのwriterに変更
	os.Stdout = pipeWriter

	// 引数で渡した関数を実行
	f()

	pipeWriter.Close()

	buf, err := ioutil.ReadAll(pipeReader)
	if err != nil {
		t.Fatal("cannot read pipeReader:", err)
	}

	return *(*string)(unsafe.Pointer(&buf))
}
