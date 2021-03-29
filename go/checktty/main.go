package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strings"

	"github.com/mattn/go-isatty"
)

type flusher interface {
	Flush() error
}

func Checktty() {
	var output io.Writer
	if isatty.IsTerminal(os.Stdout.Fd()) {
		// 標準出力が端末であればそのまま出力
		output = os.Stdout
	} else {
		// 標準出力が端末以外であればbufio.Writerでラップ
		output = bufio.NewWriter(os.Stdout)
	}

	for i := 0; i < 100; i++ {
		fmt.Fprintln(output, strings.Repeat("x", 100))
	}

	if _o, ok := output.(flusher); ok {
		// Flush()を実装している＝bufio.Writerの時のみFlush()を行う
		_o.Flush()
	}
}
