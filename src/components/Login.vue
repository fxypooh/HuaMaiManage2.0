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
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: '华迈管理系统V2.0'
    }
  },
  methods:{
    routerToDefault(){
      this.$router.push('/home');
    }
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
