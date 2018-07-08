/* 
 * 注意：本文件内的所有方法以“api_”作为前缀
 */

/*
 * @Author: 徐横峰 
 * @Date: 2018-07-08 01:23:51 
 * @Last Modified by: Xuhengfeng
 * @Last Modified time: 2018-07-08 22:44:42
 */

//登入请求
function api_requestLogin(){
	var result;
	$.ajax({
         url: '',
         //data:{name:'test',pwd:'123'},
         dataType:'json',
         async:false,
         success: function(data){
           result = data.data;
         },
         error: function(XMLHttpRequest, textStatus, errorThrown){
            sin_ajaxError(XMLHttpRequest, textStatus, errorThrown);
         }
    	})
    return result;
}

