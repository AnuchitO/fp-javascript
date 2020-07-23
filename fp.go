package main

import (
	"fmt"
	"strconv"
)

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

func V(v interface{}) Value {
	return Value{v}
}

type Value struct {
	value interface{}
}

func (v Value) toString() string {
	return v.value.(string)
}

func (v Value) toInt() int {
	return v.value.(int)
}

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

	return pair(V(low), ranges(low+1, high))
}

func maps(fn func(Value) Value, p *Pair) *Pair {
	if p == nil {
		return nil
	}

	return pair(fn(head(p)), maps(fn, tail(p)))
}

func fizzbuzz(v Value) Value {
	n := v.toInt()
	if n%15 == 0 {
		return V("fizzbuzz")
	}
	if n%5 == 0 {
		return V("buzz")
	}

	if n%3 == 0 {
		return V("fizz")
	}

	return V(strconv.Itoa(n))
}

func main() {
	xs := pair(V(1), pair(V(2), pair(V(3), nil)))
	xss := ranges(1, 10)
	fmt.Printf("xs : %#v\n", xs)
	fmt.Printf("head : %#v\n", head(xs))
	fmt.Printf("tail : %#v\n", tail(xs))
	fmt.Printf("ranges : %#v\n", xss)
	fmt.Printf("list2array : %#v\n", list2array(xss))
	fmt.Printf("array2list : %#v\n", array2list(list2array(xss)))
	fmt.Printf("maps : %#v\n", maps(func(v Value) Value { return V(v.toInt() * 2) }, xss))
	fmt.Printf("fizzbuzz : %#v\n", list2array(maps(fizzbuzz, xss)))
}
