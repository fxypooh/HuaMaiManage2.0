import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import store from '../vuex/store'
import Login from '@/components/Login'
import Default from '@/components/Default'
import Home from '@/components/home/Home'
import MarketText from '@/components/marketing/MarketText'
import MarketBanner from '@/components/marketing/MarketBanner'
import MarketMsg from '@/components/marketing/MarketMsg'
import MarketNews from '@/components/marketing/MarketNews'
import DeivceModel from '@/components/device/DeivceModel'
import DeivceModelAdd from '@/components/device/DeivceModelAdd'
import DeivceOnList from '@/components/device/DeivceOnList'
import DeivceOffList from '@/components/device/DeivceOffList'
import DeivceParts from '@/components/device/DeivceParts'
import DeivcePartsPrint from '@/components/device/DeivcePartsPrint'
import DealersList from '@/components/dealer/DealersList'
import DealerAdd from '@/components/dealer/DealerAdd'
import RefereesList from '@/components/dealer/RefereesList'
import ClientsList from '@/components/client/ClientsList'
import ClientAdd from '@/components/client/ClientAdd'
import OrderOnList from '@/components/order/OrderOnList'
import OrderOffList from '@/components/order/OrderOffList'
import OrderFirstList from '@/components/order/OrderFirstList'
import AfterSale from '@/components/aftersale/AfterSale'
import TestClientsList from '@/components/test/TestClientsList'
import TestClientAdd from '@/components/test/TestClientAdd'
import TestDeivceOnList from '@/components/test/TestDeivceOnList'
import AdminList from '@/components/admin/AdminList'
import AdminAdd from '@/components/admin/AdminAdd'

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
                    { path: 'home', name:'Home',component: Home, meta:{auth:true} }, // meta:{auth:true}设置当前路由需要校验  不需要校验的路由就不用写了
                    { path: 'market-text', name:'MarketText',component: MarketText, meta:{auth:true}},
                    { path: 'market-banner', name:'MarketBanner',component: MarketBanner, meta:{auth:true}},
                    { path: 'market-msg', name:'MarketMsg',component: MarketMsg, meta:{auth:true}},
                    { path: 'market-news', name:'MarketNews',component: MarketNews, meta:{auth:true}},
                    { path: 'device', name:'DeivceModel',component: DeivceModel, meta:{auth:true}},
                    { path: 'device-add', name:'DeivceModelAdd',component: DeivceModelAdd, meta:{auth:true}},
                    { path: 'device-update/:id', name:'DeivceModelUpdate',component: DeivceModelAdd, meta:{auth:true}},
                    { path: 'device-on-list', name:'DeivceOnList',component: DeivceOnList, meta:{auth:true}},
                    { path: 'device-off-list', name:'DeivceOffList',component: DeivceOffList, meta:{auth:true}},
                    { path: 'device-parts', name:'DeivceParts',component: DeivceParts, meta:{auth:true}},
                    { path: 'dealer', name:'DealersList',component: DealersList, meta:{auth:true}},
                    { path: 'dealer-add', name:'DealerAdd',component: DealerAdd, meta:{auth:true}},
                    { path: 'dealer-update/:id', name:'DealerUpdate',component: DealerAdd, meta:{auth:true}},
                    { path: 'dealer-referees', name:'RefereesList',component: RefereesList, meta:{auth:true}},
                    { path: 'client', name:'ClientsList',component: ClientsList, meta:{auth:true}},
                    { path: 'client-add', name:'ClientAdd',component: ClientAdd, meta:{auth:true}},
                    { path: 'client-update/:id', name:'ClientUpdate',component: ClientAdd, meta:{auth:true}},
                    { path: 'order-on-list', name:'OrderOnList',component: OrderOnList, meta:{auth:true}},
                    { path: 'order-off-list', name:'OrderOffList',component: OrderOffList, meta:{auth:true}},
                    { path: 'order-first-list', name:'OrderFirstList',component: OrderFirstList, meta:{auth:true}},
                    { path: 'aftersale', name:'AfterSale',component: AfterSale, meta:{auth:true}},
                    { path: 'test-client', name:'TestClientsList',component: TestClientsList, meta:{auth:true}},
                    { path: 'test-client-add', name:'TestClientAdd',component: TestClientAdd, meta:{auth:true}},
                    { path: 'test-client-update/:id', name:'TestClientUpdate',component: TestClientAdd, meta:{auth:true}},
                    { path: 'test-device', name:'TestDeivceOnList',component: TestDeivceOnList, meta:{auth:true}},
                    { path: 'admin', name:'AdminList',component: AdminList, meta:{auth:true}},
                    { path: 'admin-add', name:'AdminAdd',component: AdminAdd, meta:{auth:true}},
                    { path: 'admin-update/:id', name:'AdminUpdate',component: AdminAdd, meta:{auth:true}},
                ]
    },
    {
      path: '/print-part/:deviceModle/:day',
      name: 'DeivcePartsPrint',
      component: DeivcePartsPrint,
      meta:{auth:true}
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
