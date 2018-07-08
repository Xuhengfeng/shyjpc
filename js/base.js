/* 常用公共js 
 * 注意：本文件内的所有方法以“sin_”作为前缀
 */

/*
 * @Author: 徐横峰 
 * @Date: 2018-07-08 01:33:08 
 * @Last Modified by: Xuhengfeng
 * @Last Modified time: 2018-07-08 22:47:14
 */

//服务请求地址
var localhostDev = true;
var BasicUrl= localhostDev ? 'http://112.74.181.229:7031/custAppApi' : 'https://custapi.shyj.cn/custAppApi/';

/*
 * 服务请求出错处理
 */
function sin_ajaxError(XMLHttpRequest, textStatus, errorThrown){
	if(errorThrown===undefined || errorThrown===null ||errorThrown==='')
		{
			alert('服务请求失败');
		}
	else	
		{
			alert('服务请求失败:'+errorThrown);
		}
}