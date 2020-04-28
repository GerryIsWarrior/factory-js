// 原子管理类，管理所有原子逻辑
import errInfo from '../util/error.js'
import checkFn from '../util/check.js'
import template from '../util/template.js'

// 缓存所有原子信息
let atomList = {}
// 缓存原子映射关系
let atomMapping = {}

function assignObj(target, source, current) {
  for (let key in source) {
    // 合并到的对象中是否存在一样的属性
    if (!target[key]) {
      // 原子中是否存在重复命名的原子
      if (atomMapping[key].length === 1) {
        target[key] = source[key]
      } else {
        if (target[key]) {
          target[key][current] = source[key]
        } else {
          target[key] = {}
          target[key][current] = source[key]
        }
      }
    } else {
      target[key][current] = source[key]
    }
  }
  console.warn('atomMapping', atomMapping)
}

class Atom {

  /*
  * 注入原子逻辑，以属性的方式管理
  *   objArr： 原子逻辑数组
  * */
  setBasics(objArr) {
    objArr.forEach(x => {
      // 校验是否存在原子信息
      if (atomList[x.name]) {
        throw new Error(`${errInfo.SAME_ATOM.replace(/__/, x.name)}`)
      } else {
        atomList[x.name] = x
        // 缓存原子是否重复信息，为后面重复原子做处理
        for (let key in x.assembly) {
          if (!atomMapping[key]) {
            atomMapping[key] = []
            atomMapping[key].push(x.name)
          } else {
            if (atomMapping[key].indexOf(x.name) < 0) {
              atomMapping[key].push(x.name)
            }
          }
        }
        this[x.name] = x.assembly
      }
    })
    // 缓存原子是否映射
    template.setValue('atomMapping', atomMapping)
  }

  /*
  * 生产组装类所需要的原子
  *   param
  *     useBasics：组装类，所需要继承的原子
  *       支持type： String - 指定一个、Array - 指定多个、无（undefined）- 所有
  *
  *   return
  *     output：生产出的原子逻辑
  * */
  machiningBasics(useBasics) {
    let output = {}
    if (useBasics) {
      if (checkFn.isArray(useBasics)) {
        useBasics.forEach(x => {
          if (atomList[x]) {
            assignObj(output, this[x], x)
          } else {
            throw new Error(`${errInfo.EXTEND_NOT_FOUND.replace(/__/, useBasics)}`)
          }
        })
      }
      if (checkFn.isString(useBasics)) {
        if (atomList[useBasics]) {
          assignObj(output, this[useBasics], useBasics)
        } else {
          throw new Error(`${errInfo.EXTEND_NOT_FOUND.replace(/__/, useBasics)}`)
        }
      }
    } else {
      Object.keys(this).forEach(x => {
        assignObj(output, this[x], x)
      })
    }
    return output
  }
}

export default Atom
