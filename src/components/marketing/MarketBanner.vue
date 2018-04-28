
<template>
	<div class="marketBanner">
	    <h1 class="pageTitle">营销管理-Banner管理</h1>
	    <el-upload
		  class="upload-demo"
		  drag
		  action="https://jsonplaceholder.typicode.com/posts/"
		  multiple
		  :on-success="handleAvatarSuccess"
		  :before-upload="beforeAvatarUpload">
		  <i class="el-icon-upload"></i>
		  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件,且不超过2M,Banner图规格为宽720px 高376px</div>
		</el-upload>

		<el-row :gutter="50">
		  <el-col :span="8" v-for="(key, item) in bannerList" :key="key">
		    <el-card :body-style="{ padding: '0px' }">
		      <img src="http://app.hmjsq.net/resources/images/banner/05d293d1-a655-4f0d-8af9-420fe5a8cebf.jpg" class="image">
		      <div class="bottom">
		        <time class="time">{{ currentDate }}</time>
		        <el-button type="text" class="button" @click="delBanner(key)">删除</el-button>
		      </div>
		    </el-card>
		  </el-col>
		</el-row>

	</div>
</template>

<script>
export default {
	name: 'MarketBanner',
		data () {
		return {
		  currentDate: new Date(),
		  bannerList:[1,2,3]
		}
	},
	created:function(){
		//ajax取得banner数组
	},
   methods: {
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
      delBanner(key){
      	this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	//确定删除banner
          console.log(key);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      	
      }
    }
}
</script>

<style lang="scss" >
	.marketBanner{
		.upload-demo{margin-bottom: 50px;}
		.el-upload{display: block;}
		.el-upload-dragger{width:100%;}

		.time {font-size: 13px;color: #999;}
		.bottom {padding: 14px; margin-top: 13px;line-height: 12px;}
		.button {padding: 0;float: right;}
		.image {width: 100%;display: block;}
	}
</style>