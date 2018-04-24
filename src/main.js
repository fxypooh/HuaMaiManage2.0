// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//自定义样式主色
import './assets/styles-element/index.css'
import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css';//默认样式
import axios from 'axios'
import Vuex from 'vuex'
import store from './vuex/store'


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.prototype.$ajax = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
