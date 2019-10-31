import Vue from 'vue'
import App from './App.vue'
// 引入element-ui第三方的包
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入路由
import router from '@/router'
// 引入axios
import axios from '@/api'
import mymb from '@/components/ins.js'
Vue.use(mymb)
// 配置全局axios，这样每个vue实例都有这个方法
Vue.prototype.$http = axios
// 使用饿了么,elementui第三方包
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
