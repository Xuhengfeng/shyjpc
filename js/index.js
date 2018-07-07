/*
 * @Author: 徐横峰 
 * @Date: 2018-07-08 01:32:58 
 * @Last Modified by:   Xuhengfeng 
 * @Last Modified time: 2018-07-08 01:32:58 
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
    $('#closeDialog').click(function(){
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

})