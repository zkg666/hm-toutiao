import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入login登录组件
import login from '@/views/login'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/login',
      component: login
    }
  ]
})
