
<template>
	<div>
	    <h1 class="pageTitle">营销管理-消息管理 <el-button type="primary" @click="dialogFormVisible = true">添加消息</el-button></h1>
	    <el-table
	    header-row-class-name="tableHeader"
		:data="tableData"
		border
		stripe
		style="width: 100%">
			<el-table-column
			  prop="cat"
			  label="类别"
			  width="140">
			</el-table-column>
			<el-table-column
			  prop="title"
			  label="标题"
			  width="200">
			</el-table-column>
			<el-table-column
			  prop="content"
			  label="内容">
			</el-table-column>
			<el-table-column
			  prop="date"
			  label="日期"
			  width="140">
			</el-table-column>
			<el-table-column
		      fixed="right"
		      label="操作"
		      width="160">
		      <template slot-scope="scope">
		      	<el-button size="mini" @click="sendMsg(scope.$index, scope.row)" type="primary" plain>发送</el-button>
		      	<el-button size="mini" @click="delMsg(scope.$index, scope.row)" type="warning" plain>删除</el-button>
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

		<el-dialog title="添加新消息" :visible.sync="dialogFormVisible">
		  <el-form :model="form" :rules="rulesForm" ref="rulesForm">
		    <el-form-item label="消息标题" :label-width="formLabelWidth" prop="title">
		      <el-input v-model="form.title" maxlength="25" placeholder="请输入标题（限制25个字）"></el-input>
		    </el-form-item>
		    <el-form-item label="消息内容" :label-width="formLabelWidth" prop="content">
		      <el-input v-model="form.content" type="textarea" :rows="8" maxlength="200" placeholder="请输入内容（限制200个字）"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addMsg('rulesForm')">确 定</el-button>
		  </div>
		</el-dialog>

	</div>
</template>

<script>
export default {
  name: 'MarketMsg',
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
     	  id:'11',
     	  cat:'活动',
     	  title:'夏季促销',
     	  content:'促销买一年送一个月，促销买一年送一个月。促销买一年送一个月，促销买一年送一个月。促销买一年送一个月，促销买一年送一个月。促销买一年送一个月，促销买一年送一个月。促销买一年送一个月，促销买一年送一个月。促销买一年送一个月，促销买一年送一个月。促销买一年送一个月，促销买一年送一个月。促销买一年送一个月，促销买一年送一个月。',
          date: '2016-05-02'
        }, {
          id:'22',
          cat:'活动',
     	  title:'夏季促销',
     	  content:'促销买一年送一个月，促销买一年送一个月。',
          date: '2016-05-02'
        }, {
          id:'33',
          cat:'活动',
     	  title:'夏季促销',
     	  content:'促销买一年送一个月，促销买一年送一个月。',
          date: '2016-05-02'
        }, {
          id:'44',
          cat:'活动',
     	  title:'夏季促销',
     	  content:'促销买一年送一个月，促销买一年送一个月。',
          date: '2016-05-02'
        }, {
          id:'22',
          cat:'活动',
     	  title:'夏季促销',
     	  content:'促销买一年送一个月，促销买一年送一个月。',
          date: '2016-05-02'
        }, {
          id:'33',
          cat:'活动',
     	  title:'夏季促销',
     	  content:'促销买一年送一个月，促销买一年送一个月。',
          date: '2016-05-02'
        }, {
          id:'44',
          cat:'活动',
     	  title:'夏季促销',
     	  content:'促销买一年送一个月，促销买一年送一个月。',
          date: '2016-05-02'
        }, {
          id:'22',
          cat:'活动',
     	  title:'夏季促销',
     	  content:'促销买一年送一个月，促销买一年送一个月。',
          date: '2016-05-02'
        }, {
          id:'33',
          cat:'活动',
     	  title:'夏季促销',
     	  content:'促销买一年送一个月，促销买一年送一个月。',
          date: '2016-05-02'
        }, {
          id:'44',
          cat:'活动',
     	  title:'夏季促销',
     	  content:'促销买一年送一个月，促销买一年送一个月。',
          date: '2016-05-02'
        }, {
          id:'22',
          cat:'活动',
     	  title:'夏季促销',
     	  content:'促销买一年送一个月，促销买一年送一个月。',
          date: '2016-05-02'
        }, {
          id:'33',
          cat:'活动',
     	  title:'夏季促销',
     	  content:'促销买一年送一个月，促销买一年送一个月。',
          date: '2016-05-02'
        }, {
          id:'44',
          cat:'活动',
     	  title:'夏季促销',
     	  content:'促销买一年送一个月，促销买一年送一个月。',
          date: '2016-05-02'
        }, {
          id:'22',
          cat:'活动',
     	  title:'夏季促销',
     	  content:'促销买一年送一个月，促销买一年送一个月。',
          date: '2016-05-02'
        }, {
          id:'33',
          cat:'活动',
     	  title:'夏季促销',
     	  content:'促销买一年送一个月，促销买一年送一个月。',
          date: '2016-05-02'
        }, {
          id:'44',
          cat:'活动',
     	  title:'夏季促销',
     	  content:'促销买一年送一个月，促销买一年送一个月。',
          date: '2016-05-02'
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
  	sendMsg(index,item){
  		this.$confirm('将发送本条消息给客户和经销商, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	//未完
          console.log(index,item);
          this.$message({
            type: 'success',
            message: '发送成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发送'
          });          
        });
  	},
	  delMsg(index,item){
  		this.$confirm('将从列表中删除本条消息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	//未完
          console.log(index,item);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
  	},
  	handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize=val;
	  },
  	handleCurrentChange(val) {
  		console.log(`当前页: ${val}`);
  		console.log('当前每页'+this.pageSize+'条')
  	},
  	addMsg(formName){
      let _this=this;
  		this.$refs[formName].validate((valid) => {
  			if(valid){
  				this.dialogFormVisible=false;
  				this.$message({
	            type: 'success',
	            message: '保存成功!'
	        });
          _this.$refs[formName].resetFields();
          _this.$refs[formName].clearValidate();
  			}else{
  				return false;
  			}
  		});
  	}
  }
}
</script>

<style  scoped>

</style>