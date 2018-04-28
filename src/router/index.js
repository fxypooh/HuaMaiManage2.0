import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import store from '../vuex/store'
import Login from '@/components/Login'
import Default from '@/components/Default'
import Home from '@/components/home/Home'
import Device from '@/components/device/Device'
import DeviceAdd from '@/components/device/DeviceAdd'
import MarketText from '@/components/marketing/MarketText'
import MarketBanner from '@/components/marketing/MarketBanner'
import MarketMsg from '@/components/marketing/MarketMsg'
import MarketNews from '@/components/marketing/MarketNews'

Vue.use(Router);
Vue.use(Vuex);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/default',
      name: 'Default',
      component: Default,
      children:[
                    { path: '/home', name:'Home',component: Home, meta:{auth:true} }, // meta:{auth:true}设置当前路由需要校验  不需要校验的路由就不用写了
                    { path: '/market-text', name:'MarketText',component: MarketText, meta:{auth:true}},
                    { path: '/market-banner', name:'MarketBanner',component: MarketBanner, meta:{auth:true}},
                    { path: '/market-msg', name:'MarketMsg',component: MarketMsg, meta:{auth:true}},
                    { path: '/market-news', name:'MarketNews',component: MarketNews, meta:{auth:true}},
                    { path: '/device', name:'Device',component: Device, meta:{auth:true}},
                    { path: '/device-add', name:'DeviceAdd',component: DeviceAdd, meta:{auth:true}}
                ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  //console.log(to);
  //console.log(from);
  //console.log(next);
  if(to.meta.auth){// 对路由进行验证  
    var user=JSON.parse(sessionStorage.getItem('user'));
    //console.log(user.username);
    if(user&&user.username) { // 已经登陆-vuex验证store.state.user.username//用vuex会导致刷新后跳回登录页
      //console.log(store.state.user.username)       
      next()   // 正常跳转
    }else{
      next({path:'/',query:{ Rurl: to.fullPath} })
    }
  }else{
    next();
  }
})

export default router
