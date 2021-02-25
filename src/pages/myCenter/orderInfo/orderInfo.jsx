import React, { Component } from 'react'
import { View, Text,Image,Button } from '@tarojs/components'
import './orderInfo.scss'
import { clickPublic } from './../../../commen/publiClick';
import Hearder from './../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import * as imager from './../assager';
import http from './../../../utils/http';
import * as actionCreators from './store/actionCreators';
import * as actionCreatorsPayment from '../../paymentOrder/store/actionCreators';
class OrderInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            header:'订单详情页',
            isOpened:false,
            orderId:''
        }
    }
    componentDidMount(){
        this.props.selectOrderInfo(this)
    }
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    handleCancel(){
        this.setState({isOpened:false})
    }
    handleConfirm(){
        this.setState({isOpened:false})
        this.props.updateOrder(this,this.state.orderId)
    }
    //弹出层
    modelTrue(orderId){
        this.setState({isOpened:true,orderId:orderId})
    }
    render(){
        const {orderInfo} = this.props;
        var infoOrder = orderInfo.toJS()
        var style = {
            height:'calc(100% -  100px - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
          }
          const config = require('./../../../utils/config');
        return (
            <View className="components-page">
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
                <Hearder titleText={this.state.header} goback={true} toback={this.getback} ></Hearder>
                <View className="content" style={style}>
                    <View className="nav_first">
                        <View className="first_title">
                            <Image className="order" src={imager.order}/>
                            <View className="first_text">
                                订单信息
                            </View>
                        </View>
                        {
                            infoOrder.order_code===8?
                            <View className="first_item">
                            <Text className="state_item">订单状态：</Text>申请退款中
                            </View>
                            : infoOrder.order_code===20
                            ?<View className="first_item">
                            <Text className="state_item">订单状态：</Text>待收货
                            </View>
                            :infoOrder.order_code===30
                            ?<View className="first_item">
                            <Text className="state_item">订单状态：</Text>待收货
                            </View>
                            :infoOrder.order_code===40
                            ?<View className="first_item">
                            <Text className="state_item">订单状态：</Text>待收货
                            </View>
                            :infoOrder.order_code===50
                            ?<View className="first_item">
                            <Text className="state_item">订单状态：</Text>订单完成
                            </View>
                            :infoOrder.order_code===7
                            ?<View className="first_item">
                            <Text className="state_item">订单状态：</Text>订单取消
                            </View>
                            :<View className="first_item">
                            <Text className="state_item">订单状态：</Text>待付款
                            </View>
                        }
                        <View className="first_item">
                            <Text className="state_item">订单编号：{infoOrder.order_id}</Text>
                        </View>
                        <View className="first_item first_item1">
                            <Text className="state_item">创建时间：{infoOrder.created_at}</Text>
                        </View>
                    </View>
                    <View className="nav_two">
                        <View className="two_title">
                            <Image className="dizhi" src={config.imgUrl+'dizhi%402x.png'}/>
                            <View className="two_text">
                                收货地址
                            </View>
                            {infoOrder.order_code===10?<Image className="gengduo" src={config.imgUrl+"fanhui%402x.png"}/>:''}
                        </View>
                        <View className="two_content">
                            <Text className="tow_name">Milly Diaz</Text>
                            <Text className="tow_number">123456789</Text>
                        </View>
                        <View className="didian">北京市朝阳区建外ssho 6——102</View>
                        {infoOrder.order_code===10?<View className="dizhi_bottom">
                            收货不方便时，可选择暂存服务
                        </View>:''}
                        
                    </View>
                    <View className="shoop">
                        <View className="shoop_title">
                            <Image className="shoop_img" src={config.imgUrl+'tianmaot%402x.png'}/>
                            <View className="shoop_text">
                                商品
                            </View>
                        </View>
                        {
                            infoOrder.subOrderList.map((item,index)=>{
                                return (
                                    <View className="shoop_content" key={index}>
                                        <View className="shooping_img">
                                            <Image  mode="widthFix" className="imager" src={item.pro_main_photo} />
                                        </View>
                                        <View className="shoop_info">
                                            <View className="shoop_info_left">
                                                <View className="shoopName">{item.drug_name}</View>
                                                <View className="freight">
                                                    <Text>运费：</Text>
                                                    {
                                                        infoOrder.pro_freight_sum>0?<Text>{infoOrder.pro_freight_sum}</Text>:<Text>包邮</Text>
                                                    }
                                                    
                                                </View>
                                                <View className="shoop_type">
                                                    <Text>类别：</Text>
                                                    <Text>{item.sku_name}</Text>
                                                </View>
                                                <View className="shoop_number">
                                                    购买数量
                                                </View>
                                            </View>
                                            <View className="shoop_info_right">
                                                <View className="danjia">
                                                    ￥{item.pro_platform}
                                                </View>
                                                <View className="numbre">
                                                    {item.goods_counts}
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                            
                                    
                        <View className="jinePrice">
                            <Image className="shoop_img" src={config.imgUrl+'dkw_jine%402x.png'}/>
                            <View className="shoop_text">
                                金额
                            </View>
                            <View className="jin_list">
                                <View className="shoop_zong_jin">
                                    <Text>商品金额：</Text>
                                    <Text>￥{infoOrder.pro_platform_sum}</Text>
                                </View>
                                <View className="jifen">
                                    <Text>积分抵扣：</Text>
                                    <Text>￥-{infoOrder.integral}</Text>
                                </View>
                                <View className="yunfei">
                                    <Text>运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费：</Text>
                                    {
                                       infoOrder.pro_freight_sum>0?<Text>{infoOrder.pro_freight_sum}</Text>:<Text>包邮</Text>
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="shoop_zongji_bottom">
                        共2件&nbsp;&nbsp;&nbsp;合计：￥{infoOrder.totle_sum}
                    </View>
                </View>
                    {
                        infoOrder.order_code===10
                        ?<View className="bottom">
                            <View className="btnAll">
                                <View className="closes" onClick={this.modelTrue.bind(this,infoOrder.order_id)}>取消订单</View> 
                                <View className="zhifBtn" onClick={this.props.gouPayment.bind(this,infoOrder.order_id,infoOrder.totle_sum,2)}>立即支付</View>
                            </View>
                        </View>
                        :infoOrder.order_code===20
                        ?<View className="bottom">
                            <View className="update_dizhi" onClick={this.modelTrue.bind(this,infoOrder.order_id)}>取消订单</View>
                        </View>
                        :infoOrder.order_code===30
                        ?''
                        :infoOrder.order_code===40
                        ?<View className="bottom">
                            <View className="bottoner"  onClick={this.props.confirmOrder.bind(this,infoOrder.order_id)}>确认收货</View>
                        </View>
                        :infoOrder.order_code===8
                        ?<View className="bottom">
                            {/* <View className="update_dizhi">取消申请</View> */}
                        </View>
                        :infoOrder.order_code===7
                        ?<View className="bottom">
                            {/* <View className="update_dizhi">删除订单</View> */}
                        </View>
                        :<View className="bottom">
                            {/* <View className="update_dizhi">删除订单</View> */}
                        </View>
                    }
            </View>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        //订单详情
        orderInfo:state.getIn(['orderInfo','orderInfo']),
        //订单编号
        order_id:state.getIn(['orderInfo','order_id'])
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    return {
        //查询订单详情
        selectOrderInfo(that){
            var url = 'mallOrder/orderDetail';
            var prams = {
                order_id:that.props.order_id
            }
            http.postRequest(url,prams,
                function(res){
                    if(res.errcode===0){
                        var orderInfoAction = actionCreators.setorderInfo(res.data);
                        dispatch(orderInfoAction)
                    }
                },
                function(err){

                }
            )
        },
        //取消订单
        updateOrder(that,order_id){
            var url = 'mallOrder/cancelOrder';
            var prams = {
            order_id:order_id
            }
            http.postRequest(url,prams,
            function(res){
                if(res.errcode==0){
                if(res.data.status==='1'||res.data.status==='2'){
                    if(res.data.status === '1' ){
                        Taro.showToast({
                          title: '操作成功，订单已取消',
                          icon: 'success',
                          duration: 2000
                        })
                      }else if(res.data.status ==='2'){
                        Taro.showToast({
                          title: '操作成功，等待审核',
                          icon: 'success',
                          duration: 2000
                        })
                      }
                    //修改成功改变订单状态
                    var list = that.props.orderInfo.toJS();
                    // for(var i =0;i<list.length;i++){
                    //   if(list[i].order_id===order_id){
                    list.order_code=7;
                    //   }
                    // }
                    var orderAction = actionCreators.setorderInfo(list)
                    dispatch(orderAction);
                }else{
                    Taro.showToast({
                    title: '取消失败',
                    icon: 'none',
                    duration: 2000
                    })
                }
                }
            },
            function(err){
                console.log(err)
            }
            )
        },
        //确认收货
        confirmOrder(order_id){
            var url = 'mallOrder/confirmOrder';
            var prams = {
            order_id:order_id
            }
            http.postRequest(url,prams,
            function(res){
                if(res.errcode==0){
                    Taro.showToast({
                    title: '收货成功',
                    icon: 'success',
                    duration: 2000
                    })
                    //修改成功改变订单状态
                    var list = this.props.orderList.toJS();
                    // for(var i =0;i<list.length;i++){
                    //   if(list[i].order_id===order_id){
                        list[i].order_code=50;
                    //   }
                    // }
                    var orderAction = actionCreators.setorderInfo(list)
                    dispatch(orderAction);
                }
            },
            function(err){
                console.log(err)
            }
            )
        },
        //点击去支付
        gouPayment(order_id,price,type){
            var typeAction = actionCreatorsPayment.getType(type);
            var priceAction = actionCreatorsPayment.getPrice(price);
            var orderNoAction = actionCreatorsPayment.getorderNo(order_id);
            var cardNoAction = actionCreatorsPayment.getCardNumber('');
            dispatch(cardNoAction);
            dispatch(typeAction);
            dispatch(priceAction);
            dispatch(orderNoAction);
            Taro.navigateTo({
            url: '/pages/paymentOrder/paymentOrder',
            });
        },
    }
  }
  export default connect(mapStateTopProps,mapDispatchToProps)(OrderInfo)