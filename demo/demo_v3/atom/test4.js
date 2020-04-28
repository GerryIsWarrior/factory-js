export default {
  name: 'test4',
  extends: ['test1'],
  assembly: {
    sameObj: '我是test4的属性',
    showSameObj: function () {
      debugger
      console.log(' --- sameObj: ', this.sameObj)
    }
  }
}
