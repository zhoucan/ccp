import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Detaillist from '@/views/detaillist'
import Seekpaswd from '@/views/seekpaswd'
import test from '@/views/test'

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
  },
  {
    path: '/seekpaswd',
    name: '找回密码',
    component: Seekpaswd
  },
  {
    path: '/test',
    name: '测试',
    component: test
  }

]

const router = new Router({
  routes
})

router.beforeEach((to, form, next) => {
  const Token = localStorage.getItem('token')

  if (to.path === '/login') {
    localStorage.removeItem('token')
    next()
    return
  }

  if (to.path === '/seekpaswd') return next()

  if (!Token) return next({ path: '/login' })

  next()
})

export default router
