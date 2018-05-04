
<template>
	<el-menu
      :default-active="activeIndex"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      background-color="#2d2e2f"
      text-color="#fff"
      active-text-color="#0b78e3"
      router>

      <!-- <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-service"></i>
          <span slot="title">营销管理</span>
        </template>
        <el-menu-item index="2-1">页面文案</el-menu-item>
        <el-menu-item index="2-2">banner管理</el-menu-item>
        <el-menu-item index="2-3">新闻消息</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>设备管理</span>
        </template>
        <el-menu-item index="3-1">设备型号管理</el-menu-item>
        <el-menu-item index="3-2">客户设备列表</el-menu-item>
        <el-menu-item index="3-3">无主设备列表</el-menu-item>
        <el-submenu index="3-4">
          <template slot="title">测试</template>
          <el-menu-item index="3-4-1">测试数据删除</el-menu-item>
        </el-submenu>
        <el-submenu index="3-5">
          <template slot="title">设备部件</template>
          <el-menu-item index="3-5-1">部件到期统计</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-share"></i>
          <span slot="title">经销商管理</span>
        </template>
        <el-menu-item index="4-1">经销商列表</el-menu-item>
        <el-menu-item index="4-2">添加经销商</el-menu-item>
        <el-menu-item index="4-3">推荐人列表</el-menu-item>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-news"></i>
          <span slot="title">客户管理</span>
        </template>
        <el-menu-item index="5-1">客户列表</el-menu-item>
        <el-menu-item index="5-2">添加客户</el-menu-item>
      </el-submenu>

      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span slot="title">订单管理</span>
        </template>
        <el-menu-item index="6-1">未分账订单</el-menu-item>
        <el-menu-item index="6-2">已分账订单</el-menu-item>
        <el-menu-item index="6-3">首充订单</el-menu-item>
      </el-submenu>

      <el-submenu index="7">
        <template slot="title">
          <i class="el-icon-sold-out"></i>
          <span slot="title">售后管理</span>
        </template>
        <el-menu-item index="7-1">售后列表</el-menu-item>
      </el-submenu>

      <el-submenu index="8">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">管理员设置</span>
        </template>
        <el-menu-item index="8-1">管理员列表</el-menu-item>
        <el-menu-item index="8-2">添加管理员</el-menu-item>
      </el-submenu> -->

      <my-menu-item 
      :indexText="item.index" 
      :titleText="item.title" 
      :icon="item.icon" 
      :submenu="item.submenu" 
      v-for="(item,key) in power" 
      :key="key">
      </my-menu-item>

    </el-menu>
</template>

<script>
import MenuItem from './MenuItem'
export default {
  name: 'Menu',
  components:{'my-menu-item':MenuItem},
  data () {
    return {
      power:[]    
    }
  },
  computed:{
    activeIndex(){
      //console.log(this.$route.path);
      //return this.$route.path.replace('/default/','')
      let path=this.$route.path;
      if(path==="/default/device-add"||path==="/default/device-update"){
        path="/default/device";
      }
      return path;
    }
  },
  methods: {
      handleOpen(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        //console.log(key, keyPath);
      }
  },
  created:function(){
    var _this=this;
    this.$ajax.get("../../static/data/userPower.json").then(function(response){
        var data=response.data;
        var level=JSON.parse(sessionStorage.getItem("user")).level;
        var power=data[level];
        _this.power=power;
        //console.log(power);
    }).catch(function(error){
            console.log(error);
          }); 
  }
}
</script>

<style>
  .el-menu{text-align:left;}
  .el-menu-vertical{border-right:2px solid #0b78e3;}
  .el-menu--inline{padding-left: 12px;}
  .el-menu-item{border-bottom: 1px solid #2e2f33;}
</style>