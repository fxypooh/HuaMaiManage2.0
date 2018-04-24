import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Default from '@/components/Default'
import Home from '@/components/home/Home'
import Device from '@/components/device/Device'

Vue.use(Router)

export default new Router({
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
                    { 
                    	path: '/home', 
                    	component: Home
                	},
                    { path: '/deivce', component: Device}
                ]
    }
  ]
})
