
<template>
	<el-menu
      default-active="1"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      background-color="#3b3e40"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
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
      </el-submenu>
    </el-menu>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      msg: '华迈管理系统'     
    }
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>

<style>
  .el-menu{text-align:left;}
  .el-menu-vertical{border-right:2px solid #ffd04b;}
  .el-menu--inline{padding-left: 13px;border-right:2px solid #208ed3;}
  .el-menu-item{border-bottom: 1px solid #292828;}
</style>