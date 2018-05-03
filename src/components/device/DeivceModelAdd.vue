<template>
	<div>
		<h1 class="pageTitle">设备型号-{{statusMsg}}</h1>
		<el-row :gutter="100">
		  <el-col :span="5">
		  	<div class="grid-content">
		  		<img :src="src" class="device_img">
		  		<el-upload
				  class="upload-img"
				  ref="upload"
				  action="https://jsonplaceholder.typicode.com/posts/"
				  :multiple="false"
				  :on-success="handleAvatarSuccess"
		      :before-upload="beforeAvatarUpload"
				  :file-list="fileList">
  				  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  				  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb，图片上传规格为宽100px 高70px.</div>
				  </el-upload>
		  	</div>
		  </el-col>
		  <el-col :span="18">
		  <div class="grid-content">
		  	<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-row :gutter="10">
            <el-col :span="8">
    		  		<el-form-item label="型号byte" prop="modelByte">
      				    <el-input v-model.trim="ruleForm.modelByte" placeholder="请输入型号byte" type="number" max="20" min="0"></el-input>
      				</el-form-item>
            </el-col>
            <el-col :span="8">
      				<el-form-item label="型号名称" prop="modelName">
      				    <el-input v-model.trim="ruleForm.modelName" placeholder="请输入型号名称" maxlength="20"></el-input>
      				</el-form-item>
            </el-col>
            <el-col :span="8">
      				<el-form-item label="分成比例" prop="splitRatio">
      				    <el-input v-model.trim="ruleForm.splitRatio" placeholder="请输入0-1之间的数" type="number" step="0.01" max="1.0" min="0"></el-input>
      				</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="滤芯个数" prop="partCount">
                  <el-input v-model.trim="ruleForm.partCount" placeholder="请输入滤芯个数" type="number" step="1" max="6" min="0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="首充价格" prop="firstPrice">
                  <el-input v-model.trim="ruleForm.firstPrice" placeholder="请输入首充价格" type="number" step="1" min="0"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <h3 class="right_title">滤芯名称设置</h3>
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="滤芯1名称" prop="device_part1Name">
                  <el-input v-model.trim="ruleForm.device_part1Name" placeholder="请输入滤芯1名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="滤芯1寿命" prop="device_part1All">
                  <el-input v-model.trim="ruleForm.device_part1All" placeholder="请输入滤芯1寿命天数" type="number" step="1" min="0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="滤芯2名称" prop="device_part2Name">
                  <el-input v-model.trim="ruleForm.device_part2Name" placeholder="请输入滤芯2名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="滤芯2寿命" prop="device_part2All">
                  <el-input v-model.trim="ruleForm.device_part2All" placeholder="请输入滤芯2寿命天数" type="number" step="1" min="0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="滤芯3名称" prop="device_part3Name">
                  <el-input v-model.trim="ruleForm.device_part3Name" placeholder="请输入滤芯3名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="滤芯3寿命" prop="device_part3All">
                  <el-input v-model.trim="ruleForm.device_part3All" placeholder="请输入滤芯3寿命天数" type="number" step="1" min="0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="滤芯4名称" prop="device_part4Name">
                  <el-input v-model.trim="ruleForm.device_part4Name" placeholder="请输入滤芯4名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="滤芯4寿命" prop="device_part4All">
                  <el-input v-model.trim="ruleForm.device_part4All" placeholder="请输入滤芯4寿命天数" type="number" step="1" min="0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="滤芯5名称" prop="device_part5Name">
                  <el-input v-model.trim="ruleForm.device_part5Name" placeholder="请输入滤芯5名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="滤芯5寿命" prop="device_part5All">
                  <el-input v-model.trim="ruleForm.device_part5All" placeholder="请输入滤芯5寿命天数" type="number" step="1" min="0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="滤芯6名称" prop="device_part6Name">
                  <el-input v-model.trim="ruleForm.device_part6Name" placeholder="请输入滤芯6名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="滤芯6寿命" prop="device_part6All">
                  <el-input v-model.trim="ruleForm.device_part6All" placeholder="请输入滤芯6寿命天数" type="number" step="1" min="0"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <h3 class="right_title">服务费用设置</h3>
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="一个月" prop="month1">
                  <el-input v-model.trim="ruleForm.month1" placeholder="请输入一个月价格" type="number" step="1" min="0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="三个月" prop="month2">
                  <el-input v-model.trim="ruleForm.month2" placeholder="请输入三个月价格" type="number" step="1" min="0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="六个月" prop="month3">
                  <el-input v-model.trim="ruleForm.month3" placeholder="请输入六个月价格" type="number" step="1" min="0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="一年" prop="years1">
                  <el-input v-model.trim="ruleForm.years1" placeholder="请输入一年价格" type="number" step="1" min="0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="二年" prop="years2">
                  <el-input v-model.trim="ruleForm.years2" placeholder="请输入二年价格" type="number" step="1" min="0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="三年" prop="years3">
                  <el-input v-model.trim="ruleForm.years3" placeholder="请输入三年价格" type="number" step="1" min="0"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" size="medium" style="width:100%" @click="submitForm('ruleForm')">提交{{statusMsg}}</el-button>
          </el-form-item>
  			</el-form>
		  </div>
		  </el-col>
		</el-row>
		

	</div>
</template>

