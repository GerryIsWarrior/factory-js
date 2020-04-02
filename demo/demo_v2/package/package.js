export default {
  name: 'package',
  assembly: {
    testByPackage() {
      this.sendRequestByAtom1()
        .then(x => {
          this.isArrayByAtom3(x)
        })
    }
  }
}
