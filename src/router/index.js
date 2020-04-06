import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import '../assets/css/global.css'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home
    },
    // {
    //   path: '/about',
    //   name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')

    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    //如果用户访问登录页，直接放行
    if (to.path === '/login') return next();

    //从sessionstroage中读出token值
    const tokenStr = window.sessionStorage.getItem('token');

    //没有token，则跳转到 登录页
    if (!tokenStr) {
        return next('/login');
    }
    next();

})

export default router
