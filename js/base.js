/* 常用公共js 
 * 注意：本文件内的所有方法以“sin_”作为前缀
 */

/*
 * @Author: 徐横峰 
 * @Date: 2018-07-08 01:33:08 
 * @Last Modified by: Xuhengfeng
 * @Last Modified time: 2018-07-08 22:47:14
 */

// 使用layer组件
// layui.use(['layer', 'form'], function(){
var layer = layui.layer,form = layui.form;
	// layer.msg('test');
// })

// 扩展jquery方法
$.fn.extend({
	animateCss: function (animationName) {
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		$(this).addClass('animated ' + animationName);
	}
});


// 监听窗体滚动高度
$(window).scroll(function(){
	let oTop = $(window).scrollTop()+$(window).height();
	let oHeight = $(document).height();
	console.log(oTop>oHeight-1000)
	if(oTop>oHeight-200){
	  $('.up').fadeIn();
	}else{
	  $('.up').fadeOut();
	}
})
// 回到顶部
$('.up').click(()=>{
	$('html,body').animate({scrollTop: 0},'slow');
})

/*
 * 服务请求出错处理
 */
function sin_ajaxError(XMLHttpRequest, textStatus, errorThrown){
	if(errorThrown===undefined || errorThrown===null ||errorThrown==='')
		{
			console.log('服务请求失败');
		}
	else	
		{
			console.log('服务请求失败:'+errorThrown);
		}
}