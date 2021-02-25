import React, { Component } from 'react'
import { View, Text,ScrollView,Image  } from '@tarojs/components'
import './consultOrder.scss'
import {connect} from 'react-redux';
import Hearder from './../../../../commen/header/header';
import http from './../../../../utils/http';
import * as actionCreators from './store/actionCreators';
//去支付的redux
import * as actionCreatorsPayment from './../../../paymentOrder/store/actionCreators';
//对话框的redux
import * as actionCreatorsDialogueBox from './../dialogueBox/store/actionCreators';
//Websocke的redux
import * as actionCreatorsWebsocket from './../store/actionCreators'
import websocket from './../../../../websocket/websocket';
import Taro from '@tarojs/taro'
class ConsultOrder extends Component {
  constructor(props){
      super(props)
      this.state = {
        header:'我的咨询',
        //选中的是哪个
        selectType:0,
        //总页数
        allYear:0,
        //默认第一页
        offset:1,
        //一页默认十条
        limit:10,
      }
  }

  componentWillMount () {
    
      
  }

  componentDidMount () { 
      this.props.selectConsultOrderList(this,0)
      websocket.shili(this)
      if(this.props.websocketState===0){
        websocket.ws_connect('1');
      }
  }

  componentWillUnmount () { }

  componentDidShow () { }
  componentDidHide () { }
  //返回个人中心
  getback(){
    Taro.switchTab({
        url: '/pages/index/myCenter/myCenter',
    });
  }
  
