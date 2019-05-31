import Vue from 'vue'
import Router from 'vue-router'

// 导入组件库
// import toolkit from '../lib/toolkit.umd.min'
import toolkit from './../packages/index'
Vue.use(toolkit);
Vue.use(Router);
export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: r => require.ensure([], () => r(require('views/Home')), 'Home')
    },
    {
      path: '/broadbandAddress',
      name: 'broadbandAddress',
      component: toolkit.broadbandAddress,
      meta: {
        title: '宽带标准地址查询'
      }
    }
  ]
})
