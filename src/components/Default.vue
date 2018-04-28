
<template>
	<el-container>
	  <el-header height="70">
	  	<div class="header-logo"><img src="../assets/images/logo1.png" class="logo"><span>管理系统V2.0</span></div>
	  	<ul class="header-operations">
	  		<li>{{levelText}}:{{user}}</li>
	  		<li>设置</li>
        <router-link to="/" tag="li" class="loginOut">退出</router-link>
	  	</ul>
	  </el-header>
	  <el-container>
	    <el-aside width="230px">
	    	<aside-menu/>
	    </el-aside>
	    <el-main>
	    	<router-view/>
	    </el-main>
	  </el-container>
	</el-container>
</template>

<script>
import Menu from './Menu'
export default {
  name: 'Default',
  components:{'aside-menu':Menu},
  data () {
    return {
      level:'',
      user:''
    }
  },
  computed:{
    levelText(){
      switch(this.level){
        case '0':
        return "超级管理员"
        break;
        case '1':
        return "高级管理员"
        break;
        case '2':
        return "普通管理员"
        break;
      }
    }
  },
  created:function(){
    var user=JSON.parse(sessionStorage.getItem('user'));
    if(user){
      this.level=user.level;
      this.user=user.username;
    }
  },
  destroyed:function(){
    //当这个组件卸载后退出登录--sessionStorage
    sessionStorage.clear();
  }
}
</script>

<style lang="scss">
  $header-height:70px;
  .el-header {
    background:#00274a;color:#fff;padding: 0 20px;height:$header-height;line-height:$header-height;
    .header-logo{
      float:left;height:$header-height;
      .logo{height:40px;vertical-align:middle;}
      span{padding-left:10px;font-size:16px;}
    }
    .header-operations{
      float:right;height:$header-height;
      li{float:left;padding:0 10px;}
      li.loginOut{
        cursor:pointer;
        &:hover{color:#ffd04b;}
      }
    }
  }

  .el-aside {
    background-color: #2d2e2f;
    color: #333;
    text-align: center;
    align-items:stretch;
  }
  
  .el-main {
    // background-color: #E9EEF3;
    background-color: #fff;
    color: #333;
    text-align: left;
    align-items:stretch;
  }
  
  #app > .el-container {
    height:100%
  }
  </style>