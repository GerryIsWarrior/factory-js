/*
* 数据处理
* */

export default {
  /*
  * 替换字符串中的值和数据
  *   data： 需要处理的字符串
  *   value：需要替换的值
  * */
  replaceData(data, key, value) {
    let regStr = ''
    key.forEach(x=>{
      regStr += `(${x})|`
    })
    let reg = new RegExp(regStr.substr(0, regStr.length -1), 'g')
    const result = data.replace(reg, function (v) {
      let index = key.indexOf(v)
      let output = ''
      if (index > -1) {
        output = value[index]
      }
      return output
    })
    return result
  }
}
