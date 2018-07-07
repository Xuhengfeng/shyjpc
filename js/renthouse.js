/*
 * @Author: 徐横峰 
 * @Date: 2018-07-08 01:32:35 
 * @Last Modified by:   Xuhengfeng 
 * @Last Modified time: 2018-07-08 01:32:35 
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