/*
 * @Author: 徐横峰 
 * @Date: 2018-07-05 23:27:08 
 * @Last Modified by: 564297479@qq.com
 * @Last Modified time: 2018-07-06 18:03:54
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
    
    // 图片交互区域
    // 实例1
    var oSwiper1 = new Swiper(".view .swiper-container", {
                        onSlideChangeStart: function() {
                            updateNavPosition();
                        }
                    });
    // 实例2
    var oSwiper2 = new Swiper(".preview .swiper-container", {
                        visibilityFullFit: true,
                        slidesPerView: "auto",
                        allowTouchMove: false,
                        onTap: function() {
                            oSwiper1.slideTo(oSwiper2.clickedIndex);
                        }
                    });
                    
      // 上一张图片
      $(".view .arrow-left,.preview .arrow-left")
      .on("click", function(e) {
            e.preventDefault();
            if (oSwiper1.activeIndex == 0) {
                oSwiper1.slideTo(oSwiper1.slides.length - 1, 1000);
            return;
            }
            oSwiper1.slidePrev();
      });

      // 下一张图片
      $(".view .arrow-right,.preview .arrow-right")
      .on("click", function(e) {
            e.preventDefault();
            if (oSwiper1.activeIndex == oSwiper1.slides.length - 1) {
            oSwiper1.slideTo(0, 1000);
            return;
            }
            oSwiper1.slideNext();
      });

      // 鼠标移入移出
      $('.view').mouseover(()=>{
        $(".view .arrow-left,.view .arrow-right").show();
      }).mouseout(()=>{
        $(".view .arrow-left,.view .arrow-right").hide();
      })

      // 更新acitve位置
      function updateNavPosition() {
          $(".preview .active-nav").removeClass("active-nav");
          var activeNav = $(".preview .swiper-slide")
              .eq(oSwiper1.activeIndex)
              .addClass("active-nav");
          if (!activeNav.hasClass("swiper-slide-visible")) {
              if (activeNav.index() > oSwiper2.activeIndex) {
              var thumbsPerNav =
                  Math.floor(oSwiper2.width / activeNav.width()) - 1;
              oSwiper2.slideTo(activeNav.index() - thumbsPerNav);
              } else {
              oSwiper2.slideTo(activeNav.index());
              }
          }
      }
      
    // 百度地图实例化
    var omap = new BMap.Map("oMap");
    var point = new BMap.Point(116.331398, 39.897445);//城市的坐标
        omap.centerAndZoom(point, 12);

    var geolocation = new BMap.Geolocation();
        geolocation.enableSDKLocation();//开启SDK辅助定位
        geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            omap.addOverlay(mk);
            omap.panTo(r.point);
        } 
    });

})

