'use strict';
/*
 * @Author: 徐横峰 
 * @Date: 2018-07-08 01:32:30 
 * @Last Modified by: 564297479@qq.com
 * @Last Modified time: 2018-08-22 20:55:32
 */

//百度地图实例化
var cityName = '北海';
var omap = new BMap.Map("oMap");
var point = new BMap.Point(info.px, info.py);//城市的坐标
var marker = new BMap.Marker(point);//将点转化成标注点
omap.centerAndZoom(point, 12);//初始中心和倍数
omap.enableScrollWheelZoom(true);// 开启滚轮放大缩小
omap.addOverlay(marker);  //将标注点添加到地图上
var infoWindow = new BMap.InfoWindow(info.houseTitle, {// 创建信息窗口对象 
    width : 20,    // 信息窗口宽度    
    height: 5,     // 信息窗口高度    
    title: ''      // 信息窗口标题   
});     
omap.openInfoWindow(infoWindow, point); 

//百度地图检索实例化
function selectMap(num) {
	var local = new BMap.LocalSearch(omap, {
		renderOptions : {
			map : omap,
			autoViewport : true
		}
	});
	switch (num) {
	case 0:
		return local.searchNearby('交通', cityName);
	case 1:
		return local.searchNearby('购物', cityName);
	case 2:
		return local.searchNearby('学校', cityName);
	case 3:
		return local.searchNearby('餐饮', cityName);
	case 4:
		return local.searchNearby('医疗', cityName);
	case 5:
		return local.searchNearby('娱乐', cityName);
	}
}
$('.queryword').on('click', 'ul>li', function() {
	var num = $(this).index();
	selectMap(num);
})

//登录之后获取数据
function loginAfterRefresh() {
	try{var scity = JSON.parse(localStorage.selectCity).scity||'beihai'}catch(error){};
	if(sessionStorage.userInfo){
		var params = {
			scity: scity,
			sdid: info.sdid,
			houseType: 'HOUSE' 
		};
		var result =  api_loginCorrelation(params).data;
		//判断是否预约
		result.isAppoint? $('#appoint').text('已预约') : $('#appoint').text('预约看房');
		//判断是否收藏
		result.isCollect? $('#addCollection').text('已收藏') : $('#addCollection').text('收藏房源');	
		//判断是否加入
		result.isComparison ? $('#comparison>span').text('已加入') : $('#comparison>span').text('加入对比');
		//预约看房列表
		appendAppointHtml(result.houseList);	
		//对比列表
		appendContrastHtml(result.contrasList);
	}
}


// console.log('------------------------------------------------预约看房清单操作-----------------------------------------------------------')

//点击预约看房
$('#appoint').click(function(e){
	if($(this).text()=='已预约')return layer.msg('已存在约看房源列表');
	var src = $('.view .swiper-slide-active img').attr('src');
	var params = {scity: info.scity,sdid: info.sdid};
	//判断是否加入预约看房
	var result = api_appointMent(params);
	if(result.status == '1'){
		$(this).text('已预约');//加入预约成功		
		addProduct(e, '.end1', src);//飞入动画
		appendAppointHtml();//刷新预约看房列表
	}else{
		layer.msg(result.msg);
	}
})

//预约看房列表
function appendAppointHtml() {
	var params = {scity: info.scity,pageNo: 1,pageSize: 4};
	var result = api_appointHouseList(params);
	//数据长度存在
	if(result!=undefined&&result.length){
		//先清空列表再进行刷新
		$('#appointList>li:not(:last-child)').remove();
		//显示出按钮
		$('#appointBtn').show().siblings().hide();		
		//刷新列表
		result.forEach(function(item){
			$('#appointList>li:last-child').before(
				'<li data-scity="'+item.scity+'" data-id="'+item.id+'">'+
					'<div class="fl image">'+
						'<img src="'+item.housePic+'" alt="图片" />'+
					'</div>'+
					'<div class="r-content">'+
						'<div>'+item.houseTitle+'</div>'+
					'<div>'+
					'	<span>'+item.houseType+'</span><span>'+item.builtArea+'平</span>'+
					'</div>'+
					'<div>'+
						'<span>'+item.saleTotal+'</span>万'+
					'</div>'+
					'</div>'+
					'<div class="delete">删除</div>'+
				'</li>'
			)
		})
	}else{
		//隐藏按钮
		$('#appointBtn').hide().siblings().show();	
	}
}
//监听预约看房删除
$('#appointList').on('click', '.delete', function(){
	var params = {
		scity: info.scity,
		id: $(this).parent().data().id
	}
	var result = api_appointDeleteOne(params);
	//刷新状态
	loginAfterRefresh();
})
//监听预约全删
$('#clearAllAppointList').click(function() {
	var list = $('#appointList>li:last-child');
	list.each(function(index,item){
		//请求删除
		var params = {id: $(item).data().id, scity: $(item).data().scity};
		var result = api_appointDeleteOne(params);
	})
	//清空还原
	$('#appointList>li:not(:last-child)').remove();
	$('#appointBtn').hide().siblings().show();	
	//刷新状态
	loginAfterRefresh();
})
//立即预约
$('#appointBtn').click(function(){
	location.href="http://www.shyj.cn/#/mine/indexseeone";
})


// console.log('------------------------------------------------对比清单操作-----------------------------------------------------------')

