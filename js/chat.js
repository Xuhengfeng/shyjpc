'use strict';
 // 挂载IM
 window.JIM = new JMessage({debug: true});

 //初始化极光IM
function Jiguang_Init() {
    JIM.init({
        appkey: this.AuthJiG.appkey,
        random_str: this.AuthJiG.random_str,
        signature: this.AuthJiG.signature,
        timestamp: this.AuthJiG.timestamp,
        flag: 1,
    })
    .onSuccess(data => {
        Jiguang_login();//极光登录
    })
    .onFail(error => {});
}

//极光登录
function Jiguang_login() {
    JIM.login({
      username: this.userInfo.easemobUsername,
          password: this.userInfo.easemobPassword
      })
      .onSuccess(data => {
          this.Jiguang_onDisconnect();//监听是否在线
          this.Jiguang_userInfo();//用户信息
          this.Jiguang_conversation();//这里首次会话列表
          this.Jiguang_syncConversation();//这里首次同步监听离线消息
          this.$refs.oChat.Jiguang_onMsg();//监听消息
      })
      .onFail(data => {});
}

//监听是否在线
function Jiguang_onDisconnect() {
    JIM.onDisconnect(res=>{
      this.afresh();
    })
}

//获取极光IM会话列表
function Jiguang_conversation() {
    JIM.getConversation()
    .onSuccess(data => {
        //缓存好友列表
        localStorage.firend = data.conversations;
    })
    .onFail(data => {});
}

//离线消息同步监听
function Jiguang_syncConversation(){
    JIM.onSyncConversation(data=> {
        //缓存历史漫游消息
        localStorage.history = data;
    });
}


