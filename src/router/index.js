import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Manager/Home'
import '../assets/css/global.css'
import Welcome from '../components/manager/Welcome'
import BookList from '../components/manager/bookmanage/BookList'
import AddBook from '../components/manager/bookmanage/AddBook'
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
        path: '/home',
        name: 'Home',
        component: Home,
        redirect: '/welcome',  //在Home中的 router-view中填入子组件
        children: [
            {path: '/welcome',component: Welcome},
            {path: '/showbooks',component: BookList},
            {path: '/addbook',component: AddBook}]
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
