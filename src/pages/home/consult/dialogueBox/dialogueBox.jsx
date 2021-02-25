import React, { Component } from 'react'
import { View,Image,Input,ScrollView,Text  } from '@tarojs/components'
import './dialogueBox.scss'
import {connect} from 'react-redux';
import Hearder from './../../../../commen/header/header';
import http from './../../../../utils/http';
import * as actionCreators from './store/actionCreators';
import * as actionCreatorsWebsocket from './../store/actionCreators';
import * as actionCreatorsCart from './../../../shoopstore/shoopPayBefore/shoppingCart/store/actionCreators';
import * as actionCreatorsCartJsuan from './../../../shoopstore/shoopPayBefore/SettlementOrder/store/actionCreators';
import * as actionCreatorsInfo from './../../../myCenter/orderInfo/store/actionCreators';

import websocket from './../../../../websocket/websocket';
import * as imager from './../assets';
import {voiceReciver} from './../aodio';
import Taro from '@tarojs/taro'
class DialogueBox extends Component {
    componentWillMount () {
      
      this.props.setchatList(this)
      var that = this;
      setTimeout(() => {
        that.setState({
            stsop:10000000
        })
      }, 300);
    }
    
    componentDidMount () { 
      websocket.shili(this)
      if(this.props.websocketState===0){
        websocket.ws_connect('1');
      }
        this.setState({
          voiceReciver
        })
    }

    componentWillUnmount () { }

    componentDidShow () {
      
      
      // this.textInput.current.focus();
    }
    componentDidHide () { 
     
    }
    constructor(props) {
        super(props)
        this.state = {
            header:'在线咨询',
            switchover:true,
            btnState:true,
            stsop:0,
            //键盘高度
            keyHeight:0,
            temateOut:'',
            //录音动画
            ifDonghua:false,
            voiceReciver:'',
            voicePlayer:''
        }
    }
    //返回上一层
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
      //切换
    clickswitchover(that){
      
      var switchover=!that.state.switchover;
      that.setState({
        switchover:switchover
      })
    }
    //底部输入框
    getInputVal(switchover,that){
      if(switchover===true){
        return (
          <View className="switchover" >
              <View className="aido" onClick={this.inputonBlur.bind(that,0)}>
                    <Image  mode="widthFix" className="yuyin" src={imager.yuyin}/>
              </View>
              <View className="input">
                  <Input className="inpVlue" focus={false} id="inpVlue" type='text' value={this.props.inputValue} onInput={this.props.getValue.bind(that)} onFocus={this.inputLoseFocus.bind(this)} onBlur={this.inputonBlur.bind(this)} adjust-position={false} placeholder='发消息...' />
              </View>
          </View>
        )
      }else{
        return (
          <View className="switchover">
              <View className="aido" onClick={this.inputonBlur.bind(that,0)}>
                    <Image  mode="widthFix" className="jianpan" src={imager.jianpan}/>
              </View>
              <View className="input">
                  {/* <Input className="inpVlue" id="inpVlue" type='text' placeholder='发消息...' focus/> */}
                  <View className="textVlue" onTouchStart={this.handleStartRecord.bind(this)} onTouchEnd={this.handleStopRecord.bind(this)}>按住说话</View>
              </View>
          </View>
        )
      }
    }
    //发送文本
    sendcontent(){
     this.props.sendMessage(this.props.inputValue,'1',0,this);
    }
    //底部切换
    getbtuFs(btnState){
      if(btnState===true){
        return (
          <View className="tu">
            <Image  mode="widthFix" className="tupian" src={imager.tupian} onClick={this.chooseImage.bind(this)}/>
          </View>
        )
      }else{
        return (
          <View className="btn" onClick={this.sendcontent.bind(this)}>
            <View className="buttoner">发送</View>
          </View>
        )
      }
    }
    //获取到焦点
    inputLoseFocus(e){
     console.log(e.detail.height); 
     this.setState({
      keyHeight:e.detail.height
     })
     var that = this;
     var stsop = that.state.stsop;
     setTimeout(() => {
       that.setState({
           stsop:stsop + 1
       })
     }, 100);
    }
    // 失去焦点
    inputonBlur(type){
      this.setState({
        keyHeight:0
       })
       var that = this;
       var stsop = that.state.stsop;
       setTimeout(() => {
         that.setState({
             stsop:stsop + 1
         })
       }, 100);
       if(type===0){
        this.clickswitchover(this)
       }
    }
    //开始录音
    handleStartRecord = () => {
      
      var that = this;
      
      let option = {
        duration: 60000, //录音的时长
        format: 'mp3', //录音的格式，有aac和mp3两种
      }
        that.state.voiceReciver.start(option)
        that.state.voiceReciver.onStart(() => {
          that.setState({
            ifDonghua:true
          })
          console.log('录音开始事件') //这个方法是录音开始事件，你可以写录音开始的时候图片或者页面的变化
        })
    }
    // 停止录音
    handleStopRecord = () => {
          var that = this;
          that.state.voiceReciver.stop()
          that.state.voiceReciver.onStop((res) => {
            that.setState({
              ifDonghua:false
            })
            console.log(res) //这里是必须写完成事件的，因为最后的文件，就在这里面；
            
            if(res.duration <=500){
              Taro.showToast({
                title:'按键时间过短',
                 icon:'none',
                 duration:1000
               })
            }else{
              var  time = Math.round(res.duration / 1000);
              console.log(res.duration);
              console.log(time);
              that.uploadFile(that,'3',res.tempFilePath,time);
            }
            
            
          })
      
    }
    
