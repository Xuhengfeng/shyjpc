//欢迎信息

layer.config({
    extend: ['layer.ext.js', 'layer.css'],
    skin: 'layer-ext-moon'
});

layer.ready(function () {
    logs();

    // var html = $('#welcome-template').html();
    // $('a.viewlog').click(function () {
    //     logs();
    //     return false;
    // });

    // $('#pay-qrcode').click(function(){
    //     var html=$(this).html();
    //     parent.layer.open({
    //         title: false,
    //         type: 1,
    //         closeBtn:false,
    //         shadeClose:true,
    //         area: ['600px', 'auto'],
    //         content: html
    //     });
    // });

    function logs() {
        parent.layer.open({
            title: '初见倾心，再见动情',
            type: 1,
            area: ['700px', 'auto'],
            content: html,
            btn: ['确定', '取消']
        });
    }

    console.log('欢迎使用iCard。');

});
