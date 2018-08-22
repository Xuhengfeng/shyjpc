'use strict';
var userInfo;            //登录用户会员信息
var userbrokerList;      //登录用户的会话列表
var chatMe;              //登录的用户唯一标识
var chatUsername;        //经纪人唯一标识
var showChatlist = true; //用来切换聊天窗口
var showChatBox = false; //用来记住聊天区域是否被打开
var currentChatObj = {}; //当前聊天的对象
var photo;               //经纪人头像
try{                     //如果用户已经登录
	//刷新当前的会话列表
	brokerAllList();
}catch(error){};

// 监听聊天窗口关闭
$('.closeChat').click(function(){
	chatBox_close();
	showChatBox = false;
})

// 监听聊天窗口打开
$('.chatList')
.on('click', '.title', function() {
	//判断是否登录
	if(sessionStorage.userInfo){
		//切换聊天窗口关开
		if(showChatlist){
			chatBox_open();
			showChatlist = false;
			//判断聊天区域是否显示
			if(showChatBox==false){
				$('.chatBox').hide();
			}
		}else{
			chatBox_close();
			showChatlist = true;
		}			
	}else{
		loginBox_open();
	}
})
.on('click', 'li', function() {
	var id = $(this).data().id, ret;	
		ret =  userbrokerList.find(function(item){
			return item.chatUsername === id;
		})		
	//刷新当前的聊天经纪人
	currentChatObj = Object.assign({}, ret);
	$('#currentBroker').text(currentChatObj.emplName);
	chatBox_open();	
	showChatBox = true;
	//刷新当前的聊天的内容
	$('#chatContent>li').remove();
	refreshChat(ret);
	//回到底部
	$('.scroll').get(0).scrollIntoView(false);
})


// 联系经纪人
$('.linkBroker').click(function(e){
	var emplName = $(this).attr('emplName');
	var phone = $(this).attr('phone');
	chatUsername = $(this).attr('chatusername');
	photo = $(this).attr('photo')||'/custAppApi/imgs/avatar.png';	
	//判断是否登录
	if (sessionStorage.userInfo) {
		userInfo = JSON.parse(sessionStorage.userInfo);
		chatMe =  userInfo.easemobUsername;
		//打开聊天窗口
		chatBox_open();
		//构建经纪人对象
		var currentObj = {
			emplName: emplName,
			chatUsername: chatUsername,
			phone: phone,
			photo: photo,
			history: [],//历史聊天记录
			ext: {},
			weichat: {originType: "webim"}
		}
		//拷贝当前的聊天对象
		currentChatObj =  Object.assign({}, currentObj);
		//判断缓存中是否存在
		if(localStorage.getItem(chatMe)){
			var list = JSON.parse(localStorage.getItem(chatMe));
			var ret =  list.find(function(item){
				return item.chatUsername === chatUsername;
			})	
			//缓存中不存在 则添加进去
			if(ret==null||ret==undefined){			
				list.push(currentObj);
				//刷新当前的会话列表
				brokerList(currentObj);
				localStorage.setItem(chatMe, JSON.stringify(list));
			}else{
				//刷新当前的聊天内容
				refreshChat(ret)
			}
			//刷新当前的聊天经纪人
			$('#currentBroker').text(currentObj.emplName);
		}else{
			var list = [];
			list.push(currentObj);
			list.forEach(function(item){brokerList(item)});
			//刷新会话列表
			brokerAllList();
			localStorage.setItem(chatMe, JSON.stringify(list));
		}
		//回到底部
		setTimeout(function(){$('.scroll').get(0).scrollIntoView(false)},200);
	} else {
		// 未登录则打开登录
		loginBox_open();
	}
})

//刷新整个会话列表
function brokerAllList() {
	userInfo = JSON.parse(sessionStorage.userInfo);
	chatMe =  userInfo.easemobUsername;
	userbrokerList = JSON.parse(localStorage.getItem(chatMe));
	try{
		userbrokerList.forEach(function(item){
			brokerList(item);
		})		
	}catch(error){}
	$('.noBrokers').hide();
}

//添加经纪人到会话列表的UI上
function brokerList(item) {
	if(item){		
		var lastChat,lastMsg,dataTime,changeHtml;
		try{
			lastChat = item.history.length?item.history[item.history.length-1]:null;//该对象的最后一条聊天map
			lastMsg = lastChat!=null?lastChat.body.msg:null;//创建最后一条聊天记录
			dataTime = lastChat!=null?newDate(lastChat.dataTime):'';//创建聊天时间
			changeHtml = lastMsg==null?(''):('<p>'+lastMsg+'</p>');//判断是否存在最后一条消息
		}catch(error){};
		var img = item.photo?item.photo:'/custAppApi/imgs/avatar.png';//创建经纪人的头像
		$('#chatBorkerList').append(						
			'<li data-id="'+ item.chatUsername +'"><div class="time">'+dataTime+'</div>'+
				'<div class="broker">'+
					'<div class="fl img"><img src="'+img+'"/></div>'+
					'<div class="fl orow">'+
						'<h4>'+item.emplName+'</h4>' + changeHtml +
					'</div>'+
				'</div>'+
			'</li>'
		)
		$('.noBrokers').hide();
	}
}

