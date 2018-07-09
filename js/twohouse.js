/*
 * @Author: 徐横峰 
 * @Date: 2018-07-08 01:31:50 
 * @Last Modified by: 564297479@qq.com
 * @Last Modified time: 2018-07-09 17:36:39
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
    
    // 分页器
    function changePage(val){
        //alert(val);
        currentPage=$("#"+val).text();
        //alert(currentPage);
        currentPage=parseInt(currentPage);
        getPrice(currentPage,"10");
    }
     
    function forward(){
        var currentPage=$("#currentPage").text();
        currentPage=parseInt(currentPage);
        if(currentPage>1){
            currentPage=currentPage-1;
        }
        getPrice(currentPage,"10");
        }
    function back(){
        var currentPage=$("#currentPage").text();
        var pageSum=$("#pageSum").text();
        if(parseInt(currentPage)<parseInt(pageSum)){
            currentPage=parseInt(currentPage)+1;
        }
        getPrice(currentPage,"10");
    }
        
    function getPrice(currentPage,pageSize){
        
        //alert(currentPage);   	
           $("#currentPageAdd1").text(parseInt(currentPage)+1);
           $("#currentPageAdd2").text(parseInt(currentPage)+2);
           $("#currentPageAdd3").text(parseInt(currentPage)+3);
           $("#currentPageAdd4").text(parseInt(currentPage)+4);
        
        if(currentPage==-1){
            currentPage=$("#pageSum").text();
           }
        var _url = "<%=request.getContextPath()%>/user/getDataFromURL.html";
        $.ajax({
              type: 'POST',
              url: _url,
              data: {"currentPage":currentPage,"pageSize":pageSize},
              dataType: "json",
              success: function(data){
                    $("#pricehangqingtongji").empty();
                if (data.success==1){
                    //alert(data.price.totalCount);
                    var pageSum=0;
                    if(data.price.rows.length%pageSize+"".indexOf(".")==-1){					
                        pageSum=data.price.totalCount/pageSize+"";
                        pageSum=pageSum.split(".")[0];
                    }else{
                        pageSum=parseInt(data.price.totalCount/pageSize)+1+"";
                        pageSum=pageSum.split(".")[0];
                    }				
                    $("#pageSum").text(pageSum);
                    $("#currentPage").text(currentPage);
                    
                    $.each(data.price.rows,function(index,value){
                        var li ='';
                        li +='<ul class="list-con">';					
                        li +=' </ul>';	
                        $("#pricehangqingtongji").append(li);
                        });
     
                }			
            }
        });
    }	
    
})