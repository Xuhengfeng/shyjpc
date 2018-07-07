/*
 * @Author: 徐横峰 
 * @Date: 2018-07-08 01:33:08 
 * @Last Modified by:   Xuhengfeng 
 * @Last Modified time: 2018-07-08 01:33:08 
 */
//服务请求地址
var localhostDev = true;
var BasicUrl= localhostDev ? 'http://112.74.181.229:7031/custAppApi' : 'https://custapi.shyj.cn/custAppApi/';

/*
 * 服务请求出错处理
 */
function sin_ajaxError(XMLHttpRequest, textStatus, errorThrown){
	console.log(errorThrown);
	if(errorThrown===undefined || errorThrown===null ||errorThrown==='')
		{
			errorThrown=sin_getLangage('com.requestfailed','服务请求失败');+'.';
		}
	else	
		{
			errorThrown=sin_getLangage('com.requestfailed','服务请求失败')+': </br>'+errorThrown;
		}
	sin_notice(vm,'error',sin_getLangage('com.error.message','错误信息'),errorThrown);
}