//添加聊天内容到显示聊天内容的UI上
function appendChat(obj) {
	if(obj){	
		var lastChat = obj.history[obj.history.length-1];//该对象的最后一条聊天对象
		var lastMsg = lastChat.body.msg||'';//创建聊天数据
		var dataTime = newDate(lastChat.dataTime);//创建聊天时间
		var img;//头像 
		var className;//切换类 
		var changeHtml;//文本或者图片结构
		//判断是否是主动发送
		if(obj.to != userInfo.easemobUsername){
			className = 'chat-block-right';
			img = JSON.parse(sessionStorage.userInfo).headImage||'/custAppApi/imgs/avatar.png';//创建自己的头像
		}else{
			className = 'chat-block-left';
			img = obj.photo;//创建经纪人头像
		}
		try{
			changeHtml = lastChat.type=='img'?('<img src="'+lastChat.body.url+'"/>'):('<div>'+lastMsg+'</div></div>');	
		}catch(e){}
		$('#chatContent .scroll').before(						
			'<li>'+
			'<div class="'+className+'">'+
			'<div class="chat-time">'+dataTime+'</div>'+
			'<div class="chat-block">'+
			'<a href="#me"><img src="'+img+'"/></a>'+
			'<div class="chat-content">'+changeHtml+'</div>'+
			'</div>'+
			'</li>'
		);
	}
}

//切换经纪人聊天
function refreshChat(ret) {
	if(ret){
		//判断聊天记录
		ret.history.forEach(function(val){
			var className;//切换类 
			var img;//头像 
			var changeHtml;//文本或者图片结构
			var dataTime = newDate(val.dataTime);//创建聊天时间
			var msg = val.body.msg||'';//创建聊天数据
			if(val.to != userInfo.easemobUsername){
				className = 'chat-block-right';
				img = JSON.parse(sessionStorage.userInfo).headImage||'/custAppApi/imgs/avatar.png';//创建自己的头像
			}else{
				className = 'chat-block-left';
				img = ret.photo;//创建经纪人头像
			}
			try{
				changeHtml = val.type=='img'?('<img src="'+val.body.url+'"/>'):('<div>'+msg+'</div></div>');	
			}catch(e){}
			$('#chatContent .scroll').before(						
				'<li>'+
				'<div class="'+className+'">'+
				'<div class="chat-time">'+dataTime+'</div>'+
				'<div class="chat-block">'+
				'<a href="#me"><img src="'+img+'"/></a>'+
				'<div class="chat-content">'+changeHtml+'</div>'+
				'</div>'+
				'</li>'
			);
		})
	}
}


//聊天
function weiChat() {	
	//刷新整个会话列表
	brokerAllList();
	// 配置环信
	var options = {
		xmppURL : WebIM.config.xmppURL,
		apiUrl : WebIM.config.apiURL,
		appKey : '1163180517099289#dichan-app-test',
		user : userInfo.easemobUsername,
		pwd : userInfo.easemobPassword
	};
	window.conn = new WebIM.connection({
		isMultiLoginSessions : WebIM.config.isMultiLoginSessions,
		https : typeof WebIM.config.https === 'boolean' ? WebIM.config.https
				: location.protocol === 'https:',
		url : WebIM.config.xmppURL,
		heartBeatWait : WebIM.config.heartBeatWait,
		autoReconnectNumMax : WebIM.config.autoReconnectNumMax,
		autoReconnectInterval : WebIM.config.autoReconnectInterval,
		apiUrl : WebIM.config.apiURL,
		isAutoLogin : true
	});
	//打开连接
	conn.open(options);		
	// 事件监听
	conn.listen({
		onOpened : function(message) { // 连接成功回调，连接成功后才可以发送消息
			console.log("%c [opened] 连接已成功建立", "color: green")
		},
		onTextMessage : function(message) {// 收到文本消息
			//判断哪个经纪人发来的消息
			var list = JSON.parse(localStorage.getItem(chatMe));
			var ret =  list.find(function(item){
				return item.chatUsername === message.chatMe;
			})	
			$('#chatBorkerList>li').each(function(index,item){
				if($(item).data('id')==ret.chatUsername){
					$(item).addClass('unread');
				}
			})
			
			var msg = {
				body: {
					body: {type: 'txt', msg: message.data},
					type: 'txt',
					to: message.to
				}	
			}
			
			//当前时间搓
			var currentTime = new Date().getTime();
			//刷新聊天内容到显示聊天内容的UI上
			refreshContent(msg, currentTime);
			//回到底部
			$('.scroll').get(0).scrollIntoView(false);

			//判断有未读消息且聊天窗口未打开
			var timer = setInterval(function(){
				$('#pulse').css({background: '#fff'});
				setTimeout(function(){
					$('#pulse').css({background: "url('/custAppApi/imgs/shihua.png') no-repeat 12px 12px"});						
					showChatlist&&clearInterval(timer);
				},100);
			}, 800)
			
			
		}, 
		onPictureMessage : function(message) { //收到图片消息
			var options = {url : message.url};
			options.onFileDownloadComplete = function() {
				// 图片下载成功
				console.log('Image download complete!');
			};
			options.onFileDownloadError = function() {
				// 图片下载失败
				console.log('Image download failed!');
			};
			WebIM.utils.download.call(conn, options); // 意义待查		
			
			var msg = {
				body: {
					body: {
						type: 'img', 
						msg: message.data,
						url: message.url
					},
					type: 'img',
					to: message.to
				}	
			}
		
			//当前时间搓
			var currentTime = new Date().getTime();
			//刷新聊天内容到显示聊天内容的UI上
			refreshContent(msg, currentTime);
			//回到底部
			$('.scroll').get(0).scrollIntoView(false)

		},
		onError : function(message) {// 本机网络掉线
			if (message && message.type == 1) {
				console.warn('连接建立失败！请确认您的登录账号是否和appKey匹配。')
			}
		}
	});
}

