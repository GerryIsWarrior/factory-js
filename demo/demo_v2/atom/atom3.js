export default {
  name: 'atom3',
  extends: 'atom2',
  assembly: {
    isArrayByAtom3(data) {
      console.log('我是atom3，正在执行...', this.judgeArrayByAtom2(data))
    }
  }
}
