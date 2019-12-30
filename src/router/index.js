import Vue from 'vue'
import Router from 'vue-router'
import {
  getDefaultMenu
} from '@/api/login'
import {
  initRoute
} from '@/utils/router'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'
Vue.use(Router)

export const routes = [{
    path: '/singleLogin',
    component: () => import('@/components/loginJump/loginJump'),
    query: {
      id: 555,
      token: 555
    }
  },
  {
    path: '/details',
    component: () => import('@/components/view/details'),
    query: {
      id: 555,
      type: 555
    }
  },
  {
    path: '/',
    redirect: '/homePage'
  },
  {
    path: '/login',
    name: '登录',
    hidden: true,
    component: () => import('@/components/login/login'),
    meta: {}
  },
  {
    path: '/register',
    name: '注册',
    hidden: true,
    component: () => import('@/components/view/register'),
    meta: {}
  },
  {
    path: '*',
    name: '404',
    hidden: true,
    component: () => import('@/components/404/notFound'),
    meta: {
      title: '404未找到'
    }
  }
]


export const router = new Router({
  routes
})
let mark = false

function loadRoute() {
  const {
    routes
  } = router.options;
  const token = getToken()
  console.log(token)
  if (!token) {
    const index = routes.findIndex(
      route => route.name === 'home'
    )
    console.log(index, routes)
    if (index > -1) {
      const newRoutes = routes[index].children.filter(item => {
        return item.path !== '/serverManager' && item.path !== '/personalCenter'
      })
      routes[index].children = newRoutes
      console.log(newRoutes)
      router.addRoutes(routes)
    }
  }
  if (!routes.find(route => route.name === 'home')) {
    return getDefaultMenu().then(({
      data: {
        list,
        userinfo
      }
    }) => {
      initRoute(list, router)
      // setUserInfo(userinfo)
      return Promise.resolve(true)
    })
  } else {
    return Promise.resolve(false)
  }
}
router.beforeEach((to, from, next) => {
  store.commit('SET_LOADING', true)
  loadRoute().then(type => {
    if (type && typeof type === 'boolean') {
      const path = location.href.split('#').pop()
      next(path)
    } else {
      next();
    }
  })
})
router.afterEach(() => {
  store.commit('SET_LOADING')
})