  //上划加载
  onScrolltoupper(e){
    var offset = this.state.offset;
    if(offset < this.state.allYear){
      offset+=1
      this.setState(()=>({
        offset:offset
      }),()=>{
        this.props.selectConsultOrderList(this)
      })
      
    }else{

    }
  }
  //列表信息
  itemModule(){
    var { consultOrderList } = this.props;
    var list = consultOrderList.toJS();
    const config = require('./../../../../utils/config');
    return (
        list.length>0?
        list.map((item,index)=>{
            return (
                <View className="item_content" key={index}>
                    <View className="item_title">
                        <View className="item_name">
                             王医生
                        </View>
                        {
                          item.order_code===0
                          ?<View className="item_code">
                            已取消
                          </View>
                          :item.order_code===10
                          ?<View className="item_code">
                            未支付
                          </View>
                          :item.order_code===20
                          ?<View className="item_code">
                            待接诊
                          </View>
                          :item.order_code===30
                          ?<View className="item_code">
                            正在问诊
                          </View>
                          :item.order_code===40
                          ?<View className="item_code">
                            已完成
                          </View>
                          :<View className="item_code">
                            已退款
                          </View>
                        }
                        
                    </View>
                    <View className="item_center">
                        <View className="item_info">
                            <Text className="info_name">小狗</Text>
                            <Text className="info_code">123456789</Text>
                        </View>
                        <View className="item_time">
                            {item.created_at}
                        </View>
                    </View>
                    {
                      item.order_code===0
                      ?<View className="item_bottom">
                          {/* <View className="item_btn">
                              删除订单
                          </View> */}
                      </View>
                      :item.order_code===10
                      ?<View className="item_bottom">
                          <View className="item_btn" onClick={this.props.delateOrder.bind(this,item.order_id)}>
                              取消订单
                          </View>
                          <View className="goPay" onClick={this.props.gouPayment.bind(this, item.order_id, item.sum_price, 1)}>
                              去支付
                          </View>
                      </View>
                      :item.order_code===20
                      ?<View className="item_bottom">
                          <View className="goPay" onClick={this.props.goHome.bind(this,item.order_id,item.order_code)} style="margin-right:10px;">
                              进入对话
                          </View>
                          <View className="item_btn" onClick={this.props.delateOrder.bind(this,item.order_id)}>
                              取消订单
                          </View>
                      </View>
                      :item.order_code===30
                      ?<View className="item_bottom">
                          <View className="goPay" onClick={this.props.goHome.bind(this,item.order_id,item.order_code)}>
                              回到对话
                          </View>
                      </View>
                      :item.order_code===40
                      ?<View className="item_bottom">
                        <View className="goPay" onClick={this.props.goHome.bind(this,item.order_id,item.order_code)} style="margin-right:10px;">
                              查看对话
                          </View>
                          {/* <View className="item_btn">
                              删除订单
                          </View> */}
                      </View>
                      :<View className="item_bottom">
                          {/* <View className="item_btn">
                              删除订单
                          </View> */}
                      </View>
                      
                    }
                </View>
            )
        }):<View className="que">
            <Image  mode="widthFix" className="que" src={config.imgUrl+'noContent.png'}/>
        </View>
    )
        
  }
  render () {
    var { consultOrderList } = this.props;
    var list = consultOrderList.toJS();
    return (
      <View className='components-page'>
          <View className="title">
              <Hearder titleText={this.state.header} goback={true} toback={this.getback} background={true}></Hearder>
              <View className="nav">
                  <View className="nav_list">
                      <View className="nav_item"  onClick={this.props.updateClick.bind(this,0)}>
                          <View className={this.state.selectType===0?"item_text":'text_item'}>
                            全部
                          </View>
                          <View className={this.state.selectType===0?"item_border":''}></View>
                      </View>
                      {/* <View className="nav_item" onClick={this.props.updateClick.bind(this,1)}>
                          <View className={this.state.selectType===1?"item_text":'text_item'}>
                            未支付
                          </View>
                          <View className={this.state.selectType===1?"item_border":''}></View>
                      </View> */}
                      <View className="nav_item" onClick={this.props.updateClick.bind(this,2)}>
                          <View className={this.state.selectType===2?"item_text":'text_item'}>
                            待接诊
                          </View>
                          <View className={this.state.selectType===2?"item_border":''}></View>
                      </View>
                      <View className="nav_item" onClick={this.props.updateClick.bind(this,3)}>
                          <View className={this.state.selectType===3?"item_text":'text_item'}>
                            进行中
                          </View>
                          <View className={this.state.selectType===3?"item_border":''}></View>
                      </View>
                      <View className="nav_item" onClick={this.props.updateClick.bind(this,4)}>
                          <View className={this.state.selectType===4?"item_text":'text_item'}>
                            已完成
                          </View>
                          <View className={this.state.selectType===4?"item_border":''}></View>
                      </View>
                  </View>
              </View>
          </View>
          <View className='content'>
          <ScrollView className='scrollview'
            scrollY
            scrollWithAnimation
            scrollTop={0}
            lowerThreshold="100"
            onScrolltolower ={this.onScrolltoupper.bind(this)}>
                {this.itemModule()}
            </ScrollView>
          </View>
      </View>
    )
  }
}
const mapStateTopProps = (state)=>{
    return {
      //咨询订单列表
      consultOrderList:state.getIn(['consultOrder','consultOrderList']),
      //websocket链接状态
      websocketState:state.getIn(['websocketState','websocketState']),
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    return {
        //查询订单列表
        selectConsultOrderList(that,type){
            if(type===0){
              var orderAction = actionCreators.setConsultOrderList([])
              dispatch(orderAction);
            }
            
            var url = 'consult/queryUserOrders';
            var limit = that.state.limit;
            var offset = that.state.offset;
            var type = that.state.selectType;
            var prams = {
                limit,
                type,
                offset
            }
            http.postRequest(url,prams,
                function(res){
                  if(res.errcode==0){
                    var allTiao= res.data.total;
                    var allYear
                    if(allTiao / 10 <= 1){
                        allYear=1
                    }else{
                        allYear= parseInt(allTiao / 10) + 1 
                    }
                    that.setState({
                        allYear:allYear
                    })
                    var  content = res.data.content;
                    var consultOrderList = that.props.consultOrderList.toJS();
                    for(var i = 0; i < content.length;i++){
                      consultOrderList.push(content[i]);
                    }
                    var orderAction = actionCreators.setConsultOrderList(consultOrderList)
                    dispatch(orderAction);
                  }
                  
                },
                function(err){
                  console.log(err)
                }
              )
        },
        //取消订单
        delateOrder(order_id){
          var that = this;
          var url = 'consult/cancelOrder';
          var prams = {
            order_id
          }
          
          http.postRequest(url,prams,
            function(res){
              if(res.errcode==0){
                var list = that.props.consultOrderList.toJS();
                for (var i = 0; i < list.length; i++) {
                  if (list[i].order_id === order_id) {
                    list[i].order_code = res.data;
                  }
                }
                var orderAction = actionCreators.setConsultOrderList(list)
                dispatch(orderAction);
              }
            },
            function(err){
              console.log(err)
            }
          )
        },
        // 切换订单类型
        updateClick(type){
          var offset = 1;
          this.setState(()=>({
              selectType:type,
              //默认第一页
              offset:offset,
          }),()=>{
            // 切换类型首先初始化清空数据
            var orderAction = actionCreators.setConsultOrderList([])
            dispatch(orderAction);
            this.props.selectConsultOrderList(this)
          })
        },
        //去支付
        gouPayment(order_id, price, type) {
          var typeAction = actionCreatorsPayment.getType(type);
          var priceAction = actionCreatorsPayment.getPrice(price);
          var orderNoAction = actionCreatorsPayment.getorderNo(order_id);
          dispatch(typeAction);
          dispatch(priceAction);
          dispatch(orderNoAction);
          Taro.navigateTo({
            url: '/pages/paymentOrder/paymentOrder',
          });
          
        },
        //接收到消息修改数据
        setList(that,websocketMessage){
          var websocketMessages = JSON.parse(websocketMessage)
          var list = that.props.consultOrderList.toJS();
          for(var i = 0;i<list.length;i++){
            if(websocketMessages.order_id===list[i].order_id){
              list[i].if_unread = 1;
            }
          }
          var orderAction = actionCreators.setConsultOrderList(list)
          dispatch(orderAction);
        },
        //点击进入对话框
        goHome(order_id,order_code){
         var orderAction =  actionCreatorsDialogueBox.setOrderNo(order_id);
         dispatch(orderAction)
         var orderCodeAction =  actionCreatorsDialogueBox.setOrderCode(order_code);
         dispatch(orderCodeAction)
          Taro.navigateTo({
             url: '/pages/home/consult/dialogueBox/dialogueBox',
          });
          
        },
        // 连接成功改变连接状态
        updateWebsocket(type){
          var action= actionCreatorsWebsocket.setWebsocketState(type);
          dispatch(action);
          
        }
    }
  }
  export default connect(mapStateTopProps,mapDispatchToProps)(ConsultOrder)