package main

import "fmt"

func list2array(xs *Pair) []Value {
	if tail(xs) == nil {
		return []Value{head(xs)}
	}

	return append([]Value{head(xs)}, list2array(tail(xs))...)
}

func array2list(vs []Value) *Pair {
	hd := vs[0]
	ts := vs[1:]

	if len(ts) > 0 {
		return pair(hd, array2list(ts))
	}

	return pair(hd, nil)
}

type Value int

type Pair struct {
	value  Value
	second *Pair
}

func head(p *Pair) Value {
	return p.value
}

func tail(p *Pair) *Pair {
	return p.second
}

func pair(f Value, s *Pair) *Pair {
	return &Pair{
		value:  f,
		second: s,
	}
}

func ranges(low, high int) *Pair {
	if low > high {
		return nil
	}

	return pair(Value(low), ranges(low+1, high))
}

func maps(fn func(Value) Value, p *Pair) *Pair {
	if p == nil {
		return nil
	}

	return pair(fn(head(p)), maps(fn, tail(p)))
}

func main() {
	xs := pair(1, pair(2, pair(3, nil)))
	xss := ranges(1, 10)
	fmt.Printf("xs : %#v\n", xs)
	fmt.Printf("head : %#v\n", head(xs))
	fmt.Printf("tail : %#v\n", tail(xs))
	fmt.Printf("ranges : %#v\n", xss)
	fmt.Printf("list2array : %#v\n", list2array(xss))
	fmt.Printf("array2list : %#v\n", array2list(list2array(xss)))
	fmt.Printf("maps : %#v\n", maps(func(v Value) Value { return v * 2 }, xss))
}
