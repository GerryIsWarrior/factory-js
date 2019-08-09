class Atom {

  setBasics(objArr) {
    objArr.forEach(x => {
      this[x.name] = x.assembly
    })
  }

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
