/*
 * @Author: 徐横峰 
 * @Date: 2018-07-08 01:32:50 
 * @Last Modified by:   Xuhengfeng 
 * @Last Modified time: 2018-07-08 01:32:50 
 */

$(function(){
    //开启es5严格模式
    'use strict';
    
    //登录成功之后 append userInfo
    var infoHtml = '<div class="user-login-after">'
            +'<div class="headerImg">'
                +'<img src="imgs/avatar.png" alt="头像">'                   
                +'<span class="username">徐横峰</span>'
                +'<span>/</span>'
                +'<span class="user-register-btn user-logout">退出</span>'
            +'</div>'
        +'</div>'
        +'<div class="user-login-list">'
            +'<ul>'
                +'<li><a href="#">消息</a></li>'
                +'<li><a href="#">个人帐号</a></li>'
                +'<li><a href="#">预约看房</a></li>'
                +'<li><a href="#">我的收藏</a></li>'
                +'<li><a href="#">我的委托</a></li>'
            +'</ul>'
        +'</div>'
        
    // 监听用户登录|登出操作
    $('#user')
    .on('click', '.user-login-btn', function(){
        // 打开登录面板
        $('#loginContentBox').show();
        
        // 添加登录信息
        $('.user-login').append(infoHtml);
        $('.user-login .info').hide()
    })
    .on('click', '.user-logout',function(){
        $('.user-login .info').show();
        // 移除登录信息
        $('.user-login-after').remove();
        $('.user-login-list').remove();
    })
    // 监听用户昵称
    .on('mouseover', '.username', function(){
        $('.user-login-list').show();
    })
    .on('mouseout','.username', function(){
        $('.user-login-list').hide();        
    })
    // 监听用户登录之后的list
    .on('mouseover','.user-login-list', function(){
        $(this).show();
    })
    .on('mouseout','.user-login-list', function(){
        $(this).hide();
    })

    //登录|注册
    $('#loginContentBox .close').click(function(){
        $('#loginContentBox').hide();
    })
})