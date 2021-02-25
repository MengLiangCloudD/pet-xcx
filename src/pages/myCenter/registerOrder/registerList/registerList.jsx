import React, { Component } from 'react'
import { View, Text,Image,ScrollView } from '@tarojs/components'
import './registerList.scss'
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import * as imager from './../../assager';
import * as actionCreators from './store/actionCreators';
import * as actionCreatorsPayment from './../../../paymentOrder/store/actionCreators';
import http from '../../../../utils/http';
class RegisterList extends Component {
    constructor(props){
        super(props);
        this.state = {
            header:'我的挂号',
            //选中的是哪个
            selectType: 0,
            //总页数
            allYear: 0,
            //默认第一页
            offset: 1,
            //一页默认十条
            limit: 10,
            isOpened:false,
            orderId:''
        }
    }
    //返回个人中心
    getback() {
      Taro.switchTab({
        url: '/pages/index/myCenter/myCenter',
      });
    }
    componentDidMount(){
        var offset = 1;
        var selectType = 0;
        this.setState(() => ({
          offset: offset,
          selectType: selectType
        }), () => {
            this.props.getOrderList(this);
        })
    }
    //上划加载
    onScrolltoupper(e) {
        var offset = this.state.offset;

        if (offset < this.state.allYear) {
        offset += 1
        this.setState(() => ({
            offset: offset
        }), () => {
            this.props.getOrderList(this,0)
        })

        } else {

        }

    }
    //列表信息
    itemView(list){
        const config = require('./../../../../utils/config');
        return (
            list.length>0?
            list.map((item,index)=>{
                return (
                    <View className="content_item" key={index}>
                          <View className="content_item_title">
                               <View className="title_text">
                                   预约挂号
                               </View>
                               {
                                   item.order_code===10
                                   ?<View className="code">
                                        待支付
                                    </View>
                                    :item.order_code===20
                                    ?<View className="code">
                                        待就诊
                                    </View>
                                    :item.order_code===30
                                    ?<View className="code">
                                        已就诊
                                    </View>
                                    :<View className="code">
                                        已取消
                                    </View>
                               }
                          </View>
                          <View className='item_content'>
                              <View className="order_time">
                                  <Text className="time_key">订&nbsp;&nbsp;单&nbsp;&nbsp;号</Text>
                                  <Text className="time_value">{item.order_id}</Text>
                              </View>
                              <View className="seeing_time">
                                  <Text className="seeing_key">主人姓名</Text>
                                  <Text className="seeing_value">{item.user_name}</Text>
                              </View>
                              <View className="seeing_time">
                                  <Text className="seeing_key">宠物名称</Text>
                                  <Text className="seeing_value">{item.pet_name}</Text>
                              </View>
                              <View className="seeing_time">
                                  <Text className="seeing_key">就诊卡号</Text>
                                  <Text className="seeing_value">{item.card_no}</Text>
                              </View>
                              <View className="seeing_time">
                                  <Text className="seeing_key">就诊时间</Text>
                                  <Text className="seeing_value">{item.visit_date}</Text>
                              </View>
                              <View className="seeing_time">
                                  <Text className="seeing_key">宠物品种</Text>
                                  <Text className="seeing_value">{item.charge_type}</Text>
                              </View>
                          </View>
                            {
                                item.order_code===10
                                ?<View className="item_bottom">
                                    <View className="item_btn" onClick={this.modelTrue.bind(this,item.order_id)}>
                                        取消订单
                                    </View>
                                    <View className="goPay" onClick={this.props.gouPayment.bind(this, item.order_id, item.total_fee, 3,item.card_no)}>
                                        去支付
                                    </View>
                                </View>
                                :item.order_code===20
                                ?<View className="item_bottom">
                                    <View className="item_btn" onClick={this.modelTrue.bind(this,item.order_id)}>
                                        取消订单
                                    </View>
                                </View>
                                :item.order_code===30
                                ?<View className="item_bottom">
                                    {/* <View className="goPay" >
                                        评价
                                    </View> */}
                                </View>
                                :<View className="item_bottom">

                                </View>
                            
                            }
                      </View>
                )
            }):<View className="que">
                <Image  mode="widthFix" className="que" src={config.imgUrl+'noContent.png'}/>
            </View>
        )
    }
    handleCancel(){
        this.setState({isOpened:false})
    }
    handleConfirm(){
        this.setState({isOpened:false})
        this.props.delateOrder(this,this.state.orderId)
    }
    //弹出层
    modelTrue(orderId){
        this.setState({isOpened:true,orderId:orderId})
    }
    render(){
        var style = {
            height:'calc(100% -  40px - 85rpx - 18.66667rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
          }
            var { regOrderList } = this.props;
            var list = regOrderList.toJS();
        return (
            <View className="components-page">
                {/* 弹出层 */}
                {
                    this.state.isOpened?
                    <View className="zhezhao">
                        <View className="module">
                            <View className="consstent">
                                您确认取消订单吗！
                            </View>
                            <View className="botdtom">
                                <View className="btn_mod" onClick={this.handleCancel.bind(this)}>取消</View> <View className="btn_mod"  onClick={this.handleConfirm.bind(this)}>确定</View>
                            </View>
                        </View>
                    </View>:''
                }
                <View className="title">
                    <Hearder titleText={this.state.header} goback={true} toback={this.getback} background={true}></Hearder>
                    <View className="nav">
                        <View className="nav_list">
                        <View className="nav_item" onClick={this.props.updateClick.bind(this, 0)}>
                            <View className={this.state.selectType === 0 ? "item_text" : 'text_item'}>
                            全部
                                    </View>
                            <View className={this.state.selectType === 0 ? "item_border" : ''}></View>
                        </View>
                        <View className="nav_item" onClick={this.props.updateClick.bind(this, 1)}>
                            <View className={this.state.selectType === 1 ? "item_text" : 'text_item'}>
                            待付款
                                    </View>
                            <View className={this.state.selectType === 1 ? "item_border" : ''}></View>
                        </View>
                        <View className="nav_item" onClick={this.props.updateClick.bind(this, 2)}>
                            <View className={this.state.selectType === 2 ? "item_text" : 'text_item'}>
                            待就诊
                                    </View>
                            <View className={this.state.selectType === 2 ? "item_border" : ''}></View>
                        </View>
                        <View className="nav_item" onClick={this.props.updateClick.bind(this, 3)}>
                            <View className={this.state.selectType === 3 ? "item_text" : 'text_item'}>
                            已就诊
                                    </View>
                            <View className={this.state.selectType === 3 ? "item_border" : ''}></View>
                        </View>
                        <View className="nav_item" onClick={this.props.updateClick.bind(this, 4)}>
                            <View className={this.state.selectType === 4 ? "item_text" : 'text_item'} >
                            已取消
                                    </View>
                            <View className={this.state.selectType === 4 ? "item_border" : ''}></View>
                        </View>
                        </View>
                    </View>
                </View>
                <ScrollView className='content'
                    scrollY
                    scrollWithAnimation
                    scrollTop={0}
                    style={style}
                    lowerThreshold="100"
                    onScrolltolower={this.onScrolltoupper.bind(this)}>
                      {this.itemView(list)}
                </ScrollView>
            </View>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        regOrderList:state.getIn(["registerList","regOrderList"])
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    return {
        //查询订单列表
        getOrderList(that,type1){
            var url = "register/queryUserRegisterOrders";
            var limit = that.state.limit;
            var offset = that.state.offset;
            var type = that.state.selectType;
            var prams = {
                limit,
                offset,
                type
            }
            http.postRequest(url,prams,
                function(res){
                    if(res.errcode===0){
                        var allTiao = res.data.total;
                        var allYear
                        if (allTiao / 10 <= 1) {
                            allYear = 1
                        } else {
                            allYear = parseInt(allTiao / 10) + 1
                        }
                        that.setState({
                            allYear: allYear
                        })
                        if(type1===0){
                            var content = res.data.content;
                            var orderList = that.props.regOrderList.toJS();
                            for (var i = 0; i < content.length; i++) {
                              orderList.push(content[i]);
                            }
                        }else{
                            var orderList=res.data.content;
                        }
                        var action = actionCreators.setRegOrderList(orderList);
                        dispatch(action)

                    }
                },
                function(err){

                }
            )
        },
        // 切换订单类型
      updateClick(type) {
        var offset = 1;
        this.setState(() => ({
          offset: offset,
          selectType: type
        }), () => {
          //切换类型首先初始化清空数据
          var orderAction = actionCreators.setRegOrderList([])
          dispatch(orderAction);
          this.props.getOrderList(this)
        })
      },
      //去支付
      gouPayment(order_id, price, type,card_no) {
        var typeAction = actionCreatorsPayment.getType(type);
        var priceAction = actionCreatorsPayment.getPrice(price);
        var orderNoAction = actionCreatorsPayment.getorderNo(order_id);
        var cardNoAction = actionCreatorsPayment.getCardNumber(card_no);
        dispatch(cardNoAction);
        dispatch(typeAction);
        dispatch(priceAction);
        dispatch(orderNoAction);
        Taro.navigateTo({
          url: '/pages/paymentOrder/paymentOrder',
        });
      },
      //取消订单
      delateOrder(that,order_id){
        var url = 'register/registerCancel';
        var prams = {
          order_id
        }
        
        http.postRequest(url,prams,
          function(res){
            if(res.errcode==0){
              var list = that.props.regOrderList.toJS();
              for (var i = 0; i < list.length; i++) {
                if (list[i].order_id === order_id) {
                  list[i].order_code = res.data;
                }
              }
              var orderAction = actionCreators.setRegOrderList(list)
              dispatch(orderAction);
            }else{
                Taro.showToast({
                    title:res.errmsg,
                     icon:'none',
                     duration:1000
                  })
            }
          },
          function(err){
            console.log(err)
          }
        )
      },
    }
  }
  export default connect(mapStateTopProps,mapDispatchToProps)(RegisterList)