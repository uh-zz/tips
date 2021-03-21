package main

import (
	"encoding/base64"
	"fmt"
)

func main() {

	data := "abc123!?$*&()'-=@~"
	fmt.Println(encode([]byte(data)))
}

func encode(data []byte) string {
	return base64.StdEncoding.EncodeToString(data)
}
