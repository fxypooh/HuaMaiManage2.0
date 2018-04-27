
<template>
	<el-submenu :index="indexText"  v-if="submenu">
        <template slot="title">
          <i :class="icon" v-if="icon"></i>
          <span slot="title">{{titleText}}</span>
        </template>
        <!-- <el-menu-item :index="item.index" :key="key" v-for="(item,key) in submenu">{{item.title}}</el-menu-item> -->
        <!-- 递归组件-无限极菜单 -->
        <MenuItem
          :indexText="item.index" 
	      :titleText="item.title" 
	      :icon="item.icon" 
	      :submenu="item.submenu" 
	      v-for="(item,key) in submenu" 
	      :key="key">
	    </MenuItem>
    </el-submenu>
	<el-menu-item :index="indexText" v-else>
        <i :class="icon" v-if="icon"></i>
        <span slot="title">{{titleText}}</span>
    </el-menu-item>
</template>

<script>
export default {
  name: 'MenuItem',
  data () {
    return {
      msg: ''     
    }
  },
  props:['indexText','icon','titleText','submenu','routePath'],
  methods: {
      
  },
  
}
</script>

<style>

</style>