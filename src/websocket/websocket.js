/**
 * TODO websocket封装
 * wjw
 * 2020年3月19日14:30:03
 */
const config = require('./config.js');
var app = getApp();
var lockReconnect = false;
const host = config.websocketServer; // websocket服务器baseUrl
let sotk = null;
let socketOpen =false;
var this_;

function shili(that){
  this_=that
}
function ws_connect(identity){
  sotk = wx.connectSocket({
    url: config.websocketServer + `?token=${wx.getStorageSync('token')}&identity=${identity}`,
    header: {
      'content-type': 'application/json'
    }
  })
  sotk.onOpen(res => {
    socketOpen = true;
    console.log('监听 WebSocket 连接打开事件。', res);
    this_.props.updateWebsocket(1);
    heartCheck.start();
  })
  sotk.onClose(onClose => {
    this_.props.updateWebsocket(0);
    socketOpen = false;
    reconnect();
    console.log('监听 WebSocket 连接关闭事件。', onClose)
  })
  sotk.onError(onError => {
    socketOpen = true;
    reconnect();
    console.log('监听 WebSocket 错误。错误信息', onError)
  })

  // 收到消息
  sotk.onMessage(onMessage => {
    //收到消息改变当前数据
    var websocketMessage = onMessage.data;
    this_.props.setList(this_, websocketMessage)
    console.log(onMessage)
    heartCheck.start();
  })
}

function sendMsg(msg,success){
  if (socketOpen) {
    console.log(JSON.stringify(msg))
    sotk.send(
      {
        data:JSON.stringify(msg)},
        function (res) {
          success(res)
        })
  }
}
//重新连接
function reconnect() {
    if(lockReconnect) {
      return;
    };
    lockReconnect = true;
   setTimeout(function () {
        ws_connect('1');
      lockReconnect = false;
    }, 4000);
}
  //心跳检测
  var heartCheck = {
    timeout: 210000,
    timeoutObj: null,
    serverTimeoutObj: null,
    start: function(){
        console.log(" sotk 心跳检测");  
        var self = this;
        this.timeoutObj && clearTimeout(this.timeoutObj);
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
        this.timeoutObj = setTimeout(function(){
          
            var json = {identity:'3',order_id:'0',content:'3',time:0,type:'0',value:0};
            sendMsg(json,function(res){
              console.log(res);
            })
            self.serverTimeoutObj = setTimeout(function() {
                console.log(1,sotk);
                sotk.close();
            }, self.timeout);
        }, this.timeout)
    }
} 
module.exports.ws_connect = ws_connect;
module.exports.sendMsg = sendMsg;
module.exports.shili = shili;
