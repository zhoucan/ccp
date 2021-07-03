import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Detaillist from '@/views/detaillist'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: '注册',
    component: Login
  },
  {
    path: '/home',
    name: '首页',
    component: Home
  },
  {
    path: '/detail',
    name: '提现详情',
    component: Detaillist
  }

]

const router = new Router({
  routes
})

router.beforeEach((to, form, next) => {
  const Token = localStorage.getItem('token')

  if (to.path === '/login') return next()

  if (!Token) return next({ path: '/login' })

  next()
})

export default router
