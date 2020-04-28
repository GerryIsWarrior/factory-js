import {injection, getMateriel} from '../../npm/src/index'

import test1 from './atom/test1'
import test2 from './atom/test2'
import test3 from './atom/test3'

import test4 from './atom/test4'

import output1 from './package/package'

injection({
  atom: [
    [test1, test2, test3],
    [test4]
  ],
  package: [output1]
})

console.log('- 重复原子测试调用开始：')
getMateriel('package').output()


console.log('有限透传测试：', getMateriel())
console.log('showSameObj：', getMateriel().showSameObj)


