import {injection, getMateriel} from '../../npm/src/index'

import atom1 from './atom/atom1.js'
import atom2 from './atom/atom2.js'

import package1 from './package/package1.js'
import package2 from './package/package2.js'

// injection({
//   atom: [
//     [atom1, atom2]
//   ],
//   package: [package1, package2]
// })

// console.log('package组装逻辑：', getMateriel())
// getMateriel('package1').getAtom1Promise()
// getMateriel('package2').packageLogin()


let array = [1, 23, 5, 6, 7, 89, 0, 53, 2, 42, 4234, 234, 4, 6, 7, 78, 8, 9]

// 冒泡排序
function sort1(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
      console.log('对比：', `${arr[j]}：${arr[j + 1]}`)
    }
  }
}

// 选择排序
function sort2(arr) {
  let len = arr.length
  let min, temp;
  for (let i = 0; i < len - 1; i++) {
    min = i
    for (let j = i; j < len - 1; j++) {
      console.log('对比：', `${arr[min]}：${arr[j + 1]}`)

      if (arr[min] > arr[j + 1]) {
        min = j + 1
        temp = arr[j + 1]
      }
      console.log('- 当前最小值：', `${arr[min]}：${min}`)

    }
    console.warn('-最小结果：', `${arr[min]}：${min}`)
    arr[min] = arr[i]
    arr[i] = temp
  }
}

// 插入排序
function sort3(arr) {
  let len = arr.length
  let min, temp;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      console.log('对比：', `${arr[i]}：${arr[j]}`)
      if (arr[i] < arr[j]) {
        min = j
        temp = arr[i]
        console.log('当前位置：', min)
        arr.splice(min, 0, temp)
        arr.splice(i + 1, 1)
        break
      }
    }
    console.log('当前数组：', arr)
  }
}

// 归并排序
function sort4(arr) {
  let len = arr.length;
  if (len < 2) {
    return arr;
  } else {
    let left = arr.splice(0, Math.floor(len/2))
    let right = arr
    return merge(sort4(left), sort4(right))
  }
}

function merge(left, right){
  let result = []
  console.log('left：', left)
  console.log('right：', right)
  while (left.length > 0 && right.length > 0) {
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  while (left.length) {
    result.push(left.shift())
  }

  while (right.length) {
    result.push(right.shift())
  }

  console.log('-result：', result)

  return result
}

console.warn('结果：',sort4(array))
