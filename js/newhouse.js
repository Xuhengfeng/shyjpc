/*
 * @Author: 徐横峰 
 * @Date: 2018-07-05 23:27:08 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-06 00:05:38
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
    
})