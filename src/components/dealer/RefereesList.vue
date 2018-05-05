<template>
	<div>
		<h1 class="pageTitle">推荐人-列表</h1>
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="70px" class="demo-ruleForm">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="关键词" prop="searchKeyWord">
              <el-input v-model.trim="ruleForm.searchKeyWord" placeholder="推荐人姓名" maxlength="30"> <i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-button type="primary"  @click="submitForm('ruleForm')">提交查询</el-button>
        </el-col>
      </el-row>
    </el-form>

		<el-table
      header-row-class-name="tableHeader"
      :data="tableData"
      border
      stripe
      style="width: 100%"
      max-height="580">
        <el-table-column
          fixed
          prop="name"
          label="推荐人姓名"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="dealer"
          label="所属经销商"
          align="center"
          min-width="120">
          <template slot-scope="scope">
            <el-popover placement="top">
                <p>姓名: {{ scope.row.dealer.name }}</p>
                <p>等级: {{ scope.row.dealer.level=="1"?"运营管理帐户":"高级管理账户"}}</p>
                <p>手机: {{ scope.row.dealer.phone }}</p>
                <p>支付宝: {{ scope.row.dealer.zfb }}</p>
                <p>编码: {{ scope.row.dealer.code }}</p>
                <p>住址: {{ scope.row.dealer.address }}</p>
              <el-button type="primary" plain slot="reference" size="mini">{{ scope.row.dealer.name }}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="orders"
          label="分账记录"
          align="center"
          min-width="130">
          <template slot-scope="scope">
            <el-popover placement="top">
                <el-table :data="scope.row.orders" max-height="200">
                  <el-table-column width="80" property="money" align="center" label="充值金额" fixed></el-table-column>
                  <el-table-column width="80" property="day" align="center" label="购买时长"></el-table-column>
                  <el-table-column width="100" property="date" align="center" label="下单订单"></el-table-column>
                  <el-table-column width="80" property="payWay" align="center" label="付款方式"></el-table-column>
                </el-table>
              <el-button type="primary" plain slot="reference" size="mini">查看分账</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="zfb"
          label="支付宝账号"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="split"
          label="分成比例"
          align="center"
          min-width="90">
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
  name: 'RefereesList',
  data () {
    return {
      tableData: [],
  		currentPage: 1,
  		pageSize:10,
  		pageSizes:[10, 20, 30, 40],
  		total:100,
      ruleForm: {
        searchKeyWord: ''
      }
    }
  },
  methods:{
  	handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize=val;
	  },
  	handleCurrentChange(val) {
  		console.log(`当前页: ${val}`);
  		console.log('当前每页'+this.pageSize+'条')
  	},
    submitForm(formName) {
      var _this=this;
      console.log(this.ruleForm);
      /*this.$ajax.get("../../static/data/user.json",this.ruleForm,config)
      .then(function(response){
        _this.$message({type: 'success', message: '添加成功!'});
        //成功后清空表单清空图片等数据
        _this.resetForm(formName);
      })
      .catch(function(error){
        console.log(error);
      }); */
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs[formName].clearValidate();
    }
  },
  created:function(){
    var _this=this;
    this.$ajax.get("../../../static/data/dealerReferees.json").then(function(response){
        _this.tableData=response.data;
        //console.log(power);
    }).catch(function(error){
            console.log(error);
          }); 
  }
}
</script>

<style scoped>

</style>