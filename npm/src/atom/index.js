// 原子管理类，管理所有原子逻辑
class Atom {

  /*
  * 注入原子逻辑，以属性的方式管理
  *   objArr： 原子逻辑数组
  * */
  setBasics(objArr) {
    objArr.forEach(x => {
      this[x.name] = x.assembly
    })
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
      if (Array.isArray(useBasics)) {
        useBasics.forEach(x => {
          Object.assign(output, this[x])
        })
      } else {
        Object.assign(output, this[useBasics])
      }
    } else {
      Object.keys(this).forEach(x => {
        Object.assign(output, this[x])
      })
    }
    return output
  }
}

export default Atom
