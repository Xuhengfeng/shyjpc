/*
 * @Author: 徐横峰 
 * @Date: 2018-07-08 01:32:58 
 * @Last Modified by: 564297479@qq.com
 * @Last Modified time: 2018-07-10 13:36:52
 */
$(function(){
    //开启es5严格模式
    'use strict';

    // ol 列表动画
    $('#menu li').hover(
        function(){
            $(this).find('ol').show();
        },
        function(){
            $(this).find('ol').hide();
        }
    );

    // 城市modal 切换
    $('#toggleCity').click(function(){
        $('.citylist').fadeIn();
    })
    $('.citylist .shadow, #closeDialog').click(function(){
        $('.citylist').fadeOut();
    })
      
    //检索 二手房 租房  小区
    $('#selectQuery li').click(function(){
        var num = $(this).index();
        switch(num) {
            case 0: 
                $(".search-box input:eq(0)").attr("placeholder", '请输入区域丶商圈或小区名开始找房');
                $('.search-box .up').animate({left: '25px'});
                break;
            case 1: 
                $(".search-box input:eq(0)").attr("placeholder", '请输区名开始租房');
                $('.search-box .up').animate({left: '123px'});
                break;
            case 2: 
                $(".search-box input:eq(0)").attr("placeholder", '请输入区域丶名开始找房');
                $('.search-box .up').animate({left: '220px'});
                break;
        }
    })

    // 监听会话列表
    var showChatlist = true;//用来切换会话列表
    var showChatBox = true;//用来记住聊天窗口是否被打开
    $('.chatList')
    .on('click', '.title', function(){
        if(showChatlist){
            $('.chatList').animate({marginBottom: 0},0.2);
            $('.upDown').show();
            showChatlist = false;
            showChatBox ? $('.chatBox').show() : $('.chatBox').hide();
        }else{
            $('.chatList').animate({marginBottom:"-460px"},0.2);
            $('.chatBox').hide();
            $('.upDown').hide();
            showChatlist = true;
        }
    })
    .on('click', 'li',function(){
        showChatBox = true;
        $('.chatBox').show();
    })

    // 监听聊天窗口
    $('.chatBox')
    .on('click', '.closeChat', function(){
        showChatBox = false;
        $('.chatBox').hide();
    })
    
    

})