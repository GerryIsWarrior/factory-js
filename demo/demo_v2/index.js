import {injection, getMateriel} from '../../npm/src/index'

import atom1 from './atom/atom1.js'
import atom2 from './atom/atom2.js'

import atom3 from './atom/atom3.js'

import package1 from './package/package.js'

injection({
  atom: [
    [atom1, atom2],
    [atom3]
  ],
  package: [package1]
})

console.log('测试调用', getMateriel())

getMateriel('package').testByPackage()
