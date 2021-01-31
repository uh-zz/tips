package main

import (
	"fmt"
)

func main() {
	var cmds []Command

	m := NewMapStatus()

	fmt.Println("before:", m)

	cmds = append(cmds, MoveFunc(Right))
	cmds = append(cmds, MoveFunc(Down))
	cmds = append(cmds, MoveFunc(Right))
	cmds = append(cmds, MoveFunc(Right))

	cmds = cmds[:len(cmds)-1]

	for _, cmd := range cmds {
		switch t := cmd.(type) {
		case MoveFunc:
			t(m)
		}
	}

	fmt.Println("after:", m)
}
