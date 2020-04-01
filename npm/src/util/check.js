let output = {}
const types = ['String', 'Number', 'Boolean', 'Function', 'Array', 'RegExp', 'Error', 'HTMLDocument', 'global', 'Symbol', 'Undefined', 'Null']

function getType(data) {
  return / (.+)]$/.exec(Object.prototype.toString.call(data))[1]
}

types.forEach(x => {
  let key = `is${x}`
  output[key] = function (data) {
    return getType(data) === x
  }
})
export default output
