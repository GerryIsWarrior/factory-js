import {injection, getMateriel} from '@fines/factory-js'

import atom1 from './atom/atom1'
import atom2 from './atom/atom2'
import package1 from './package/package1'
import package2 from './package/package2'

injection({
  atom: [atom1, atom2],
  package: [package1, package2]
})

export default {
  testFun: function () {
    console.warn('组装成功：', getMateriel())

    // 测试package1方法
    getMateriel('package1').getAtom1Promise()

    // 测试package2方法
    getMateriel('package2').packageLogin()
  }
}
