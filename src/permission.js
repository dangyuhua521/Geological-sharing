import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'
import { getToken, getUserInfo } from '@/utils/auth' // 验权
import { deepEqual } from 'assert'

const whiteList = ['/login']; // 不重定向白名单
    // const whiteList = ['/login'] // 不重定向白名单,'/'
    //
router.beforeEach((to, from, next) => {
    NProgress.start()

    //let userRole=getToken();
    let userInfo = getUserInfo();
    let token = getToken();
    // if (userRole) {
    if (token) {
        if (to.path === '/login') {
            next()
            NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
        } else {
            // if (to.meta.role && to.meta.role.indexOf(userRole) >= 0) {
            //     store.dispatch('GetInfo').then(res => { //调用 GetInfo方法 拉取用户信息
            next()
                //     }).catch((err) => {
                //         store.dispatch('FedLogOut').then(() => {
                //             next({ path: '/' })
                //         })
                //     })
                // } else {
                //     next({ path: '/' })

            // }
            NProgress.done()

        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})
