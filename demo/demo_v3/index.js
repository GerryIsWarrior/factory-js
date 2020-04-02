import {injection, getMateriel} from '../../npm/src/index'

import test1 from './atom/test1'
import test2 from './atom/test2'
import test3 from './atom/test3'

import output1 from './package/output1'

injection({
  atom: [
    [test1, test2, test3]
  ],
  package: [output1]
})

console.log('有限透传：', getMateriel())

getMateriel('package').output()
