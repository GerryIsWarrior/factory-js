import {injection, getMateriel} from '../../npm/src/index'

import atom1 from './atom/atom1.js'
import atom2 from './atom/atom2.js'

import package1 from './package/package1.js'
import package2 from './package/package2.js'

injection({
  atom: [
    [atom1, atom2]
  ],
  package: [package1, package2]
})

console.log('package组装逻辑：', getMateriel())
getMateriel('package1').getAtom1Promise()
getMateriel('package2').packageLogin()
