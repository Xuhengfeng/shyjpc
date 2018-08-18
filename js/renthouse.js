/*
 * @Author: 徐横峰 
 * @Date: 2018-07-08 01:31:50 
 * @Last Modified by: 564297479@qq.com
 * @Last Modified time: 2018-07-12 15:57:55
 */

//开启es5严格模式
'use strict';
$(function(){
    // ol 列表动画
    $('#menu li').hover(
        function(){
            $(this).find('ol').show();
        },
        function(){
            $(this).find('ol').hide();
        }
    );
    
    // 分页器
    $(".opagination").Page({
        Pages:200,
        PageOn:function(e){
            if($('.opagination li:first-child').get(0).title == '上一页'){
                $('.opagination li:first-child').text('上一页')
            }
            if($('.opagination li:last-child').get(0).title == '下一页'){
                $('.opagination li:last-child').text('下一页')
            }
            $('html,body').scrollTop(0);
            // 请求
        },
        JumpOn:function(e){},
        ActiveClass:"paging-selecte",
    });

})
