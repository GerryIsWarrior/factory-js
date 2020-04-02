export default {
  name: 'atom1',
  assembly: {
    sendRequestByAtom1() {
      return new Promise((res) => {
        res([1, 2, 3])
      })
    }
  }
}
