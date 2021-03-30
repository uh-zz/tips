package main

import (
	"fmt"
	"log"
	"os"
	"os/user"
	"path/filepath"
)

func main() {

	u, err := user.Current()
	if err != nil {
		log.Fatal(err)
	}

	// filepath.Joinを使うことでハードコード「/」せずに済む
	dir := filepath.Join(u.HomeDir, ".config", "myapp")
	fmt.Println(dir)
	err = os.MkdirAll(dir, 0755)
	if err != nil {
		log.Fatal(err)
	}
}
