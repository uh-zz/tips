package main

import (
	"fmt"
)

func main() {
	var cmds []Command

	m := NewMapStatus()

	fmt.Println("before:", m)

	cmds = append(cmds, MoveParam(Right))
	cmds = append(cmds, MoveParam(Down))
	cmds = append(cmds, MoveParam(Right))

	cmds = cmds[:len(cmds)-1]

	for _, cmd := range cmds {
		switch t := cmd.(type) {
		case MoveParam:
			m = t(*m)
		}
	}

	fmt.Println("after:", m)
}