<script>
import Utils from '../../utils.js' 
export default {
  name: 'DeivceModelAdd',
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
    var checkModelByte = (rule, value, callback) => {//对小于20的整数进行验证
      if (parseInt(value)>20) {
        callback(new Error('请输入小于20的整数！'));
      } else {
        callback();
      }
    };
    var checkSplitRatio = (rule, value, callback) => {//对小于1的两位小数进行验证
      if (!Utils.isFloat(value.toString())) {
        callback(new Error('请输入小于1的两位小数！'));
      } else {
        callback();
      }
    };
    var checkPartCount = (rule, value, callback) => {//对小于6的数进行验证
      if (parseInt(value)>6) {
        callback(new Error('请输入小于6的整数！'));
      } else {
        callback();
      }
    };

    return {
      statusMsg:"添加",
  		src:"",
      id:"",
  		param:new FormData(),
      flieName:'',
  		ruleForm: {
  			modelByte:'',
  			modelName:'',
  			splitRatio:0.2,
        partCount:'',
        firstPrice:'',
        device_part1Name:'',
        device_part1All:'',
        device_part2Name:'',
        device_part2All:'',
        device_part3Name:'',
        device_part3All:'',
        device_part4Name:'',
        device_part4All:'',
        device_part5Name:'',
        device_part5All:'',
        device_part6Name:'',
        device_part6All:'',
        month1:'',
        month2:'',
        month3:'',
        years1:'',
        years2:'',
        years3:''
  		},
      rules: {
        modelByte:[
          { required: true, message: '请输入型号byte', trigger: 'blur' },
          { validator: checkModelByte, trigger: 'blur' }
        ],
        modelName:[
          { required: true, message: '请输入型号名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        splitRatio:[
          { required: true, message: '请输入总部分成', trigger: 'blur' },
          { validator: checkSplitRatio, trigger: 'blur' }
        ],
        partCount:[
          { required: true, message: '请输入滤芯个数', trigger: 'blur' },
          { validator: checkPartCount, trigger: 'blur' }
        ],
        firstPrice:[
          { required: true, message: '请输入首充价格', trigger: 'blur' }
        ],
        device_part1Name:[
          { min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
        ],
        device_part2Name:[
          { min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
        ],
        device_part3Name:[
          { min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
        ],
        device_part4Name:[
          { min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
        ],
        device_part5Name:[
          { min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
        ],
        device_part6Name:[
          { min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
        ],
        month1:[
          { required: true, message: '请输入一个月价格', trigger: 'blur' }
        ],
        month2:[
          { required: true, message: '请输入二个月价格', trigger: 'blur' }
        ],
        month3:[
          { required: true, message: '请输入三个月价格', trigger: 'blur' }
        ],
        years1:[
          { required: true, message: '请输入一年价格', trigger: 'blur' }
        ],
        years2:[
          { required: true, message: '请输入二年价格', trigger: 'blur' }
        ],
        years3:[
          { required: true, message: '请输入三年价格', trigger: 'blur' }
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
        return false;
    	}
    	if (!isLt2M) {
    	  this.$message.error('上传头像图片大小不能超过 2MB!');
        return false
    	}
    	
      //创建临时的路径来展示图片
      var windowURL = window.URL || window.webkitURL;
      this.src=windowURL.createObjectURL(file);
      this.flieName=file.name;
      //this.param.append('file', file, file.name);//追加值
      this.param.set('file', file);//设置新值
      console.log(this.param.get('file'));
      return false;
    },
    submitForm(formName) {
      var _this=this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //整合图片和表单数据给后端
          for(let key in this.ruleForm){
            this.param.set(key, this.ruleForm[key]);
            console.log(this.param.get(key));
          }
          let config = { headers: {'Content-Type': 'multipart/form-data'} };
          console.log(this.param.get('file'));
          //分添加和修改两种情况
          if(this.id){
            //执行修改，可以不提交图片
            this.$ajax.get("../../static/data/user.json",this.param,config).then(function(response){
              _this.$message({type: 'success', message: '修改成功!'});
              //成功后清空表单清空图片等数据
              _this.resetForm(formName);
            }).catch(function(error){
              console.log(error);
            }); 
          }else{
            //添加一定要提交图片
            if(this.flieName){
              this.$ajax.get("../../static/data/user.json",this.param,config).then(function(response){
                _this.$message({type: 'success', message: '添加成功!'});
                //成功后清空表单清空图片等数据
                _this.resetForm(formName);
              }).catch(function(error){
                console.log(error);
              }); 
            }else{
              this.$message({type: 'error',message: '请上传图片!'});
              return false;
            }
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
      this.flieName="";
    }
  },
  created:function(){
    var id = this.$route.params.id;
    if(id){
      this.src="http://app.hmjsq.net/resources/images/device/9f6620c8-8a35-4f69-bfbb-c60a520f056c.png";
      this.statusMsg="编辑";
      this.id=id;
    }else{
      this.src="https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100";
    }
    
  }
}
</script>

<style scoped>
	.grid-content {background: #fff;border-radius: 4px;min-height: 36px;}
  .grid-content .device_img {width:100%;}
  .grid-content .upload-img>div{display: block;}
  .grid-content .notNull span{padding-left: 10px;color:red;}
  .grid-content .right_title {color: #0b78e3;font-size: 18px;height: 40px;line-height: 40px;padding-top: 20px;border-bottom: 1px solid #ccc;margin-bottom: 20px;font-weight: normal;}
</style>