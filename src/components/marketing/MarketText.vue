<template>
	<div>
	    <h1 class="pageTitle">营销管理-页面文案</h1>
	    <el-form :inline="true" :model="formTel" :rules="rulesTel" ref="formTel" class="demo-form-inline">
		  <el-form-item label="客服电话" prop="tel">
		    <el-input v-model.trim="formTel.tel" placeholder="客服电话"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitFormTel('formTel')">保存</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
  name: 'MarketText',
  data () {
  	var checkTel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入电话号码！'));
      } else {
        callback();
      }
    };
    return {
        formTel: {
			tel: ''
        },
        rulesTel:{
			tel: [{ validator: checkTel, trigger: 'blur' }],
        }
    }
  },
  methods: {
	submitFormTel(formName) {
		let _this=this;
		this.$refs[formName].validate((valid) => {
			if(valid){
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

<style lang="scss">
  
</style>