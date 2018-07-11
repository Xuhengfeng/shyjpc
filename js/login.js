//开启es5严格模式
'use strict';

/*
 * @Author: 徐横峰 
 * @Date: 2018-07-08 01:32:50 
 * @Last Modified by: 564297479@qq.com
 * @Last Modified time: 2018-07-11 17:41:46
 */

$(function(){
    // 监听用户登录相关操作
    $('#user')
    // 监听用户登录
    .on('click', '.user-login-btn', function(){
        // 打开登录面板
        $('#loginContentBox').show();
        $('.loginBox').show();
        $('.phoneBox').hide();
        $('.registerBox').hide();
        $('.resetPwd').hide();
    })
    // 监听用户注册
    .on('click', '.user-register-btn', function(){
        // 打开注册面板
        $('#loginContentBox').show();
        $('.registerBox').show();
        $('.loginBox').hide();
        $('.phoneBox').hide();
        $('.resetPwd').hide();
    })
    // 监听用户登出
    .on('click', '.user-logout',function(){
        // 还原默认状态
        $('.user-login .info').show(); 
        $('#loginContentBox').hide();
        $('.loginBox').hide();
        $('.phoneBox').hide();
        $('.registerBox').hide();
        $('.resetPwd').hide();

        // 移除登录信息
        $('#userLoginAfter').remove();
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userInfo');
    })
    // 监听用户昵称移入
    .on('mouseover', '.username', function(){
        $('.userList').show();
    })
    // 监听用户移出
    .on('mouseout','.username', function(){
        $('.userList').hide();        
    })
    // 监听用户list移入
    .on('mouseover','.userList', function(){
        $(this).show();
    })
    // 监听用户list移出
    .on('mouseout','.userList', function(){
        $(this).hide();
    })

    // 登录注册
    var $input1 = $('.loginBox input[type=text]');         //登录手机账号
    var $input2 = $('.loginBox input[type=password]');     //登录密码
    var $input3 = $('.loginBox input[type=submit]');       //登录提交登录

    var $input4 = $('.registerBox input[name=username]');  //注册手机账号
    var $input5 = $('.registerBox input[name=code]');      //注册验证码
    var $input6 = $('.registerBox input[name=pwd1]');      //注册密码1
    var $input7 = $('.registerBox input[name=pwd2]');      //注册密码2
    var $input8 = $('#myAgreet');                          //注册同意
    var $input9 = $('.registerBox input[type=submit');     //注册提交注册
    
    var $input10 = $('.phoneBox input[name=username]');    //手机快捷登录手机账号
    var $input11 = $('.phoneBox input[name=code]');        //手机快捷登录验证码
    var $input12 = $('.phoneBox input[type=submit]');      //手机快捷登录提交登录

    var $input13 = $('.resetPwd input[name=username]');    //忘记密码手机账号
    var $input14 = $('.resetPwd input[name=code]');        //忘记密码验证码
    var $input15 = $('.resetPwd input[name=pwd1]');        //忘记密码1
    var $input16 = $('.resetPwd input[name=pwd2]');        //忘记密码2
    var $input17 = $('.resetPwd input[type=submit]');      //忘记密码提交确定

    var $sendBtn1 = $('.registerBox button');              //注册发送验证码
    var $sendBtn2 = $('.phoneBox button');                 //手机快捷登录发送验证码
    var $sendBtn3 = $('.resetPwd button');                 //忘记密码发送验证码

    var $disabled1 = false;                                //注册发送验证码未失效
    var $disabled2 = false;                                //手机快捷登录发送验证码未失效
    var $disabled3 = false;                                //忘记密码发送验证码未失效


    // 手机账号提交
    $input3.click(function(){
        // 校验
        switch(true){
            case $input1.val()=='': return layer.msg('输入手机号');
            case !(/^1[34578]\d{9}$/).test($input1.val()): return layer.msg('输入手机号格式不正确');
            case $input2.val()=='': return layer.msg('输录密码');
        }
        var params = JSON.stringify({
            deviceCode: 'web',
            mobile: $input1.val(),
            password: $input2.val()
        })
        // 登录
        var data = api_requestLogin(params);
        // 用户信息
        var data2 = api_userInfo(data.data);

        if(data.status == 1){
            layer.msg('登录成功');
            // 成功添加登录信息
            $('.user-login .info').hide(); 
            $('.user-login').append(addContent(data2.data));

            $('#loginContentBox').hide();
            $('.loginBox').hide();
            clearAllInput();
        }else{
            layer.msg(data.msg);
        }
    })

    
    // 手机快捷登录提交
    $input12.click(function(){
        // 校验
        switch(true){
            case $input10.val()=='': return layer.msg('输入手机号');
            case !(/^1[34578]\d{9}$/).test($input10.val()): return layer.msg('输入手机号格式不正确');
            case $input11.val()=='': return layer.msg('输入验证码');
        }
        var params = JSON.stringify({
            deviceCode: "web",
            mobile: $input10.val(),
            smsCode: $input11.val()
        })
        var data = api_request2Login(params);
        var data2 = api_userInfo(data.data);

        if(data.status == 1){
            layer.msg('登录成功');
            // 成功添加登录信息
            $('.user-login .info').hide(); 
            $('.user-login').append(addContent(data2.data));
            $('#loginContentBox').hide();
            $('.loginBox').hide();
            clearAllInput();
        }else{
            layer.msg(data.msg);
        }
    })

    //登录成功之后生成 userInfo
    function addContent(data) {
        var infoHtml = '<div id="userLoginAfter">'
            +'<div class="headerImg">'
                +'<img src="'+data.headImage+'">'                   
                +'<span class="username">'+data.nickname+'</span>'
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
        +'</div>';
        return infoHtml;
    }

    // 手机号码注册提交
    $input9.click(function(){
        // 校验
        switch(true){
            case $input4.val()=='': return layer.msg('输入手机号');
            case !(/^1[34578]\d{9}$/).test($input4.val()): return layer.msg('输入手机号格式不正确');
            case $input5.val()=='': return layer.msg('验证码不能为空');
            case $input6.val()==''||$input7.val()=='': return layer.msg('密码不能为空');
            case $input6.val()!==$input7.val(): return layer.msg('两次密码不一致');
            case $input8.prop('checked')==false: return layer.msg('请同意世华服务协议,谢谢配合')
        }
        var params = JSON.stringify({
            deviceCode: "web",
            mobile: $input4.val(),
            password: $input6.val(),
            smsCode: $input5.val()
        })
        var data = api_registerUser(params);
        if(data.status == 1){
            layer.msg('注册成功');
            $('.phoneBox').hide();
            $('.loginBox').show();
            $('.registerBox').hide();
            $('.resetPwd').hide();
            clearAllInput();
        }else{
            layer.msg(data.msg);
        }

    })

    //  手机密码忘记提交
    $input17.click(function(){
        // 校验
        switch(true){
            case $input13.val()=='': return layer.msg('输入手机号');
            case !(/^1[34578]\d{9}$/).test($input13.val()): return layer.msg('输入手机号格式不正确');
            case $input14.val()=='': return layer.msg('验证码不能为空');
            case $input15.val()==''||$input16.val()=='': return layer.msg('密码不能为空');
            case $input15.val()!==$input16.val(): return layer.msg('两次密码不一致');
        }
        var params = JSON.stringify({
            mobile: $input13.val(),
            newPassword: $input15.val(),
            confirmPassword: $input16.val(),
            smsCode: $input14.val()
        })
        var data = api_registerPwd(params);
        if(data.status == 1){
            layer.msg('登录成功');
            // 成功添加登录信息
            $('.user-login .info').hide(); 
            $('.user-login').append(addContent(data2.data));

            $('#loginContentBox').hide();
            $('.loginBox').hide();
            clearAllInput();
        }else{
            layer.msg(data.msg);
        }
    })


    // 监听手机注册发送验证码
    $sendBtn1.click(function(){
        // 校验
        switch(true){
            case $input4.val()=='': return layer.msg('输入手机号');
            case !(/^1[34578]\d{9}$/).test($input4.val()): return layer.msg('输入手机号格式不正确');
        }
        var mobile = $input4.val();
        sendMsgCode(1,mobile);
    })

    // 监听手机快捷登录验证码
    $sendBtn2.click(function(){
        // 校验
        switch(true){
            case $input10.val()=='': return layer.msg('输入手机号');
            case !(/^1[34578]\d{9}$/).test($input10.val()): return layer.msg('输入手机号格式不正确');
        }
        var mobile = $input10.val();
        sendMsgCode(2,mobile);
    })

    // 监听忘记密码发送验证码
    $sendBtn3.click(function(){
        // 校验
        switch(true){
            case $input13.val()=='': return layer.msg('输入手机号');
            case !(/^1[34578]\d{9}$/).test($input13.val()): return layer.msg('输入手机号格式不正确');
        }
        var mobile = $input13.val();
        sendMsgCode(3,mobile);
    })

    // 发送验证码倒计时
    var timer,times=60;
    function countDown(num) {
            timer = setInterval(function(){
            times--;
            if (times <= 0) {
              times = 0; 
              clearInterval(timer);//清空定时器
              switch(num){
                case 1:$sendBtn1.text('发送验证码');$disabled1=false;$sendBtn1.removeClass('disableBtn');break;
                case 2:$sendBtn2.text('发送验证码');$disabled2=false;$sendBtn2.removeClass('disableBtn');break;
                case 3:$sendBtn3.text('发送验证码');$disabled3=false;$sendBtn3.removeClass('disableBtn');break;
              }
            } else {
              switch(num){
                case 1:$sendBtn1.text(times + 's重试');$disabled1=true;$sendBtn1.addClass('disableBtn');break;
                case 2:$sendBtn2.text(times + 's重试');$disabled2=true;$sendBtn2.addClass('disableBtn');break;
                case 3:$sendBtn3.text(times + 's重试');$disabled3=true;$sendBtn3.addClass('disableBtn');break;
              }
            }
        }, 1000);

    }
    //发送验证码
    function sendMsgCode(num,mobile) {
        switch(num){
          case 1:$disabled1==false&&sendMsgCodeRequest(num,mobile);break;
          case 2:$disabled2==false&&sendMsgCodeRequest(num,mobile);break;
          case 3:$disabled3==false&&sendMsgCodeRequest(num,mobile);break;
        }
    }
    function sendMsgCodeRequest(num,mobile) {
        var operateType;
        switch(num) {
          case 1:operateType = "REGISTER";break;
          case 2:operateType = "LOGIN";break;
          case 3:operateType = "RESET_PASSWORD";break;
        }
        //手机号签名
        var key = mobile + "29e94f94-8664-48f2-a4ff-7a5807e13b68";
        var sign = md5(key.toUpperCase()).toLowerCase();
        var params = JSON.stringify({
            deviceCode: "web",
            mobile: mobile,
            operateType: operateType,
            sign: sign
        })
        var data = api_sendCode(params);
        if(data.status==1){
            countDown(num);//开启倒计时
        }else{
            layer.msg(data.msg);
        }
    }

    // 切换界面
    // 手机快捷登录点击
    $('.loginBox .phoneLogin').click(function(){
        $('.loginBox').hide();
        $('.phoneBox').show();
        $('.registerBox').hide();
        $('.resetPwd').hide();
        clearAllButton();   
        clearAllInput();
    });

    // 忘记密码点击
    $('.loginBox .forget').click(function() {
        $('.loginBox').hide();
        $('.phoneBox').hide();
        $('.registerBox').hide();
        $('.resetPwd').show();
        clearAllButton();   
        clearAllInput();
    })

    // 账号密码点击
    $('.phoneBox .pwdLogin span').click(function() {
        $('.loginBox').show();
        $('.phoneBox').hide();
        $('.registerBox').hide();
        $('.resetPwd').hide();
        clearAllButton();   
        clearAllInput();
    })

    // 去注册点击
    $('.loginBox .register').click(function() {
        $('.loginBox').hide();
        $('.phoneBox').hide();
        $('.registerBox').show();
        $('.resetPwd').hide();
        clearAllButton();   
        clearAllInput();
    })
    $('.phoneBox .register').click(function() {
        $('.loginBox').hide();
        $('.phoneBox').hide();
        $('.registerBox').show();
        $('.resetPwd').hide();
        clearAllButton();   
        clearAllInput();
    })
    $('.resetPwd .register').click(function() {
        $('.phoneBox').hide();
        $('.loginBox').hide();
        $('.registerBox').show();
        $('.resetPwd').hide();
        clearAllButton();   
        clearAllInput();
    })

    // 去登录点击
    $('.registerBox .login').click(function() {
        $('.phoneBox').hide();
        $('.loginBox').show();
        $('.registerBox').hide();
        $('.resetPwd').hide();
        clearAllButton();   
        clearAllInput();
    })

    // 阴影层点击关闭
    $('#loginContentBox .shadow').click(function(){
       $('#loginContentBox').hide('fast');
       clearAllButton(); 
       clearAllInput();
    });

    // 登录对话框点击关闭
    $('#loginContentBox .close').click(function(){
        $('#loginContentBox').hide();
        clearAllButton(); 
        clearAllInput();
    })

    // 清空所有的input 除了提交的input
    function clearAllInput() {
        $('#loginContentBox input:not(input[type="submit"])').val('');
    }
    // 重新赋值所有的button的操作 
    function clearAllButton() {
        times = 60;
        $disabled1 = false;
        $disabled2 = false;
        $disabled3 = false;
        clearInterval(timer);//清空定时器        
        $('#loginContentBox button').text('发送验证码');
        $('#loginContentBox button').removeClass('disableBtn');
    }
})