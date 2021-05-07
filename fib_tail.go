package main

import "fmt"

func fiboTail(n, left, right int) int {
	switch n {
	case 0:
		return left
	case 1:
		return right
	default:
		return fiboTail(n-1, right, left+right)
	}
}

func Fibo(n int) int {
	return fiboTail(n, 0, 1)
}

func main() {
	for n := 0; n < 10; n++ {
		r := Fibo(n)
		fmt.Println(r)
	}
}
