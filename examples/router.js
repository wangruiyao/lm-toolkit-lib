import Vue from 'vue'
import Router from 'vue-router'

// 导入组件库
// import toolkit from '../lib/vcolorpicker.common'
import toolkit from './../packages/index'
Vue.use(toolkit);
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/broadbandAddress',
      name: 'broadbandAddress',
      component: toolkit.broadbandAddress
    }
  ]
})
