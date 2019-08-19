// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


// 引入vant ui
import Vant,  {Toast }from '../node_modules/vant'; 
import '../node_modules/vant/lib/index.css'; 

import ElementUI from '../node_modules/element-ui'; 
import '../node_modules/element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI); 
// 引入rem
import './js/rem'

// 引入vuescroller
import VueScroll from '../node_modules/vuescroll'
Vue.use(VueScroll)

// 引入vuescroller
import VueScroller from '../node_modules/vue-scroller'
Vue.use(VueScroller)


import store from './store/index'




import "../node_modules/babel-polyfill"




if (localStorage.pagecount) {
localStorage.pagecount = Number(localStorage.pagecount) + 1; 
}else {
localStorage.pagecount = 1; 
}
console.log(localStorage.pagecount); 

// 引入axios
import axios from "../node_modules/axios"; 
Vue.prototype.$http = axios; 
axios.defaults.withCredentials = true; 
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; 
// axios.defaults.baseURL = 'http://partner.iread.wo.com.cn/qypt/vip/'
axios.defaults.baseURL = 'http://partner.iread.wo.com.cn/qypt/test/'

// axios.defaults.baseURL = 'http://192.168.200.246:8023/'
// axios.defaults.baseURL = 'http://192.168.201.184:8023/vip/'
// axios.defaults.baseURL = 'http://192.168.200.185:8023/'


import user from './components/comment'

Vue.prototype.user = user;



// 拦截器
// axios.interceptors.request.use(
// config =>  {
// if (localStorage.token) {// 判断是否存在token，如果存在的话，则每个http header都加上token            
// config.headers.acc_token = localStorage.token; 
// }
// return config; 
// }, 
// error =>  {
// Vue.prototype.$message( {
// message:err, 
// type:'error'
// }); 
// localStorage.removeItem('user')
// this.$router.push( {
// path:'/login'
// })
// return Promise.reject(err); 
// }); 

axios.interceptors.response.use(
response =>  {
//当返回信息为未登录或者登录失效的时候重定向为登录页面
if (response.data.retCode == '401' || response.data.retCode == '201' || response.data.retMsg == '用户未登录') {
localStorage.removeItem("user")
Toast("登入失效,请重新登录")
setTimeout(() =>  {
router.push( {
path:"/login", 
querry: {redirect:router.currentRoute.fullPath}//从哪个页面跳转
})
window.location.reload()
}, 2000); 
}
return response; 
}, 
error =>  {
return Promise.reject(error)
})

// 路由守卫
router.beforeEach((to, from, next) =>  {
if (to.matched.some(record => record.meta.requiresAuth)) {
//这里判断用户是否登录，验证本地存储是否有user
if ( ! localStorage.user) {
next( {
path:'/login', 
query: {redirect:to.fullPath }
})
}else {
next()
}
}else {
next()// 确保一定要调用 next()
}
})


// router.afterEach((to,from,next) => {
//     window.scrollTo(0,0);})


// 按需添加
import {Button, Swipe, SwipeItem, Icon, Tabbar, TabbarItem, NavBar, Tab, Tabs, RadioGroup, Radio, Loading, Collapse, CollapseItem, ImagePreview  }from 'vant'; 
Vue.use(Vant).use(Button).use(Swipe).use(SwipeItem).use(Icon).use(Tabbar).use(TabbarItem).use(NavBar).use(Tab).use(Tabs).use(RadioGroup).use(Radio).use(Loading).use(Collapse).use(CollapseItem).use(ImagePreview); 





Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue( {
el:'#app', 
router, 
store, 
components: {App }, 
template:'<App/>'
})
