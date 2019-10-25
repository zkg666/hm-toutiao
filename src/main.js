import Vue from 'vue'
import App from './App.vue'
// 引入element-ui第三方的包子
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 使用饿了么
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
