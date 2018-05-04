<template>
	<div class="print">
		<h1 class="pageTitle">打印数据-页面空白处右键单击选择打印</h1>
    <ul class="dialog_print1">
      <li v-for="item in tableData" >
        <h4>{{item.dealersName}}</h4>
        <div>地址：<span>{{item.dealersAddress}}</span>    手机：<span>{{item.dealersPhone}}</span></div>
        <table>
          <tr>
            <th>部件名称</th>
            <th>前置复合滤芯</th>
            <th>反渗透RO膜滤芯</th>
          </tr>
          <tr>
            <td>数量</td>
            <td>0</td>
            <td>0</td>
          </tr>
        </table>
      </li>
    </ul>
	</div>
</template>

<script>
import { regionDataPlus, CodeToText} from 'element-china-area-data'
export default {
  name: 'DeivcePartsPrint',
  data () {
    return {
      partCount:0,
      partNames:[],
      tableData: []
    }
  },
  methods:{
  	
  },
  created:function(){
    var _this=this;
    this.$ajax.get("../../../static/data/devicePartsPrint.json").then(function(response){
        _this.tableData=response.data.table;
        _this.partCount=response.data.partCount;
        _this.partNames=response.data.partNames;
        console.log(response.data.table);
    }).catch(function(error){
            console.log(error);
          }); 
  }
}
</script>

<style scoped>
.print{padding: 20px;}
.dialog_print1 li {
    margin-bottom: 20px;
    text-align: left;
}
.dialog_print1 h4 {
    font-size: 16px;
    color: #000;
    margin:0;
    font-weight:normal;
}
.dialog_print1 div {
    margin: 5px 0;
    font-size: 14px;
}
.dialog_print1 div span {
    display: inline-block;
    padding-right: 20px;
}
.dialog_print1 table {
    width: 100%;
    padding: 0px;
    border-collapse: collapse;
    border-spacing: 0px 0px;
    text-align: center;
    font-size: 12px;
}
.dialog_print1 table th {
    background: #292f55;
    color: #fff;
    padding: 5px;
    border: 1px solid #333;
}
.dialog_print1 table td {
    background: #fff;
    color: #292f55;
    padding: 5px;
    border: 1px solid #333;
}
</style>