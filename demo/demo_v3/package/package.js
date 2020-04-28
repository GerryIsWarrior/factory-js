export default {
  name: 'package',
  extends: ['test2', 'test1', 'test3', 'test4'],
  // through: [
  //   {'test1': ['sameObj']},
  //   {'test3': ['isOK']},
  // ],
  through: true,
  assembly: {
    zq: '我是zq属性',
    output(){
      console.log('- package正在执行...')
      console.log('- package继承sameObj属性：', this.sameObj)
      console.log('- 执行test1属性sameObj：', this.sameObj.test1)
      console.log('- 执行test2属性sameObj：', this.sameObj.test2)
    }
  }
}
