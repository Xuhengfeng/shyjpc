/*
 * @Author: 徐横峰 
 * @Date: 2018-07-08 01:32:50 
 * @Last Modified by: 564297479@qq.com
 * @Last Modified time: 2018-07-09 10:14:11
 */
// 扩展jquery方法
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName);
    }
});

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
        
    // 监听用户登入
    $('#user')
    .on('click', '.user-login-btn', function(){
        // 修改状态 打开登入面板
        $('.user-login .info').hide();
        $('#loginContentBox').show();
        $('.loginBox').show();
        
        // 登入请求
        var result = api_requestLogin();
        
        // 成功添加登入信息
        $('.user-login').append(infoHtml);
    })
    // 监听用户登出
    .on('click', '.user-logout',function(){
        // 还原默认状态
        $('.user-login .info').show();
        $('.loginBox').hide();
        $('.registerBox').hide();
        $('.phoneBox').hide();
        $('.resetPwd').hide();

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

    // 手机快捷登录点击
    $('.loginBox .phoneLogin').click(function(){
        $('.loginBox').hide();
        $('.phoneBox').show();
        $('.registerBox').hide();
        $('.resetPwd').hide();
    });

    // 忘记密码点击
    $('.loginBox .forget').click(function() {
        $('.loginBox').hide();
        $('.phoneBox').hide();
        $('.registerBox').hide();
        $('.resetPwd').show();
    })

    // 账号密码点击
    $('.phoneBox .pwdLogin span').click(function() {
        $('.loginBox').show();
        $('.phoneBox').hide();
        $('.registerBox').hide();
        $('.resetPwd').hide();
    })

    // 去注册点击
    $('.loginBox .register').click(function() {
        $('.loginBox').hide();
        $('.phoneBox').hide();
        $('.registerBox').show();
        $('.resetPwd').hide();
    })
    $('.phoneBox .register').click(function() {
        $('.loginBox').hide();
        $('.phoneBox').hide();
        $('.registerBox').show();
        $('.resetPwd').hide();
    })
    $('.resetPwd .register').click(function() {
        $('.phoneBox').hide();
        $('.loginBox').hide();
        $('.registerBox').show();
        $('.resetPwd').hide();
    })

    // 去登录点击
    $('.registerBox .login').click(function() {
        $('.phoneBox').hide();
        $('.loginBox').show();
        $('.registerBox').hide();
        $('.resetPwd').hide();
    })

    // 阴影层点击关闭
    $('#loginContentBox .shadow').click(function(){
       $('#loginContentBox').hide('fast');
    });

    // 登录对话框点击关闭
    $('#loginContentBox .close').click(function(){
        $('#loginContentBox').hide();
    })
})