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
// 引入获取本地存储的函数
import local from '@/utils/local'
// 引入素材管理组件
import image from '@/views/images'
// 引入发布文章
import publish from '@/views/publish'
// 引入评论管理组件
import comment from '@/views/comment'
// 引入个人设置组件
import setting from '@/views/setting'
// 引入粉丝管理组件
import fans from '@/views/fans'
// 使用router路由器
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
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
        },
        {
          path: '/image',
          component: image
        },
        {
          path: '/publish',
          component: publish
        },
        {
          path: '/comment',
          component: comment
        },
        {
          path: '/setting',
          component: setting
        },
        {
          path: '/fans',
          component: fans
        }
      ]
    },
    {
      path: '*',
      component: none
    }
  ]
})
export default router
// 设置导航守卫，因为在从登录页面到首页需要用到，在跳转页面的时候，判断是否有用户的信息，如果有用户信息，则放行，如果没有用户
// 信息，判断是不是登录页面，如果是登录页面则放行，不是则阻止到登录界面
router.beforeEach((to, from, next) => {
  const msg = local.getuser()
  if (msg) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
