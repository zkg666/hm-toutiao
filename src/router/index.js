import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入login登录组件
import login from '@/views/login'
// 引入首页的组件
import home from '@/views/home'
// 引入欢迎界面组件
import welcome from '@/views/welcome'
// 引入内容管理组件
import content from '@/views/content'
// 引入404组件
import none from '@/views/404'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/',
      component: home,
      children: [
        {
          path: '/',
          component: welcome
        },
        {
          path: '/content',
          component: content
        }
      ]
    },
    {
      path: '*',
      component: none
    }
  ]
})
