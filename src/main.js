import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:8089/bookmanagament'

Vue.config.productionTip = false
//每次发请求时过滤
axios.interceptors.request.use(
    config => {
        if (window.sessionStorage.getItem("token")) {
            config.headers.Authorization = window.sessionStorage.getItem("token");
            console.log(window.sessionStorage.getItem("token"));
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });
//每次返回 结果时 过滤
axios.interceptors.response.use(function (response) {
    //如果token过期，则重新定位到登陆界面
    console.log(response);
    if (response.data.message === 'token认证失败') {
        window.sessionStorage.clear();
        router.push('/login');
    }
    return response;

}, function (error) {
    return Promise.reject(error);
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
