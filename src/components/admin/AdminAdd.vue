<template>
	<div>
		<h1 class="pageTitle">管理员详情-{{statusMsg}}</h1>
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model.trim="ruleForm.nickname" placeholder="请输入昵称" maxlength="20"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名" prop="name">
            <el-input v-model.trim="ruleForm.name" placeholder="请输入姓名" maxlength="20"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="登录手机号" prop="phone">
            <el-input type="tel" v-model.trim="ruleForm.phone" placeholder="请输入手机号码" maxlength="11"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="登录密码" prop="psw">
            <el-input v-model.trim="ruleForm.psw" placeholder="请输入密码" maxlength="20" type="password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="确认密码" prop="cpsw">
            <el-input v-model.trim="ruleForm.cpsw" placeholder="请输入确认密码" maxlength="20" type="password"></el-input>
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
     
    </el-form>
		

	</div>
</template>

<script>
import Utils from '../../utils.js' 
export default {
  name: 'AdminAdd',
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
  		ruleForm: {
        nickname:'',
  			name:'',
  			phone:'',
        psw:'',
        cpsw:''
  		},
      rules: {
        nickname:[
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        name:[
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        phone:[
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        psw:[
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        cpsw:[
          { required: true, message: '确认密码', trigger: 'blur' }
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