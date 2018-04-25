import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
  	user:{}
  },
  mutations:{
  	userLogin(state,data){
  		state.user=data;//登录后给user赋值
  	}
  }
})

export default store