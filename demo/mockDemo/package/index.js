export default {
  name: 'testFile',
  extends: ['request'],
  through: false,
  assembly: {
    testRequestFun() {
      this.get('testData')
        .then(x => {
          console.warn('测试mock功能结果：', x)
        })
    }
  }
}
