$(function(){
    //开启es5严格模式
    'use strict';

    // ol 列表动画
    $('header nav li').hover(
        function(){
            $(this).find('ol').show();
        },
        function(){
            $(this).find('ol').hide();
        }
    );

    // 城市modal 切换
    $('.toggle').click(function(){
        $('.citylist').fadeIn();
    })
    $('.close').click(function(){
        $('.citylist').fadeOut();
    })
    

    
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
        
    // 监听登录|登出按钮
    $('.user-login')
    .on('click', '.user-login-btn', function(){
        $('.user-login').append(infoHtml);
        $('.user-login .info').hide()
    })
    .on('click', '.user-logout',function(){
        $('.user-login .info').show();
        $('.user-login-after').hide()
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






    //检索 二手房 租房  小区
    $('.search ul>li').click(function(){
        var num = $(this).index();
        switch(num) {
            case 0: 
                $(".search-box input:eq(0)").attr("placeholder", '请输入区域丶商圈或小区名开始找房');
                $('.search-box .up').animate({left: '25px'});
                break;
            case 1: 
                $(".search-box input:eq(0)").attr("placeholder", '请输区名开始租房');
                $('.search-box .up').animate({left: '110px'});
                break;
            case 2: 
                $(".search-box input:eq(0)").attr("placeholder", '请输入区域丶名开始找房');
                $('.search-box .up').animate({left: '180px'});
                break;
        }
    })

    //登录|注册
    $('.loginContent .close').click(function(){
        $('.loginContent').hide();
    })
})