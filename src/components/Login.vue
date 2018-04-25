<template>
  <div class="hello">
    <img src="../assets/images/logo.png" class="logo">
    <h2>{{ msg }}</h2>
    <div class="loginWarp">
      <el-alert :title="errorMsg" type="error" show-icon v-if="isErrorShow"></el-alert>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item label="" prop="phone">
          <el-input type="tel" v-model="ruleForm.phone" placeholder="请输入手机号码" maxlength="11">
            <template slot="prepend">帐&nbsp;&nbsp;&nbsp;号</template>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码">
            <template slot="prepend">密&nbsp;&nbsp;&nbsp;码</template>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="code">
          <el-input v-model.number="ruleForm.code" placeholder="请输入手机验证码">
            <template slot="prepend">验证码</template>  
            <el-button slot="append" @click="getCode" :disabled="getCodeIsDisabled">{{getCodeMsg}}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" style="width:100%" @click="submitForm('ruleForm')">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div>vuex数据：{{this.$store.state.user.username}}</div> -->
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空！'));
        }
        var phoneReg=/^[1][2-9][0-9]{9}$/;
        if(!phoneReg.test(value)){
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
      msg: '华迈管理系统V2.0',
      getCodeIsDisabled:false,
      getCodeMsg:"获取验证码",
      getCodeTime:60,
      isErrorShow:false,
      errorMsg:'用户名或密码不正确',
      ruleForm: {
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
      }
    };
  },
  methods:{
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  text-align: center;padding-top:120px;
  .logo{width:100px;}
  h1, h2 {font-weight: normal;color:$main-color;}
  .loginWarp{
    width:360px;display:inline-block;
    >div{margin-bottom:20px;}
  }
}

</style>
