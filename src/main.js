import Vue from 'vue'
import App from './App.vue'
// 引入element-ui第三方的包
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入路由
import router from '@/router'
// 使用饿了么
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
