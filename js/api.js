/* 
 * 注意：本文件内的所有方法以“api_”作为前缀
 */

/*
 * @Author: 徐横峰 
 * @Date: 2018-07-08 01:23:51 
 * @Last Modified by: Xuhengfeng
 * @Last Modified time: 2018-07-08 22:44:42
 */

// 手机帐号登录
function api_requestLogin(params){
  var result;
	$.ajax({
      url: URL.USER_LOGIN,
      data: params,
      contentType: 'application/json; charset=UTF-8',
      dataType:'json',
      type: 'POST',
      async: false,
      success: function(data){
        sessionStorage.token = data.data;
        result = data;
      },
      error: function(XMLHttpRequest, textStatus, errorThrown){
        sin_ajaxError(XMLHttpRequest, textStatus, errorThrown);
      }
    })
  return result;
}

// 手机快捷帐号登录
function api_request2Login(params){
  var result;
	$.ajax({
      url: URL.SMSCODE_LOGIN,
      data: params,
      contentType: 'application/json; charset=UTF-8',
      dataType:'json',
      type: 'POST',
      async: false,
      success: function(data){
        sessionStorage.token = data.data;
        result = data;
      },
      error: function(XMLHttpRequest, textStatus, errorThrown){
        sin_ajaxError(XMLHttpRequest, textStatus, errorThrown);
      }
    })
  return result;
}

// 获取登录用户信息
function api_userInfo(token){
  var result;
	$.ajax({
      url: URL.USER_DETAILINFO,
      contentType: 'application/json;charset=UTF-8',
      dataType:'json',
      type: 'POST',
      beforeSend: function(XMLHttpRequest) {
        XMLHttpRequest.setRequestHeader("unique-code", token);
      },
      async: false,
      success: function(data){
        sessionStorage.userInfo = JSON.stringify(data.data);
        result = data;
      },
      error: function(XMLHttpRequest, textStatus, errorThrown){
        sin_ajaxError(XMLHttpRequest, textStatus, errorThrown);
      }
    })
  return result;
}
 
// 手机号码注册
function api_registerUser(params) {
  var result;
	$.ajax({
      url: URL.USER_REGISTER,
      data: params,
      contentType: 'application/json;charset=UTF-8',
      dataType:'json',
      type: 'POST',
      async: false,
      success: function(data){
        result = data;
      },
      error: function(XMLHttpRequest, textStatus, errorThrown){
        sin_ajaxError(XMLHttpRequest, textStatus, errorThrown);
      }
    })
  return result;
}

// 手机号码注册发送验证码
function api_sendCode(params) {
  var result;
	$.ajax({
      url: URL.FETCHSMSCODE,
      contentType: 'application/json;charset=UTF-8',
      dataType:'json',
      data: params,
      type: 'POST',
      async: false,
      success: function(data){
        result = data;
      },
      error: function(XMLHttpRequest, textStatus, errorThrown){
        sin_ajaxError(XMLHttpRequest, textStatus, errorThrown);
      }
    })
  return result;
}

// 找回密码
function api_registerPwd(params) {
  var result;
	$.ajax({
      url: URL.SMSCODE_RESETLOGIN,
      contentType: 'application/json;charset=UTF-8',
      dataType:'json',
      data: params,
      type: 'POST',
      async: false,
      success: function(data){
        result = data;
      },
      error: function(XMLHttpRequest, textStatus, errorThrown){
        sin_ajaxError(XMLHttpRequest, textStatus, errorThrown);
      }
    })
  return result;
}