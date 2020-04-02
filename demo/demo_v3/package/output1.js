export default {
  name: 'package',
  extends: ['test2', 'test1', 'test3'],
  through: [
    {'test1': ['sameObj']},
    {'test3': ['isOK']},
  ],
  assembly: {
    output(){
      console.log('package正在执行...', this.sameObj.test2)
    }
  }
}
