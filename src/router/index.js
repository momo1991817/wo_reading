import Vue from 'vue'
import Router from 'vue-router'




Vue.use(Router)

export default new Router( {
// base:'/history', 
// mode:'history', 
routes:[ {
path:'/', 
name:'主页', 
component:() => import('@/components/home'), 
meta: {
// 路由层级，数值越大层级越深，以此决定转场动画的前进和后退 大于前进，小于后退
index:0, 
showFooter:true, 
keepAlive:true
}},  {
path:'/Home/Class', 
name:'分类', 
component:() => import('@/components/homelist/class'), 
meta: {keepAlive:true}
},  {
path:'/Home/Centent', 
name:'视频权益', 
component:() => import('@/components/homelist/centent'), 
meta: {keepAlive:true}
},  {
path:'/Home/Centent2', 
name:'视频权益2', 
component:() => import('@/components/homelist/centent2'), 
meta: {keepAlive:false}
},  {
path:'/Home/Qie', 
name:'切换', 
component:() => import('@/components/homelist/qie'), 
meta: {keepAlive:true}
},  {
path:'/Home/membership', 
name:'会员领取', 
component:() => import('@/components/homelist/membership'), 
// meta: {keepAlive:true}
},  {
path:'/Home/search', 
name:'搜索', 
component:() => import('@/components/homelist/search'), 
meta: {keepAlive:true}
},  {
path:'/Home/Advertisement', 
name:'广告', 
component:() => import('@/components/homelist/Advertisement'), 
// meta: {keepAlive:true}
}, ,  {
path:'/Home/search/searchlist', 
name:'搜索列表', 
component:() => import('@/components/homelist/searchlist'), 
// meta: {keepAlive:true}
},  {
path:'/me', 
name:'Me', 
component:() => import('@/components/me'), 
meta: {
// 路由层级，数值越大层级越深，以此决定转场动画的前进和后退 大于前进，小于后退
index:0, 
showFooter:true, 
keepAlive:true
}
},  {
path:'/login', 
name:'登录', 
component:() => import('@/components/login'), 
meta: {keepAlive:true}
},  {
path:'/me/Opening', 
name:'开通会员', 
component:() => import('@/components/melist/opening'), 
meta: {requiresAuth:true,}
},  {
path:'/me/Opening/Viphelp', 
name:'开通会员说明', 
component:() => import('@/components/melist/viphelp'), 
meta: {requiresAuth:true, keepAlive:true}
},  {
    path:'/me/Help', 
    name:'帮助中心', 
    component:() => import('@/components/melist/Help'), 
    meta: {keepAlive:true}
    },  {
        path:'/me/coupon', 
        name:'优惠券', 
        component:() => import('@/components/melist/coupon'), 
        meta: {keepAlive:true,requiresAuth:true,}
        },  {
path:'/me/Myvip', 
name:'我的会员', 
component:() => import('@/components/melist/Myvip'), 
meta: {requiresAuth:true, keepAlive:true}
},  {
path:'/me/Orders', 
name:'我的订单', 
component:() => import('@/components/melist/Orders'), 
meta: {requiresAuth:true, }
},  {
path:'/me/LegalStatement', 
name:'法律声明', 
component:() => import('@/components/melist/LegalStatement'), 
meta: {requiresAuth:true, keepAlive:true}
},  {
path:'/me/opening/Payment', 
name:'Payment', 
component:() => import('@/components/melist/Payment'), 
// meta: {keepAlive:true}
},  {
        path:'/vip', 
        name:'会员', 
        component:() => import('@/components/vip'), 
        meta: {
        // 路由层级，数值越大层级越深，以此决定转场动画的前进和后退 大于前进，小于后退
        index:0, 
        showFooter:true, 
        keepAlive:true
        }},  {
                path:'/WxPayTest', 
                name:'会员', 
                component:() => import('@/components/WxPayTest'),}
]
})
