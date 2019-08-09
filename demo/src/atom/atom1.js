export default {
  name: 'atom1',
  assembly: {
    sendRequest() {
      return new Promise((res, rej) => {
        setTimeout(function () {
          res([1, 2, 3])
        }, 3000)
      })
    }
  }
}
