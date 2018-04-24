<template>
  <div class="hello">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <el-row>
      <el-button >默认按钮</el-button>
      <el-button type="primary" @click="routerToDefault">主要按钮</el-button>
      <el-button type="success" >成功按钮</el-button>
      <el-button type="info" >信息按钮</el-button>
      <el-button type="warning" >警告按钮</el-button>
      <el-button type="danger" >危险按钮</el-button>
    </el-row>
    <div>ajax数据：{{data.username}}</div>
    <div>vuex数据：{{this.$store.state.username}}</div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: '华迈管理系统V2.0',
      data:[]
    }
  },
  methods:{
    routerToDefault(){
      this.$router.push('/home');
    }
  },
  created:function(){
    var _this=this;
    this.$ajax.get("../../static/data/user.json").then(function(response){
      //console.log(response.data);
      _this.data=response.data;
    }).catch(function(error){
      console.log(error);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$nav-color: #F90;
.hello {
  text-align: center;
  margin-top: 60px;
}
h1, h2 {
  font-weight: normal;
  color:$nav-color;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
