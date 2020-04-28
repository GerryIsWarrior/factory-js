import errInfo from '../util/error.js'
import checkFn from '../util/check.js'
import template from '../util/template.js'
import data from '../util/data.js'

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
      if (checkFn.isFunction(assembly[key])) {
        this[key] = assembly[key].bind(this)
      } else {
        this[key] = assembly[key]
      }
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
function throughProperties(Temporary, config) {
  // 根据配置，实例化对象
  let temp = new Temporary(config.assembly)
  let output = {}
  // 获取原子是否重复映射关系
  const atomMapping = template.getValue('atomMapping')
  for (let key in temp) {
    // 是否开启配置
    if (config.through === false) {
      // 是否是自身属性
      if (temp.hasOwnProperty(key)) {
        output[key] = temp[key]
      }
    } else if (checkFn.isArray(config.through)) {
      if (temp.hasOwnProperty(key)) {
        output[key] = temp[key]
      } else {
        config.through.forEach(x => {
          let keyThough = Object.keys(x)[0]
          x[keyThough].forEach(y => {
            // 判断through配置中的对象，原子是否已经继承
            if (config.extends === undefined || config.extends === keyThough || config.extends.indexOf(keyThough) > -1) {
              if (atomMapping[y]) {
                if (atomMapping[y].length > 1) {
                  if (output[y]) {
                    output[y][keyThough] = temp[y][keyThough]
                  } else {
                    output[y] = {}
                    output[y][keyThough] = temp[y][keyThough]
                  }
                } else {
                  output[y] = temp[y]
                }
              }
            } else {
              throw new Error(data.replaceData(errInfo.NO_EXTEND_THROUGH, ['__', '~~'], [config.name, key]))
            }
          })
        })
      }
    } else if (config.through === true) {
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
  setPackage(config, prototype, noThrough) {
    // 原子组装，默认不透传
    if (noThrough) config.through = false
    let temp = makeObject(config)
    temp.prototype = prototype
    return throughProperties(temp, config)
  }

}

export default Package
