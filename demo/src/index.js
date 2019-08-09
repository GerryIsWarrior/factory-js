import {injection, getMateriel} from '../../npm/src/index'

import atom1 from './atom/atom1'
import atom2 from './atom/atom2'
import package1 from './package/package1'
import package2 from './package/package2'

injection({
  atom: [atom1, atom2],
  package: [package1, package2]
})

console.warn('123', getMateriel())
