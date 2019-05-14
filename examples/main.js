import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './core/use'

router.beforeEach((to, from, next) => {
  // 更改页面
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '连萌工具集'
  }

  next()
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
