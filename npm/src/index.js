import Atom from './atom/index'
import Package from './package/index'


const _atom = new Atom()
const _package = new Package()

let _globalCache = {}

export const injection = function (param) {
  _atom.setBasics(param.atom)

  param.package.forEach(x => {
    let prototype = _atom.machiningBasics(x.extends)
    _globalCache[x.name] = _package.setPackage(x, prototype)
  })
}

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
  return _globalCache
}
