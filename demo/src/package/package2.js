export default {
  name: 'package2',
  through: false,
  assembly: {
    packageLogin() {
      this.sendRequest()
        .then(x => {
          console.warn('判断是否是数组：', this.judgeArray(x))
        })
    }
  }
}
