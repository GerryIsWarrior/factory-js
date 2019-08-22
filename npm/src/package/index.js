// 因ES6不支持私有属性，所以将私有属性放到外层

/*
* 生产组装对象，并注入指定作用域
*   param -
*
*   return
*     Temporary：组装对象
*
* */
function makeObject() {
  function Temporary(assembly) {
    for (let key in assembly) {
      this[key] = assembly[key].bind(this)
    }
  }

  return Temporary
}

/*
* 组装中是否透传原子方法
*   param
*     Temporary：组装对象
*     config： 组装的配置
*
*   return
*     output：输出最终逻辑
* */
function isThrough(Temporary, config) {
  // 根据配置，实例化对象
  let temp = new Temporary(config.assembly)
  let output = {}
  for (let key in temp) {
    // 是否开启配置
    if (config.through  === false) {
      // 是否是自身属性
      if (temp.hasOwnProperty(key)) {
        output[key] = temp[key]
      }
    } else {
      output[key] = temp[key]
    }
  }
  return output
}

// 组装类，管理组装和输出。
class Package {

  /*
  * 注入组装配置
  *   param
  *     config：组装配置
  *     prototype：组装所依赖的原子属性
  *
  *   return  生产完成的对象
  * */
  setPackage(config, prototype) {
    let temp = makeObject(config)
    temp.prototype = prototype
    return isThrough(temp, config)
  }

}

export default Package
