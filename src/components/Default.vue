
<template>
	<el-container>
	  <el-header height="70">
	  	<p class="header-logo">华迈管理系统V2.0</p>
	  	<ul class="header-operations">
	  		<li>管理员:{{user}}</li>
	  		<li>设置</li>
	  		<li>退出</li>
	  	</ul>
	  </el-header>
	  <el-container>
	    <el-aside width="200px">
	    	<aside-menu/>
	    </el-aside>
	    <el-main>
	    	Main
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
      msg: '华迈管理系统',
      user:'feng'
    }
  }
}
</script>

<style lang="scss">
  $header-height:70px;
  .el-header {background:$main-color;color:#fff;padding: 0 20px;height:$header-height;line-height:$header-height;}
  .el-header .header-logo{float:left;height:$header-height;}
  .el-header .header-operations{float:right;height:$header-height;}
  .el-header .header-operations li{float:left;padding:0 10px;}


  .el-aside {
    background-color: #3b3e40;
    color: #333;
    text-align: center;
    align-items:stretch;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    align-items:stretch;
  }
  
  #app > .el-container {
    height:100%
  }
  </style>