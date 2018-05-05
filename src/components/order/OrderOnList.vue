<template>
	<div>
		<h1 class="pageTitle">
      订单列表-未分账 
      <el-button type="primary" @click="goAdd">一键分账前一千条</el-button>
      <el-button type="primary" @click="goAdd">导出分账excel表前一千条</el-button>
    </h1>
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="70px" class="demo-ruleForm">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="关键词" prop="searchKeyWord">
              <el-input v-model.trim="ruleForm.searchKeyWord" placeholder="客户姓名、经销商姓名、mac码" maxlength="30"> <i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="接入时间" prop="modelName">
              <el-date-picker
                v-model="ruleForm.searchTime"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="省市区" prop="splitRatio">
              <el-cascader
                size="large"
                :options="options"
                v-model="ruleForm.selectedOptions"
                @change="handleChange">
              </el-cascader>
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
          prop="device"
          label="设备编码"
          align="center"
          min-width="140">
          <template slot-scope="scope">
            <el-popover placement="top">
                <p>型号Byte: {{ scope.row.device.modelbyte }}</p>
                <p>型号名称: {{ scope.row.device.modelname }}</p>
                <p>设备名称: {{ scope.row.device.deviceName }}</p>
                <p>接入时间: {{ scope.row.device.startdate }}</p>
                <p>服务时间: {{ scope.row.device.servicedate }}</p>
                <p v-for="item in scope.row.device.part">{{item.name}}:{{item.day}},寿命:{{item.allday}}</p>
              <el-button type="primary" plain slot="reference" size="mini">{{ scope.row.device.mac}}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
            prop="client"
            label="客户"
            align="center"
            min-width="110">
            <template slot-scope="scope">
              <el-popover placement="top">
                  <p>姓名: {{ scope.row.client.name }}</p>
                  <p>手机: {{ scope.row.client.phone }}</p>
                  <p>住址: {{ scope.row.client.address }}</p>
                <el-button type="primary" plain slot="reference" size="mini">{{ scope.row.client.name }}</el-button>
              </el-popover>
            </template>
        </el-table-column>
        <el-table-column
            prop="dealer"
            label="经销商"
            align="center"
            min-width="110">
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
          prop="money"
          label="充值金额"
          align="center"
          min-width="90">
        </el-table-column>
        <el-table-column
          prop="day"
          label="购买时长"
          align="center"
          min-width="90">
        </el-table-column>
        <el-table-column
          prop="orderDay"
          label="订单时间"
          align="center"
          min-width="110">
        </el-table-column>
        <el-table-column
          prop="orderWay"
          label="付款方式"
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="orderCode"
          label="付款订单"
          align="center"
          min-width="250">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            align="center"
            min-width="110">
            <template slot-scope="scope">
              <el-button size="mini" @click="goSplit(scope.$index, scope.row)" type="warning" plain>点击分账</el-button>
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
import { regionDataPlus, CodeToText} from 'element-china-area-data'
export default {
  name: 'OrderOnList',
  data () {
    return {
      tableData: [],
  		currentPage: 1,
  		pageSize:10,
  		pageSizes:[10, 20, 30, 40],
  		total:100,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      options: regionDataPlus,
      ruleForm: {
        selectedOptions:[],
        searchKeyWord: '',
        searchCity:'',
        searchTime:'',
      }
    }
  },
  methods:{
  	goSplit(index,item){
  		console.log(index,item.deviceId);
      //this.$router.push('device-update/'+item.deviceId);
  		//this.$router.push({name: 'DeviceUpdate', params: {id: item.deviceId}});
  	},
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
    },
    handleChange (value) {
        this.ruleForm.searchCity="";
        for(let key in value){
          var code=value[key];
          var text=CodeToText[code]==="全部"?"":CodeToText[code];
          this.ruleForm.searchCity+=text;
        }
        console.log(this.ruleForm.searchCity);
    }
  },
  created:function(){
    var _this=this;
    this.$ajax.get("../../../static/data/orderOnList.json").then(function(response){
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