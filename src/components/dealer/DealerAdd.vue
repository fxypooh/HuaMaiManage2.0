<template>
	<div>
		<h1 class="pageTitle">经销商详情-{{statusMsg}}</h1>
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="经销商编码" prop="code">
            {{ruleForm.code}}
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="经销商姓名" prop="name">
            <el-input v-model.trim="ruleForm.name" placeholder="请输入姓名" maxlength="20"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="经销商电话" prop="phone">
            <el-input type="tel" v-model.trim="ruleForm.phone" placeholder="请输入手机号码" maxlength="11"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="联系地址" prop="city">
              <el-cascader
                size="large"
                :options="options"
                v-model="ruleForm.selectedOptions"
                @change="handleChange">
              </el-cascader>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="" prop="address">
            <el-input v-model.trim="ruleForm.address" placeholder="请输入详细地址" maxlength="100"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="代理等级" prop="level">
            {{ruleForm.level=="1"?"运营管理帐户":"高级管理账户"}}
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="初始密码" prop="level">
            {{ruleForm.pasword}}
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="支付宝账号" prop="zfb">
            <el-input v-model.trim="ruleForm.zfb" placeholder="请输入支付宝账号" maxlength="20"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="微信账号" prop="wx">
            <el-input v-model.trim="ruleForm.wx" placeholder="请输入微信账号" maxlength="20"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" size="medium" style="width:100%" @click="submitForm('ruleForm')">提交{{statusMsg}}</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <h3 class="right_title">
        <el-button type="primary" size="medium" @click="submitForm('')" plain>查询分账记录</el-button>
        <el-button type="primary" size="medium" @click="submitForm('')" plain>查询名下设备</el-button>
        <el-button type="primary" size="medium" @click="submitForm('')" plain>查询名下经销商</el-button>
        <el-button type="primary" size="medium" @click="submitForm('')" plain>查询名下推荐人</el-button>
      </h3>
     
    </el-form>
		

	</div>
</template>

<script>
import { regionDataPlus, CodeToText} from 'element-china-area-data'
import Utils from '../../utils.js' 
export default {
  name: 'DealerAdd',
  data () {
    var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空！'));
        }
        if(!Utils.phoneReg.test(value)){
          callback(new Error('手机号码格式不正确！'));
        }else{
          callback();
        }
    };

    return {
      statusMsg:"添加",
      id:"",
      options: regionDataPlus,
  		ruleForm: {
        code:'自动生成',
  			name:'',
  			phone:'',
        selectedOptions:[],
        city:'',
        address:'',
        level:1,
        pasword:'自动生成',
        zfb:'',
        wx:''
  		},
      rules: {
        name:[
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        phone:[
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        address:[
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        city:[
          { required: true, message: '请输选择省市区', trigger: 'blur' }
        ],
        zfb:[
          { required: true, message: '请输入支付宝账号', trigger: 'blur' }
        ],
        wx:[
          { required: true, message: '请输入微信账号', trigger: 'blur' }
        ]
      }
    };
  },
  methods:{
    submitForm(formName) {
      var _this=this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //分添加和修改两种情况
          if(this.id){
            //执行修改
            this.$ajax.get("../../static/data/user.json",this.ruleForm).then(function(response){
              _this.$message({type: 'success', message: '修改成功!'});
              //成功后清空表单清空数据
              _this.resetForm(formName);
            }).catch(function(error){
              console.log(error);
            }); 
          }else{
            //添加
            this.$ajax.get("../../static/data/user.json",this.ruleForm).then(function(response){
              _this.$message({type: 'success', message: '添加成功!'});
              //成功后清空表单清空数据
              _this.resetForm(formName);
            }).catch(function(error){
              console.log(error);
            }); 
          }
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs[formName].clearValidate();
      this.city="";
    },
    handleChange (value) {
      this.ruleForm.city="";
      for(let key in value){
        var code=value[key];
        var text=CodeToText[code]==="全部"?"":CodeToText[code];
        this.ruleForm.city+=text;
      }
      //console.log(this.ruleForm.city);
    },
    createdHandle(){
      var id = this.$route.params.id;
      if(id){
        this.statusMsg="编辑";
        this.id=id;
      }else{
        //清空页面数据
        this.statusMsg="添加";
        this.id="";
      } 
    }
  },
  watch: {
    '$route' (to, from) {
      this.createdHandle();
    }
  },
  created:function(){
    this.createdHandle();
  }
}
</script>

<style scoped>
  .notNull span{padding-left: 10px;color:red;}
  .right_title {color: #0b78e3;font-size: 18px;height: 40px;line-height: 40px;padding-top: 20px;border-bottom: 1px solid #ccc;margin-bottom: 20px;font-weight: normal;}
</style>