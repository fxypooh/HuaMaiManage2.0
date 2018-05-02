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
    },
    isFloat:function(number){//匹配0-1之间的2位小数
        if (number.match(/(^0\.[1-9]{1,2}$)|(^1$)|(^0$)|(^1.0$)/)) {
            return true;
        }else {
            return false;
        }
    }
}
export default utils