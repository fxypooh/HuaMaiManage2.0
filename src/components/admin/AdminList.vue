<template>
	<div>
		<h1 class="pageTitle">管理员-列表 <el-button type="primary" @click="goAdd">添加管理员</el-button></h1>
		<el-table
	    header-row-class-name="tableHeader"
  		:data="tableData"
  		border
  		stripe
  		style="width: 100%">
			<el-table-column prop="name" label="昵称"> </el-table-column>
			<el-table-column prop="phone" label="手机号码"> </el-table-column>
      <el-table-column prop="ip" label="最后登录ip"> </el-table-column>
			<el-table-column prop="date" label="最后登录时间"> </el-table-column>
			<el-table-column
        fixed="right"
        label="操作"
        align="center"
        min-width="160">
        <template slot-scope="scope">
          <el-button size="mini" @click="goUpdate(scope.$index, scope.row)" type="primary" plain>编辑</el-button>
          <el-button size="mini" @click="goUpdate(scope.$index, scope.row)" type="danger" plain>删除</el-button>
        </template>
      </el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
  name: 'AdminList',
  data () {
    return {
      tableData: []
      }
  },
  methods:{
  	goUpdate(index,item){
  		console.log(index,item.id);
      //this.$router.push('device-update/'+item.deviceId);
  		this.$router.push({name: 'AdminUpdate', params: {id: item.id}});
  	},
  	goAdd(){
		  this.$router.push('admin-add');
	  }
  },
  created:function(){
    var _this=this;
    this.$ajax.get("../../../static/data/adminList.json").then(function(response){
        _this.tableData=response.data;
        console.log(_this.tableData);
    }).catch(function(error){
            console.log(error);
          }); 
  }
}
</script>

<style scoped>

</style>