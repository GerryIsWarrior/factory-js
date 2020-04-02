export default {
  name: 'package1',
  extends: 'atom1',
  assembly: {
    getAtom1Promise() {
      this.sendRequest()
        .then(x => {
          console.log('使用成功', x)
        })
    }
  }
}
