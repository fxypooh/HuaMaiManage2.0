<template>
	<div>
		<h1 class="pageTitle">设备管理-设备型号添加</h1>
		<el-row :gutter="80">
		  <el-col :span="5">
		  	<div class="grid-content">
		  		<img src="http://app.hmjsq.net/resources/images/device/9f6620c8-8a35-4f69-bfbb-c60a520f056c.png" class="device_img">
		  		<el-upload
				  class="upload-demo"
				  ref="upload"
				  action="https://jsonplaceholder.typicode.com/posts/"
				  :multiple="false"
				  :auto-upload="false"
				  :on-success="handleAvatarSuccess"
		          :before-upload="beforeAvatarUpload"
				  :file-list="fileList">
				  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
				  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb，图片上传规格为宽100px 高70px.</div>
				</el-upload>
		  	</div>
		  </el-col>
		  <el-col :span="19">
		  <div class="grid-content">
		  	<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
		  		<el-form-item label="型号byte" prop="modelByte">
				    <el-input v-model="ruleForm.modelByte" placeholder="请输入型号byte" type="number" max="20"></el-input>
				</el-form-item>
				<el-form-item label="型号名称" prop="modelName">
				    <el-input v-model="ruleForm.modelName" placeholder="请输入型号名称" maxlength="20"></el-input>
				</el-form-item>
				<el-form-item label="分成比例" prop="splitRatio">
				    <el-input v-model="ruleForm.splitRatio" placeholder="请输入0-1之间的数" type="number" step="0.01" max="1.0" min="0"></el-input>
				</el-form-item>
				<el-form-item label="" prop="phone">
				  <el-input type="tel" v-model.trim="ruleForm.phone" placeholder="请输入手机号码" maxlength="11">
				    <template slot="prepend">帐&nbsp;&nbsp;&nbsp;号</template>
				  </el-input>
				</el-form-item>
				<el-form-item label="" prop="password">
				  <el-input type="password" v-model.trim="ruleForm.password" placeholder="请输入密码">
				    <template slot="prepend">密&nbsp;&nbsp;&nbsp;码</template>
				  </el-input>
				</el-form-item>
				<el-form-item label="" prop="code">
				  <el-input v-model.trim="ruleForm.code" placeholder="请输入手机验证码">
				    <template slot="prepend">验证码</template>  
				    <el-button slot="append" @click="getCode" :disabled="getCodeIsDisabled">{{getCodeMsg}}</el-button>
				  </el-input>
				</el-form-item>
				<el-form-item>
				  <el-button type="primary" size="medium" style="width:100%" @click="submitForm('ruleForm')">添&nbsp;&nbsp;&nbsp;&nbsp;加</el-button>
				</el-form-item>
			</el-form>
		  </div>
		  </el-col>
		</el-row>
		

	</div>
</template>

<script>
export default {
  name: 'DeivceAdd',
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
    var checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码！'));
      } else {
        callback();
      }
    };
    var checkCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码！'));
      } else {
        callback();
      }
    };

    return {
		getCodeIsDisabled:false,
		getCodeMsg:"获取验证码",
		getCodeTime:60,
		isErrorShow:false,
		errorMsg:'用户名或密码不正确',
		ruleForm: {
			modelByte:'',
			modelName:'',
			splitRatio:0.1,
			phone: '',
			password: '',
			code: '',
		},
      rules: {
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        password: [
          { validator: checkPass, trigger: 'blur' }
        ],
        code: [
          { validator: checkCode, trigger: 'blur' }
        ]
      },
      fileList:[]
    };
  },
  methods:{
  	handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
	beforeAvatarUpload(file) {
		const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
		const isLt2M = file.size / 1024 / 1024 < 2;

		if (!isJPG) {
		  this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
		}
		if (!isLt2M) {
		  this.$message.error('上传头像图片大小不能超过 2MB!');
		}
		return isJPG && isLt2M;
	},
    submitForm(formName) {
      var _this=this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //提交表单数据给后端
          //console.log(JSON.stringify(this.ruleForm));
          this.$ajax.get("../../static/data/user.json",this.ruleForm).then(function(response){
            //console.log(response.data.users[0]);
            if(_this.ruleForm.phone==='18888888888'){
              //_this.$store.commit('userLogin',response.data.users[0]);//存入vuex保存登录状态
              sessionStorage.setItem('user',JSON.stringify(response.data.users[0]));//存入sessionStorage保存登录状态
              _this.$router.push('/home');
            }else if(_this.ruleForm.phone==='17777777777'){
              sessionStorage.setItem('user',JSON.stringify(response.data.users[1]));
              _this.$router.push('/home');
            }else if(_this.ruleForm.phone==='16666666666'){
              sessionStorage.setItem('user',JSON.stringify(response.data.users[2]));
              _this.$router.push('/home');
            }else{
              _this.isErrorShow=true;
            }
          }).catch(function(error){
            console.log(error);
          }); 
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getCode(){
      let _this = this;  
      _this.getCodeIsDisabled = true;  
      //发送短信请求this.$ajax.get("")

      //倒计时60秒
      let interval = window.setInterval(function() {  
          _this.getCodeMsg =  _this.getCodeTime + '秒后重新发送';  
          --_this.getCodeTime;  
          if(_this.getCodeTime < 0) {  
              _this.getCodeMsg = "重新发送";  
              _this.getCodeTime = 60;  
              _this.getCodeIsDisabled = false;  
              window.clearInterval(interval);  
          }  
      }, 1000);
    }

  },
  created:function(){
    //以下需要写到点击事件中
    
  }
}
</script>

<style scoped>
	.grid-content {background: #d3dce6;border-radius: 4px;min-height: 36px;}
	.grid-content .device_img {width:100%;}
  

</style>