<template>
	<div>
		<h1 class="pageTitle">设备型号-列表 <el-button type="primary" @click="goAdd">添加型号</el-button></h1>
		<el-table
	    header-row-class-name="tableHeader"
  		:data="tableData"
  		border
  		stripe
  		style="width: 100%">
			<el-table-column label="缩略图">
				<template slot-scope="scope">
		        <img :src="scope.row.deviceImg" width="80" height="100" style="display:block" />
		    </template>
			</el-table-column>
			<el-table-column  prop="deviceModel" label="型号byte"> </el-table-column>
			<el-table-column prop="deviceModelName" label="型号名称"> </el-table-column>
			<el-table-column prop="splitRatio" label="分成"> </el-table-column>
			<el-table-column fixed="right" label="操作">
		      <template slot-scope="scope">
		      	<el-button size="mini" @click="goUpdate(scope.$index, scope.row)" type="primary" plain>编辑</el-button>
		      </template>
		    </el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
  name: 'DeivceModel',
  data () {
    return {
      tableData: [{
     	  deviceId:'11',
     	  deviceModel:'1',
     	  deviceModelName:'HMR-I5',
     	  splitRatio:'1',
     	  deviceImg:'http://app.hmjsq.net/resources/images/device/27a62124-7dd9-40a6-8a28-18505c852288.png'
        }, {
     	  deviceId:'12',
     	  deviceModel:'1',
     	  deviceModelName:'夏季促销',
     	  splitRatio:'1',
     	  deviceImg:'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=1a3d82d42f2dd42a4b0409f9625230d0/314e251f95cad1c86a912b9a753e6709c93d5161.jpg'
        }, {
     	  deviceId:'13',
     	  deviceModel:'1',
     	  deviceModelName:'夏季促销',
     	  splitRatio:'1',
     	  deviceImg:'http://app.hmjsq.net/resources/images/device/27a62124-7dd9-40a6-8a28-18505c852288.png'
        }, {
     	  deviceId:'14',
     	  deviceModel:'1',
     	  deviceModelName:'夏季促销',
     	  splitRatio:'1',
     	  deviceImg:'http://app.hmjsq.net/resources/images/device/27a62124-7dd9-40a6-8a28-18505c852288.png'
        }, {
     	  deviceId:'15',
     	  deviceModel:'1',
     	  deviceModelName:'夏季促销',
     	  splitRatio:'1',
     	  deviceImg:'http://app.hmjsq.net/resources/images/device/27a62124-7dd9-40a6-8a28-18505c852288.png'
        }, {
        deviceId:'15',
        deviceModel:'1',
        deviceModelName:'夏季促销',
        splitRatio:'1',
        deviceImg:'http://app.hmjsq.net/resources/images/device/27a62124-7dd9-40a6-8a28-18505c852288.png'
        }, {
        deviceId:'15',
        deviceModel:'1',
        deviceModelName:'夏季促销',
        splitRatio:'1',
        deviceImg:'http://app.hmjsq.net/resources/images/device/27a62124-7dd9-40a6-8a28-18505c852288.png'
        }, {
        deviceId:'15',
        deviceModel:'1',
        deviceModelName:'夏季促销',
        splitRatio:'1',
        deviceImg:'http://app.hmjsq.net/resources/images/device/27a62124-7dd9-40a6-8a28-18505c852288.png'
        }]
      }
  },
  methods:{
  	goUpdate(index,item){
  		console.log(index,item.deviceId);
      //this.$router.push('device-update/'+item.deviceId);
  		this.$router.push({name: 'DeivceModelUpdate', params: {id: item.deviceId}});
  	},
  	goAdd(){
		  this.$router.push('device-add');
	  }
  }
}
</script>

<style scoped>

</style>