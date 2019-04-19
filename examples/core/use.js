import 'lib-flexible'
import 'assets'

import ajax from 'utils/axios/index.js'
window.ajax = ajax

import { Indicator, Toast  } from 'mint-ui'
window.toast = Toast
window.indicator = Indicator
// 全局注册 clipboard
import clipboard from 'clipboard'
window.clipboard = clipboard