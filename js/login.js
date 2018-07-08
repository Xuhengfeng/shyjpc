/*
 * @Author: 徐横峰 
 * @Date: 2018-07-08 01:32:50 
 * @Last Modified by: Xuhengfeng
 * @Last Modified time: 2018-07-08 21:52:01
 */

$(function(){
    //开启es5严格模式
    'use strict';
    
    //登入成功之后 append userInfo
    var infoHtml = '<div id="userLoginAfter">'
            +'<div class="headerImg">'
                +'<img src="">'                   
                +'<span class="username">徐横峰</span>'
                +'<span style="margin:0 5px">|</span>'
                +'<span class="user-register-btn user-logout">退出</span>'
            +'</div>'
            +'<ul class="userList">'
                +'<li><a href="#">消息</a></li>'
                +'<li><a href="#">个人帐号</a></li>'
                +'<li><a href="#">预约看房</a></li>'
                +'<li><a href="#">我的收藏</a></li>'
                +'<li><a href="#">我的委托</a></li>'
            +'</ul>'
        +'</div>'
        
    // 监听用户登入|登出操作
    $('#user')
    .on('click', '.user-login-btn', function(){
        // 默认状态
        $('.user-login .info').hide();
        
        // 打开登入面板
        $('#loginContentBox').show();
        
        // 登入请求
        // 成功添加登入信息
        $('.user-login').append(infoHtml);
    })
    .on('click', '.user-logout',function(){
        // 默认状态
        $('.user-login .info').show();
        
        // 移除登入信息
        $('#userLoginAfter').remove();
    })
    // 监听用户昵称移入移出
    .on('mouseover', '.username', function(){
        $('.userList').show();
    })
    .on('mouseout','.username', function(){
        $('.userList').hide();        
    })
    // 监听用户list移入移出
    .on('mouseover','.userList', function(){
        $(this).show();
    })
    .on('mouseout','.userList', function(){
        $(this).hide();
    })

    //登入|注册
    $('#loginContentBox .close').click(function(){
        $('#loginContentBox').hide();
    })
})