//刷新实时聊天内容到显示聊天内容的UI上
function refreshContent(msg, currentTime) {
	msg.body.dataTime = currentTime;
	currentChatObj.history.push(msg.body);
	//刷新实时聊天内容
	appendChat(currentChatObj);
	//重新缓存
	var list = JSON.parse(localStorage.getItem(chatMe));
	var query =  list.findIndex(function(item){
		return item.chatUsername === currentChatObj.chatUsername;
	});
	list[query]=currentChatObj;
	localStorage.setItem(chatMe, JSON.stringify(list));

}


// 私聊发送文本消息
function sendPrivateText(msgData) {
	console.log(currentChatObj)
	
	var id = conn.getUniqueId();
	var msg = new WebIM.message('txt', id);
	var currentTime = new Date().getTime();//当前时间搓
	msg.set({
		msg : msgData,
		to: chatUsername,
		roomType : false,
		newTime: currentTime,
		ext: {
			nickName: currentChatObj.emplName,
			headImg: currentChatObj.photo
		},
		success : function(id, serverMsgId) {
			//刷新聊天内容到显示聊天内容的UI上
			refreshContent(msg, currentTime);
			//回到底部
			$('.scroll').get(0).scrollIntoView(false);
		}
	});
	msg.body.chatType = 'singleChat';
	window.conn.send(msg.body);
};	
// 私聊发送图片消息
function sendPrivateImg() {
    var id = window.conn.getUniqueId();
    var msg = new WebIM.message('img', id);
    var input = document.getElementById('sendImg');               // 选择图片的input
    var file = WebIM.utils.getFileUrl(input);// 将图片转化为二进制文件
    var currentTime = new Date().getTime();//当前时间搓
    var allowType = {
        'jpg': true,
        'gif': true,
        'png': true,
        'bmp': true
    };
    var option = {
        apiUrl: WebIM.config.apiURL,
        file: file,
		to: chatUsername,
        roomType: false,
        chatType: 'img',
        ext: {
			nickName: currentChatObj.emplName,
			headImg: currentChatObj.photo
		},
        onFileUploadError: function () {
            console.log('onFileUploadError');
        },
        onFileUploadComplete: function () {
        	//刷新聊天内容到显示聊天内容的UI上
			refreshContent(msg, currentTime);
		},
		success: function(){
			//回到底部
			setTimeout(function(){$('.scroll').get(0).scrollIntoView(false)},300);
		}
    };
    // forie8
    try {
        if (!file.filetype.toLowerCase() in allowType) {
            console.log('file type error')
            return
        }
    } catch (e) {
        option.flashUpload = WebIM.flashUpload
    }
    msg.set(option);
    window.conn.send(msg.body);
};
// 发送图片
$('#sendImg').change(function(){
	sendPrivateImg();
})
// 发送消息
$('.sendBtn').click(function() {
	var $sendText = $('textarea').val();
	sendPrivateText($sendText);
	$('textarea').val('');
})
// 按下回车
$("textarea").keydown(function(e){
	var ev = window.event ? window.event : e;
    if(ev.keyCode==13) {
    	var $sendText = $('textarea').val();
    	sendPrivateText($sendText);
        $(this).val('').focus(); 
     }
})


