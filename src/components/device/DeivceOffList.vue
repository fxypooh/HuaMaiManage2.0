<template>
  <div>
    <h1 class="pageTitle">客户设备-列表 </h1>
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
          prop="modelbyte"
          label="型号"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          prop="modelname"
          label="型号名称"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="mac"
          label="Mac码"
          align="center"
          min-width="140">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="设备名称"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="城市"
          align="center"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="startdate"
          label="接入时间"
          align="center"
          min-width="110">
        </el-table-column>
        <el-table-column
          prop="servicedate"
          label="服务剩余时间"
          align="center"
          min-width="110">
        </el-table-column>
        <el-table-column
            prop="part"
            label="查看滤芯"
            align="center"
            min-width="110">
            <template slot-scope="scope">
              <el-popover placement="top" >
                  <el-table :data="scope.row.part" max-height="200">
                    <el-table-column width="180" property="name" label="滤芯名称" fixed></el-table-column>
                    <el-table-column width="80" property="day" label="剩余时间"></el-table-column>
                    <el-table-column width="80" property="allday" label="总寿命"></el-table-column>
                  </el-table>
                <el-button type="primary" plain slot="reference" size="mini">查看滤芯</el-button>
              </el-popover>
            </template>
        </el-table-column>
         <el-table-column
            prop="orders"
            label="查看订单"
            align="center"
            min-width="110">
            <template slot-scope="scope">
              <el-popover placement="top">
                  <el-table :data="scope.row.orders" max-height="200">
                    <el-table-column width="80" property="money" align="center" label="充值金额" fixed></el-table-column>
                    <el-table-column width="80" property="day" align="center" label="购买时长"></el-table-column>
                    <el-table-column width="100" property="date" align="center" label="下单订单"></el-table-column>
                    <el-table-column width="80" property="payWay" align="center" label="付款方式"></el-table-column>
                  </el-table>
                <el-button type="primary" plain slot="reference" size="mini">查看订单</el-button>
              </el-popover>
            </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            align="center"
            min-width="120">
            <template slot-scope="scope">
              <el-button size="mini" @click="delMsg(scope.$index, scope.row)" type="danger" plain>删除设备</el-button>
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
  name: 'DeivceOffList',
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
    goUpdate(index,item){
      console.log(index,item.deviceId);
      //this.$router.push('device-update/'+item.deviceId);
      this.$router.push({name: 'DeviceUpdate', params: {id: item.deviceId}});
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
    this.$ajax.get("../../../static/data/deviceOnList.json").then(function(response){
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