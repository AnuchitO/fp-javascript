
const add = (a) => (b) => a + b;

let r = add(1) (2)
console.log(r)

let pair = (first) => (second) => {
  return {
    first,
    second
  }
}
console.log(pair(10) (20))

let fst = (p) => p.first
console.log(fst (pair(10) (20)))

let snd = (p) => p.second
console.log(snd (pair(10) (20)))

let xs = pair (3) (pair (2) (pair (1) (null)))
console.log(JSON.stringify(xs, null, 2))

console.log("fst:", fst (xs))
console.log("snd:", snd (xs))

let head = fst
let tail = snd

console.log("head:", head (xs))
console.log("tail:", tail (xs))

// imperative
const list2array = (xs) => {
  let result = []

  while(xs !== null){
    result.push(head (xs))
    xs = tail (xs)
  }
  return result
}
/*
const list2array = (xs) => ( tail (xs) != null ?  [head (xs), ...(list2array (tail (xs)))] : [ head (xs) ] )
*/

console.log("list2array:", list2array(xs))


const array2list = (arr) => {
  let result = null

  let xs = Array.from(arr).reverse()
  for (let i = 0; i < xs.length; i++) {
    result = pair (xs[i]) (result)
  }
  return result
}

/*
const array2list = (arr) => ( arr.slice(1).length > 0 ? pair (arr[0]) (array2list (arr.slice(1))) : pair (arr[0]) (null))
*/

console.log("array2list:", array2list([1,2,3]))

console.log("array2list(list2array (xs)):", array2list (list2array (xs)))
console.log('array2list("hello"):', JSON.stringify(array2list("hello"), null, 2))

const range = (low) => (height) => low > height ? null : pair (low) (range (low +1) (height))

let ten = range (1) (10)
console.log("range (1) (10):", JSON.stringify(ten, null, 1))
console.log("list2array (range (1) (10)):", list2array (range (1) (10)))


const map = (f) => (xs) => xs === null ? null : pair (f (head (xs))) (map (f) (tail (xs)))

let pow = map (x => x * 2) (range (1) (10))
console.log("list2array (map ((x) => x * 2) (range (1) (10))):", list2array (pow))


const fizzbuzz = (n) => (((n % 3 === 0) ? "Fizz" : "") + ((n % 5 === 0) ? "Buzz" : "")) || n

console.log("fizzbuzz(2):", fizzbuzz (2))
console.log("fizzbuzz(3):", fizzbuzz (3))
console.log("fizzbuzz(5):", fizzbuzz (5))
console.log("fizzbuzz(15):", fizzbuzz (15))

let fb = list2array (map (fizzbuzz) (range (1) (20)))
console.log("list2array (map (fizzbuzz) (range (1) (20))):", fb)





let co = (xs=[], ys=[]) => xs.length == 1 ? ys.map(y => [xs[0], y]) : [].concat.apply([], xs.map(x => (co ([x], ys))) )
console.log(JSON.stringify(co ([1], [1,2,3])))
console.log(JSON.stringify(co ([1,2], [1,2,3])))
console.log(JSON.stringify(co ([1,2,3], [1,2,3])))
console.log(JSON.stringify(co ([1,2,3,4], [1,2,3])))

let series = (limit) => limit == 0 ? [] : [...(series(limit-1)) , limit]

console.log(JSON.stringify(co (series(1), series(3))))
console.log(JSON.stringify(co (series(3), series(2))))







