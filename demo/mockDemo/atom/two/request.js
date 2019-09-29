import ajax from 'ajax-js'

/*
* do something
*   请求配置，timeout，header，error等等
* */

export default {
  name: 'request',
  extend: ['mock', 'config'],
  assembly: {
    get(name) {
      // 判断配置文件中是否存在请求配置
      if (this.requestConfig[name]) {
        // 判断是否开启mock
        if (this.requestConfig[name].mock) {
          // 获取mock中的逻辑
          return Promise.resolve(this[name])
        } else {
          // 不开启mock，发送真实请求
          return ajax.get(this.requestConfig[name].url)
        }
      } else {
        console.error('未检测到合法请求，请核对配置文件')
      }
    }
  }
}
