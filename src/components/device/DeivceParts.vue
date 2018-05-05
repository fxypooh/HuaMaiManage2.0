<template>
	<div>
		<h1 class="pageTitle">设备部件-到期统计 <el-button type="primary" @click="clickPrit">打印数据</el-button></h1>
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="80px" class="demo-ruleForm">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="设备型号" prop="deviceModel">
              <el-select v-model="ruleForm.deviceModel" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="部件小于" prop="searchDay">
              <el-input-number v-model.trim="ruleForm.searchDay" controls-position="right"  :min="7"></el-input-number> 天
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
            fixed="left"
            prop="dealer"
            label="经销商"
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
          v-for="item in tableParts"
          :key="item.index"
          :prop="item.index"
          :label="item.name"
          align="center"
          min-width="120">
          <template slot-scope="scope">
            <el-button size="mini" @click="showPartDetial(item.index,item.name,scope.row)" type="primary" plain>{{scope.row[item.index]}}</el-button>
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

    <!-- Table -->
    <el-dialog :title="gridTitle" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" max-height="420" stripe>
        <el-table-column property="client.name" label="客户名称" width="120"></el-table-column>
        <el-table-column property="client.phone" label="客户电话" width="150"></el-table-column>
        <el-table-column property="client.address" label="客户地址" ></el-table-column>
        <el-table-column property="day" label="部件剩余时间" width="110"></el-table-column>
      </el-table>
    </el-dialog>

	</div>
</template>

<script>
import { regionDataPlus, CodeToText} from 'element-china-area-data'
export default {
  name: 'DeivceParts',
  data () {
    return {
      tableParts:[],
      tableData: [],
  		currentPage: 1,
  		pageSize:10,
  		pageSizes:[10, 20, 30, 40],
  		total:100,
  		dialogTableVisible: false,
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
      }],
      ruleForm: {
        deviceModel:'选项1',
        searchDay: 7
      },
      gridTitle:'',
      gridData:[]
    }
  },
  methods:{
  	showPartDetial(partindex,partname,item){
  		console.log(partindex,partname,item);
      this.dialogTableVisible=true;
      this.gridTitle=item.dealer.name+":"+partname+",少于"+this.ruleForm.searchDay+"天";
      //用partindex和item.dealer.id请求部件数据
      var _this=this;
      this.$ajax.get("../../../static/data/devicePartsDetial.json").then(function(response){
          _this.gridData=response.data;
      }).catch(function(error){
          console.log(error);
      }); 
  	},
    clickPrit(){
      //top.location.href="devicePartListPint.html?nameOrNumber="+nameOrNumber+"&deviceModle="+deviceModle;
      window.open(window.location.origin + '#/print-part/01/7')
      //console.log(window.location.origin);
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
    }
  },
  created:function(){
    var _this=this;
    this.$ajax.get("../../../static/data/deviceParts.json").then(function(response){
        _this.tableData=response.data.dealerparts;
        _this.tableParts=response.data.parts;
        console.log(response.data.dealerparts);
    }).catch(function(error){
            console.log(error);
          }); 
  }
}
</script>

<style scoped>

</style>