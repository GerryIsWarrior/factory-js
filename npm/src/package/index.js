function makeObject() {
  function Temporary(assembly) {
    for (let key in assembly) {
      this[key] = assembly[key].bind(this)
    }
  }

  return Temporary
}

function isThrough(Temporary, config) {
  let temp = new Temporary(config.assembly)
  let output = {}
  for (let key in temp) {
    if (config.through) {
      if (temp.hasOwnProperty(key)) {
        output[key] = temp[key]
      }
    } else {
      output[key] = temp[key]
    }
  }
  return output
}

class Package {

  setPackage(config, prototype) {
    let temp = makeObject(config)
    temp.prototype = prototype
    return isThrough(temp, config)
  }

}

export default Package