    //预览图片
    previewImage(src){
      Taro.previewImage({
        current: src, // 当前显示图片的http链接
        urls: [src] // 需要预览的图片http链接列表
      })
    }
    
    //上传图片
    chooseImage(){
      var that = this;
      Taro.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
        success: function (res) {
          
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          that.uploadFile(that,'2',tempFilePaths[0],0);
        }
      })
    }
    //上传文件
    uploadFile(that,type,tempFilePath,time){
      const config = require('./../../../../utils/config.js');
      Taro.uploadFile({
        url: config.heardUrl +'consult/uploadFile', //仅为示例，非真实的接口地址
        filePath:tempFilePath,
        name: 'uploadFile',
        formData: {
          // 'filePath': 'test'
        },
        success (res){
          var data = JSON.parse(res.data)
          if(data.errcode===0){
            that.props.sendMessage(data.data.path,type,time,that);
          }
          
        }
      })
    }
    render () {
      //当键盘弹出
        var style= {
          marginBottom:this.state.keyHeight + 'px'
        }
        //当键盘弹出
        if(this.props.order_code!==40){
          var styles = {
            height:'calc(100% - 400rpx - ' + (this.state.keyHeight + 'px') + ')'
          }
        }else{
          var styles = {
            height:'calc(100% - 200rpx - ' + (this.state.keyHeight + 'px') + ')'
          }
        }
        
        const { chatList,counts,userInfo } = this.props;
        const Listchat=chatList.toJS();
        const config = require('./../../../../utils/config');
        return (
          <View className='components-page' style="-webkit-overflow-scrolling: touch;">
            <View className="luzhi" >
              <Image  mode="widthFix" src={config.imgUrl+'luzhi.gif'} width="30" />
            </View> 
            
          {
            this.state.ifDonghua
            ?<View className="zheZhao" >
              <View className="donghua">
                <Image  mode="widthFix" src={config.imgUrl+'luzhi.gif'} width="30" className="donghua_img"/>
              </View>
            </View>:''
          }
            
            <View className="titler">
              <Hearder titleText={this.state.header}  goback={true} background={true} toback={this.getback}></Hearder>
              {/* <View className="nav">
                    剩余消息条数{counts}条
                </View> */}
            </View>
            <View className="content"  >
              <ScrollView className='scrollview'
              scrollY
              scrollWithAnimation
              scrollTop={this.state.stsop}
              style={styles}
              lowerThreshold="100">
                {
                  Listchat.map((item,index) => {
                    if(item.identity==='2'){
                      return (
                        <View className="content_left" key={index}>
                            <View className="header_image">
                              {
                                item.type==='9'?'':<Image  mode="widthFix" className="img_header" src={imager.doctor}/>
                              }
                                
                            </View>
                            {
                              item.type==='1'
                              ?<View className="content_text">
                                <Image   className="text_imager" src={imager.zuojan}/>
                                <View className="text">
                                    {item.content}
                                </View>
                              </View>
                              :item.type==='2'
                              ?<View className="content_text">
                                 <Image  mode="widthFix" src={item.content} className="widthFiximg" onClick={this.previewImage.bind(this,item.content)}/>
                              </View>
                              :item.type==='9'
                              ?<View className="content_chufang">
                                处方已开具，请点击此处查看 <Text className="chufinfo" onClick={this.props.jiesuan.bind(this,item)}>处方详情</Text> 
                              </View>
                              :<View className="content_text">
                                <View className="aidos" onClick={this.props.statePay.bind(this,item)}>
                                  <Image  mode="widthFix" src={imager.weibofang} width="30"/>
                                  {item.time}
                                </View>
                              </View>
                            }
                        </View>
                      )
                    }else if(item.identity==='1'){
                      return (
                        <View className="content_right" key={index}>
                          {
                            item.type==='1'
                            ?<View className="content_text_right">
                              <View className="text_right">
                                  {item.content}
                              </View>
                              <Image  mode="widthFix" className="text_imager_right" src={imager.youjan}/>
                            </View>
                            :item.type==='2'
                            ?<View className="content_text_right">
                               <Image  mode="widthFix" src={item.content} className="widthFiximg" onClick={this.previewImage.bind(this,item.content)}/>
                            </View>
                            :<View className="content_text_right">
                              <View className="aidos" onClick={this.props.statePay.bind(this,item)}>
                                  <Text className="timeTxt">
                                      {item.time}
                                  </Text> 
                                {
                                  item.value===0?<Image  mode="widthFix" src={imager.weibofang} style="width:20px;height:10px;vertical-align: middle;"/>:<Image  mode="widthFix" src={imager.bofang} style="width:20px;height:10px;vertical-align: middle;"/>
                                }
                                 
                                </View>
                            </View>
                          }
                            <View className="header_image_right">
                                <Image  mode="widthFix" className="right_imager" src={wx.getStorageSync('avatar')}/>
                            </View>
                        </View>
                      )
                    }
                  })
                }
              </ScrollView>
            </View>
            {
              this.props.order_code!==40
              ?<View className="bottom" style={style}>
                  {this.getInputVal(this.state.switchover,this)}
                  <View className="wawa">
                  </View>
                  {this.getbtuFs(this.state.btnState,this)}
              </View>
              :''
            }
              
          </View>
        )
    }
}
const mapStateTopProps = (state)=>{
  return {
    //消息内容
    chatList:state.getIn(['dialogueBox','chatList']),
    //输入框内容
    inputValue:state.getIn(['dialogueBox','inputValue']),
    //订单号
    order_id:state.getIn(['dialogueBox','OrderNo']),
    //websocket链接状态
    websocketState:state.getIn(['websocketState','websocketState']),
    //剩余条数
    counts:state.getIn(['dialogueBox','counts']),
    //订单状态
    order_code:state.getIn(['dialogueBox','OrderCode']),
    //用户个人信息
    userInfo:state.getIn(['myCenter','userInfo'])
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    jiesuan(item){
      var data = JSON.parse(item.content); 
      var pid  = data.pid;
      //请求
      var url  = 'mallOrder/queryOrderByPid'
      var prams = {
        pid
      }
      http.postRequest(url,prams,
        function(res){
          if(res.errcode===0){
            if(res.data.order_id===''){
              var pidAction = actionCreatorsCartJsuan.setPides(pid);
              
              var  settlementListAction = actionCreatorsCart.settlementList(data.data);
              var  setOrderedTypeAction = actionCreatorsCart.setOrderedType(3)
              dispatch(pidAction)
              dispatch(setOrderedTypeAction);
              dispatch(settlementListAction);
              Taro.navigateTo({
                url: '/pages/shoopstore/shoopPayBefore/SettlementOrder/SettlementOrder'　　
              })
              
            }else{
              var orderIdAction = actionCreatorsInfo.getorderNo(res.data.order_id);
              dispatch(orderIdAction);
              Taro.navigateTo({
                url: '/pages/myCenter/orderInfo/orderInfo',
              });
              
            }
          }
        },
        function(err){

        }
      )
            
    },
    //查询聊天记录
    setchatList(that){
      var order_id = that.props.order_id;
      console.log(order_id)
      //请求
      var url  = 'consult/getMessageRecord'
      var prams = {
        order_id
      }
      http.postRequest(url,prams,
        function(res){
          if(res.errcode===0&&res.data.record.length>0){
            for(var i=0;i<res.data.record.length;i++){
              res.data.record[i].value = 0;
            }
          }
          var action =actionCreators.chatListInfo(res.data.record);
            dispatch(action);
          var actionCounts = actionCreators.setCounts(res.data.counts);
            dispatch(actionCounts);
        },
        function(err){

        }
      )
    },
    //发送消息
    sendMessage(content,type,time,that){
      var data = {}
      // data.order_id ='200901173355515415';
      data.order_id =that.props.order_id;
      data.identity = '1';
      data.content = content;
      data.type = type;
      data.time = time;
      data.value=0;
      console.log(data)
      websocket.sendMsg(data,function(res){
        console.log(res);
      })
      var value = ''
      var action = actionCreators.inputValueInfo(value);
      dispatch(action);
      var chatList=that.props.chatList.toJS();
      chatList.push(data)
      var action =actionCreators.chatListInfo(chatList);
      dispatch(action);
       var btnState = true;
       that.setState(()=>({
        btnState:btnState
      }))
      //发送消息后改变滚动条位置
      var stsop = that.state.stsop;
      setTimeout(() => {
        that.setState({
            stsop:stsop + 1
        })
      }, 300);
    },
    //存储input输入内容
    getValue(e){
      //拿不到e
      const value = e.target.value
      var btnState
      if(value.length>0){
        btnState = false
      }else{
        btnState = true
      }
      this.setState(()=>({
        btnState:btnState
      }))
      var action = actionCreators.inputValueInfo(value);
      dispatch(action);
    },
    //接收到消息修改数据类型
    setList(that,websocketMessage){
      if(websocketMessage!=='成功'){
        var websocketMessages = JSON.parse(websocketMessage);
        if(websocketMessages.type==='4'){
              var actionCounts = actionCreators.setCounts(websocketMessages.counts);
              dispatch(actionCounts);
        }else if(websocketMessages.type==='5'){
          var actionOrderCode = actionCreators.setOrderCode(40);
              dispatch(actionOrderCode);
        }else{
          if(websocketMessages.order_id===that.props.order_id){
              var list = that.props.chatList.toJS();
              list.push(websocketMessages);
              var action = actionCreators.chatListInfo(list);
              dispatch(action);
              var stsop = that.state.stsop;
              setTimeout(() => {
                that.setState({
                    stsop:stsop + 1
                })
              }, 300);
            }
        }
      }
        
      
        
    },
    // 连接成功改变连接状态
    updateWebsocket(type){
     var action = actionCreatorsWebsocket.setWebsocketState(type);
     dispatch(action);
    },
    // 开始播放
    statePay(item){
      var list = this.props.chatList.toJS();
      if(item.value===0){
        for(var i =0;i<list.length;i++){
          if(list[i].content===item.content){
            list[i].value=1;
          }else{
            list[i].value=0;
          }
        }
        
      }
      var action =actionCreators.chatListInfo(list);
      dispatch(action);
      console.log(list)
      this.props.handlePlayVoice(item,this)
    },
    
    //播放录音
    handlePlayVoice(item,that){
      //判断销毁上一次实例
      if(that.state.voicePlayer!=''){
        that.state.voicePlayer.destroy()
      }
      var voicePlayer = Taro.createInnerAudioContext()
        that.setState({
          voicePlayer
        })
      if(item.value===0){
        var list = that.props.chatList.toJS();
        let voice = item.content;
        that.state.voicePlayer.obeyMuteSwitch  = false,
        that.state.voicePlayer.autoplay = true
        that.state.voicePlayer.src = voice,
        that.state.voicePlayer.onPlay(() => {
          console.log('开始播放');
        })
        that.state.voicePlayer.onEnded(() => {
          for(var i =0;i<list.length;i++){
            if(list[i].content===item.content){
              list[i].value=0;
            }
          }
          console.log(list)
          var action =actionCreators.chatListInfo(list);
          dispatch(action);
          that.state.voicePlayer.destroy();
        })
        
        that.state.voicePlayer.onError((res) => {
          for(var i =0;i<list.length;i++){
            if(list[i].content===item.content){
              list[i].value=0;
            }
          }
          console.log(list)
          var action =actionCreators.chatListInfo(list);
          dispatch(action);
          that.state.voicePlayer.destroy()
        })
      }else{

       
      }
      
    }
  }
}
export default connect(mapStateTopProps,mapDispatchToProps)(DialogueBox)