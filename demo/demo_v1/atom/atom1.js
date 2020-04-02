export default {
  name: 'atom1',
  assembly: {
    sendRequest() {
      return new Promise((res) => {
        res([1, 2, 3])
      })
    }
  }
}