//点击加入对比
$('#comparison').click(function(e){
	//判断是否预约
	if ($('#comparison>span').text()=='已加入') return layer.msg('已存在对比房源列表中');
	var src = $('.view .swiper-slide-active img').attr('src');
	var params = {scity: info.scity,houseId: info.id, houseSdid: info.sdid};
	var result = api_twohouseContrast(params);
	//判断是否加入对比
	if(result.status == '1'){
		$('#comparison>span').text('已加入');//加入对比成功
		addProduct(e, '.end2', src);//飞入动画
		appendContrastHtml();//刷新对比列表
	}else{
		layer.msg(result.msg);
	}
})


//生成对比列表结构
function appendContrastHtml(result) {	
	var params = {scity: info.scity, pageNo: 1, pageSize: 4};
	//如果为空再去另外一个接口查看
	var result = result!=null? result : api_twohouseList(params).data;
	if(result.length){
		//先清空
		$('#contrastList>li:not(:last-child)').remove();
		//显示出按钮
		$('#contrastBtn').show().siblings().hide();
		//刷新列表
		result.forEach(function(item,index){
			$('#contrastList>li:last-child').before(
				'<li data-scity="'+item.scity+'" data-sdid="'+item.sdid+'">'+
					'<div class="fl image">'+
						'<img src="'+item.housePic+'" alt="图片" />'+
					'</div>'+
					'<div class="r-content">'+
						'<div>'+item.houseTitle+'</div>'+
					'<div>'+
					'	<span>'+item.houseType+'</span><span>'+item.builtArea+'平</span>'+
					'</div>'+
					'<div>'+
						'<span>'+item.saleTotal+'</span>万'+
					'</div>'+
					'</div>'+
					'<div class="delete">删除</div>'+
				'</li>'
			)
		})
	}else{
		//隐藏按钮
		$('#contrastBtn').hide().siblings().show();
	}
}

//对比房源清空全部
$('#clearAllContrastList').click(function(){
	var list = $('#contrastList>li:not(:last-child)');
	list.each(function(index,item){
		//请求删除
		var params = {sdid: $(item).data().sdid, scity: $(item).data().scity};
		var result = api_twohouseListDel(params);
	})
	//清空还原
	$('#contrastList>li:not(:last-child)').remove();
	$('#contrastBtn').hide().siblings().show();
	//刷新状态
	loginAfterRefresh();
})

//对比房源单删
$('#contrastList').on('click', '.delete', function(){
	var data = $(this).parent().data();
	var list = $('#contrastList>li');
	var findIndex;
	list.each(function(index,item){
		if($(item).data().sdid==data.sdid){
			return findIndex = index;
		}
	})
	//请求删除
	var params = {sdid: data.sdid, scity: data.scity};
	var result = api_twohouseListDel(params);
	if(result.status==1){
		list[findIndex].remove();
	}
	if($('#contrastList>li').length==1){
		$('#contrastBtn').hide().siblings().show();
	}
	//重新刷新对比列表
	appendContrastHtml();
	//刷新状态
	loginAfterRefresh();
})

//立即对比
$('#contrastBtn').click(function(){
	location.href="http://www.shyj.cn/#/contrast";
})



// console.log('------------------------------------------------加入收藏操作-----------------------------------------------------------')

//收藏房源
$('#addCollection').click(function(e){
	if ($(this).text() == '已收藏') {
		//取消收藏
		var params = {scity: info.scity, sdid: info.sdid};
		var result = api_cancelCollection1(params);
		//取消收藏成功
		if(result.status == '1'){		
			$(this).text('收藏房源');	
			return layer.msg('取消收藏');
		}else{
			var msg = result.msg;
			return layer.msg(msg);
		}	
	} else {
		//加入收藏(二手房)
		var params = {scity: info.scity, sdid: info.sdid};
		var result = api_addCollection1(params);
		//收藏成功
		if(result.status == '1'){		
			$(this).text('已收藏');	
			return layer.msg('收藏成功');
		}else{
			var msg = result.msg||'收藏失败';
			return layer.msg(msg);
		}		
	} 
})

//监听分享移入移出
$('.share,.myShare').mouseover(function(){
	$('.myShare').show();
}).mouseout(function(){
	$('.myShare').hide();
})

//监听地图点击
$('.mapQuery').click(function(){
    location.href="http://www.shyj.cn/#/mapSearch?houseType=11";
})

//监听搜索框点击
$('.search>input[type="submit"]').click(function(){
	location.href="http://localhost:7031/custAppApi/house_c/twohouse?scity=beihai";
})

//带看记录 
$('#next,#prev').click(function(){
	if($(this).find('.xhf-icon-left').length){
		page--;
		if(page<=1){
			page=1;
		}
	}else{
		page++;
	}
	var params = {
		scity: 'beihai',
		pageNo: page,
		id: info.id
	}
	var result = api_twoHouseSeeHouseList(params);
	var $td1 = $('.houseDynamic .two tr:first-child');
	var $td2 = $('.houseDynamic .two tr:not(":first-child")');
	//先进行清空
	$td2.remove();
	result.data.forEach(function(item,index){
		$td1.after(		
			'<tr class="tr-desc">'+
			'<td>'+item.seeDate+'</td>'+
			'<td>'+item.emplName+'</td>'+
			'<td>'+item.phone+'</td>'+
			'</tr>' 
		)
	}); 
})

