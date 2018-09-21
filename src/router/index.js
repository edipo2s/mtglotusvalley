import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = Vue.prototype.$currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const hasValidUser = currentUser !== undefined && currentUser.id !== undefined
  if (requiresAuth && !hasValidUser) {
    next('/')
  } else {
    next()
  }
})

export default router
