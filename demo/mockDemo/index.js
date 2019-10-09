import {injection, getMateriel} from '@fines/factory-js'

import config from './atom/one/config'
import mock from './atom/one/mock'
import request from './atom/two/request'

import test from './package/index'

injection({
  atom: [
    [config, mock],
    [request]
  ],
  package: [test]
})

export default getMateriel('testFile')
