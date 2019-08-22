import Atom from './atom/index'
import Package from './package/index'

// 实例化原子和组装类
const _atom = new Atom()
const _package = new Package()

// 生产原子缓存
let _globalCache = {}

/*
* 对外暴露，注入配置依赖，生产组装
*   param
*     param： 配置参数
* */
export const injection = function (param) {
  _atom.setBasics(param.atom)

  param.package.forEach(x => {
    let prototype = _atom.machiningBasics(x.extends)
    // 缓存组装
    _globalCache[x.name] = _package.setPackage(x, prototype)
  })
}

/*
* 对外暴露，获取生产完成的组装对象
*   param
*     param：获取的目标
*       type：String - 指定一个、Array - 指定多个、 无（undefined） - 全部
*
*   return
*     output：生产结束的对象
* */
export const getMateriel = function (param) {
  let output = {}
  if (param) {
    if (Array.isArray(param)) {
      return param.forEach(x => {
        output[x] = _globalCache[x]
      })
    } else {
      output = _globalCache[param]
    }
  } else {
    output = _globalCache
  }
  return output
}
