// Solve: prolems/sum-arrow.js
// // ['1', '2', '>', '5', '<']

// // input ['1', '2', '>', '5', '<']  output ['1', '2', '2', '5', '5']
// // input ['1', '>', '>', '4', '<', '<', '3']  output ['1', '4', '4', '4', '4', '4', '3']

// console.log(['1', '2', '>', '5', '<'])
// ideas:
// 1. head with tails, head with tails, and head with tails on so on
// 2. eliminate the arrows in tail if the head is arrow keep skpping the tails until found the number
// 3. if the head is number, then keep the head and tails
// assumptions: need to define the priority of the arrows > is < is more higher like + lower than *

// ['1', '2', '>', '5', '6']
/*
[
	{first: '1', value: '1', left:[], right: ['2', '>', '5', '6']}
	{first: '2', value: '2', left: ['1'], right: ['5', '6']}
	{first: '>', value: '>', left: ['2', '1'], right: ['5', '6']}
	{first: '5', value: '5', left: ['>', '2', '1'], right: ['6']}
	{first: '6', value: '6', left: ['5', '>', '2', '1'], right: []}
]
*/

// imperative way: map array to array of object first, value, left, right
function _array2pair(arr) {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    let first = arr[i]
    let value = arr[i]
    let left = arr.slice(0, i).reverse()
    let right = arr.slice(i + 1)
    result = [...result, {first, value, left, right}]
  }
  return result
}

// functional way: map array to array of object first, value, left, right
const array2pair = (arr) =>
  arr.map((value, index) => ({
    first: value,
    value,
    left: [...arr.slice(0, index).reverse()],
    right: [...arr.slice(index + 1)],
  }))

// const find = (arrow, predicate) =

// TOOD: extract function
// const isOk = (items, arrow) => {
//   let firstNumber = items.find((v) => !isNaN(v))
//   return {
//     ...item,
//     value: firstNumber,
//   }
// }

let ps = array2pair(['1', '2', '<', '<', '>', '4']).map((p) => {
  if (p.first === '>') {
    let firstNumber = p.right.find((v) => !isNaN(v))
    return {
      ...p,
      value: firstNumber,
    }
  }

  if (p.first === '<') {
    let firstNumber = p.left.find((v) => !isNaN(v))
    return {
      ...p,
      value: firstNumber,
    }
  }

  return p
})
console.log(ps)
console.log(ps.reduce((prev, curr) => prev + Number(curr.value), 0))
