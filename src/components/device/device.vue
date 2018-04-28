<template>
	<div>
		<h1 class="pageTitle">设备管理-设备型号列表 <el-button type="primary" @click="goAdd">添加型号</el-button></h1>
		<el-table
	    header-row-class-name="tableHeader"
		:data="tableData"
		border
		stripe
		style="width: 100%">
			<el-table-column label="缩略图">
				<template slot-scope="scope">
			        <img :src="scope.row.deviceImg" width="100" height="100"/>
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

		<el-pagination
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
		:current-page.sync="currentPage"
		:page-size="pageSize"
		:page-sizes="pageSizes"
		layout="total,sizes,prev,pager,next,jumper"
		:total="total"
		background>
		</el-pagination>

	</div>
</template>

<script>
export default {
  name: 'Deivce',
  data () {
  	var checkTitle = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入消息标题！'));
      } else {
        callback();
      }
    };
    var checkContent = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入消息内容！'));
      } else {
        callback();
      }
    };
    return {
     tableData: [{
     	  deviceId:'11',
     	  deviceModel:'1',
     	  deviceModelName:'HMR-I5',
     	  splitRatio:'1',
     	  deviceImg:'http://app.hmjsq.net/resources/images/device/27a62124-7dd9-40a6-8a28-18505c852288.png'
        }, {
     	  deviceId:'11',
     	  deviceModel:'1',
     	  deviceModelName:'夏季促销',
     	  splitRatio:'1',
     	  deviceImg:'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=1a3d82d42f2dd42a4b0409f9625230d0/314e251f95cad1c86a912b9a753e6709c93d5161.jpg'
        }, {
     	  deviceId:'11',
     	  deviceModel:'1',
     	  deviceModelName:'夏季促销',
     	  splitRatio:'1',
     	  deviceImg:'http://app.hmjsq.net/resources/images/device/27a62124-7dd9-40a6-8a28-18505c852288.png'
        }, {
     	  deviceId:'11',
     	  deviceModel:'1',
     	  deviceModelName:'夏季促销',
     	  splitRatio:'1',
     	  deviceImg:'http://app.hmjsq.net/resources/images/device/27a62124-7dd9-40a6-8a28-18505c852288.png'
        }, {
     	  deviceId:'11',
     	  deviceModel:'1',
     	  deviceModelName:'夏季促销',
     	  splitRatio:'1',
     	  deviceImg:'http://app.hmjsq.net/resources/images/device/27a62124-7dd9-40a6-8a28-18505c852288.png'
        }],
		currentPage: 1,
		pageSize:10,
		pageSizes:[10, 20, 30, 40],
		total:100,
		dialogFormVisible: false,
		form: {
		  title: '',
		  content: '',
		  cat: ''
		},
		rulesForm:{
			title: [{ validator: checkTitle, trigger: 'blur' }],
			content: [{ validator: checkContent, trigger: 'blur' }]
		},
        formLabelWidth: '100px'
    }
  },
  methods:{
  	goUpdate(index,item){
  		console.log(index,item.deviceId);
  		this.$router.push('/device-add');
  	},
  	goAdd(){
		this.$router.push('/device-add');
	},
  	handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize=val;
	},
	handleCurrentChange(val) {
		console.log(`当前页: ${val}`);
		console.log('当前每页'+this.pageSize+'条')
	}	
  }
}
</script>

<style scoped>

</style>