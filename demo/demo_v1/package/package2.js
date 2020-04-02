export default {
  name: 'package2',
  assembly: {
    packageLogin() {
      let that = this
      this.sendRequest()
        .then(x => {
          console.log('是否是数组：', that.judgeArray(x))
        })
    }
  }
}
