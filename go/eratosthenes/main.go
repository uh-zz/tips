package main

import (
	"errors"
	"fmt"
	"math"
)

// generateSeq シーケンシャルなスライスを生成
func generateSeq(min, max int) ([]int, error) {
	if max <= min {
		fmt.Printf("input max: %d, min: %d\n", max, min)
		return nil, errors.New("input error")
	}

	seq := make([]int, max-min+1)
	for index := range seq {
		seq[index] = min + index
	}
	return seq, nil
}

// searchEratosthenes エラトステネスのふるいで素数探索
func searchEratosthenes(seq []int) []int {
	var (
		shift []int
		prime int
	)

	for {

		seq = append(seq[:0], seq[1:]...)

		// step1
		prime = seq[0]
		shift = append(shift, prime)

		// step2
		search := make([]int, 0)
		for _, val := range seq {
			if val == 1 {
				continue
			}

			if val%prime != 0 {
				search = append(search, val)
			}
		}
		seq = search

		// step3
		lastNumSqrt := int(math.Sqrt(float64(seq[len(seq)-1])))
		if seq[0] >= lastNumSqrt {
			// step4
			shift = append(shift, seq...)
			break
		}
	}
	return shift
}
func main() {

	seq, err := generateSeq(1, 120)
	if err != nil {
		fmt.Println(err)
		return
	}
	primes := searchEratosthenes(seq)
	fmt.Println(primes)
}
