let template = {}

export default {
  setValue(key, value) {
    template[key] = value
  },
  getValue(key) {
    return template[key]
  }
}
