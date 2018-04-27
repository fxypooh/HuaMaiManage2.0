var utils = {
    phoneReg: /^[1][2-9][0-9]{9}$/,
    trimAll: function(str){
        return str.replace(/(\s|\u00A0)+/,'');
    },
    trimLR: function(str){
    	//v-model.trim可以自动过滤首尾空白字符
        return str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');
    },
    trimL:function(str){
    	return str.replace(/^(\s|\u00A0)+/,'');
    },
    trimR:function(str){
    	return str.replace(/(\s|\u00A0)+$/,'');
    },
    trimN:function(str){
    	return str.replace(/[\r\n]/g,"");
    }
}
export default utils