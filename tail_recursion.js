
// partail sums is the triangular number
// example of tail recursion
// In order to be a tail recursion the last expression of the recursive case must be just a function call.
// NOTE: A function is tail-recursive if the main recursive calls it makes are in tail positions.
const partial_sums = (x, total = 0) => {
    if (x == 0 ){
        return total
    }

    return partial_sums(x-1, total + x)
}
console.log("tail recusion")
console.log(partial_sums(5))


// recursive
// r_partial_sums not a tail recursive because the main recursive call in line (Z) is not in a tail position:
const r_partial_sums = (x) => {
    if (x == 0) {
        return 0
    }

    return x + r_partial_sums(x-1) // (Z)
}
console.log("recusion")
console.log(r_partial_sums(5))