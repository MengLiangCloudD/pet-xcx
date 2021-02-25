import React,{ Component,Fragment } from 'react';
import './vaccinOrderList.scss'
import { View, Text,ScrollView,Image } from '@tarojs/components';
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import http from './../../../../utils/http';
import * as actionCreators from './store/actionCreators';
import * as vaccinOrderInfoActionCreators from './../vaccinOrderInfo/store/actionCreators';
import * as actionCreatorsPayment from './../../../paymentOrder/store/actionCreators';
class VaccinOrderList extends Component{
    constructor(props){
        super(props);
        this.state={
            header:"疫苗订单",
            isOpened:false,
            orderId:''
        }
    }
    getback(){
        Taro.switchTab({
            url: '/pages/index/myCenter/myCenter',
          });
    }
    componentDidMount(){
        this.props.selectVaccionOrder(this)
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
            height:'calc(100% -  40px - 14.66667rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
         }
         const vaccinOrderList = this.props.vaccinOrderList.toJS();
         const config = require('./../../../../utils/config');
        return (
            <Fragment>
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
                    <Hearder titleText={this.state.header} goback={true} background={true} toback={this.getback}></Hearder>
                </View>
                <ScrollView className="content" style={style}
                scrollY
                scrollWithAnimation
                scrollTop={0}>
                    {
                        vaccinOrderList.length>0?
                        vaccinOrderList.map((item,index)=>{
                            return (
                                <View className="content_item" key={index}>
                                    <View className="content_item_title">
                                        <View className="title_text">
                                            疫苗
                                        </View>
                                        {
                                            item.order_code===10
                                            ?<View className="code">
                                                待支付
                                            </View>
                                            :item.order_code===20
                                            ?<View className="code">
                                                已支付
                                            </View>
                                            :item.order_code===30
                                            ?<View className="code">
                                                已完成
                                            </View>
                                            :<View className="code">
                                                已取消
                                            </View>
                                        }
                                        
                                    </View>
                                    <View className='item_content'>
                                        <View className="order_time">
                                            <Text className="time_key">疫苗名称：</Text>
                                            <Text className="time_value">{item.drug_name}</Text>
                                        </View>
                                        <View className="seeing_time">
                                            <Text className="seeing_key">预约日期：</Text>
                                            <Text className="seeing_value">{item.app_date}</Text>
                                        </View>
                                        <View className="seeing_time">
                                            <Text className="seeing_key">合计金额：</Text>
                                            <Text className="seeing_value">￥{item.sum_price}</Text>
                                        </View>
                                    </View>
                                        <View className="item_bottom">
                                            {
                                                item.order_code===10
                                                ?
                                                <View className="item_bottom">
                                                    <View className="item_btn" onClick={this.modelTrue.bind(this,item.order_id)}>
                                                        取消订单
                                                    </View>
                                                    <View className="goPay" onClick={this.props.gouPayment.bind(this, item.order_id, item.sum_price, 3,item.card_no)}>
                                                        去支付
                                                    </View>
                                                </View>
                                                :item.order_code===20
                                                ?<View className="item_bottom">
                                                    <View className="item_btn" onClick={this.modelTrue.bind(this,item.order_id)}>
                                                        取消订单
                                                    </View>
                                                    <View className="goPay" onClick={this.props.goVaccinOrderInfo.bind(this,item)}>
                                                        查看详情
                                                    </View>
                                                </View>
                                                :''
                                                
                                            }
                                            
                                        </View>
                                </View>
                            )
                        }):<View className="que">
                            <Image  mode="widthFix" className="que" src={config.imgUrl+'noContent.png'}/>
                        </View>
                    }
                                
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        vaccinOrderList:state.getIn(["vaccinOrderList","vaccinOrderList"])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        //查询疫苗订单列表
        selectVaccionOrder(that){
            var url = 'queryVaccinesOrderList';
             var prams = {
                 
            }
            http.postRequest(url, prams,
              function (res) {
                if (res.errcode == 0) {
                    var list = res.data;
                  var action = actionCreators.setVaccinOrderList(list);
                  dispatch(action)
                }
              },
              function (err) {
                console.log(err)
              }
            )
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
        // 详情
        goVaccinOrderInfo(item){
            var action = vaccinOrderInfoActionCreators.setVaccinOrderId(item.order_id);
              dispatch(action)
              Taro.navigateTo({
                url: '/pages/myCenter/vaccinOrder/vaccinOrderInfo/vaccinOrderInfo',
              })
        },
        //取消订单
        delateOrder(that,order_id){
            var url = 'cancelVaccinesOrder';
            var prams = {
                order_id
            }
            http.postRequest(url,prams,
                function(res){
                    if(res.errcode==0){
                    var list = that.props.vaccinOrderList.toJS();
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].order_id === order_id) {
                        list[i].order_code =0;
                        }
                    }
                    var orderAction = actionCreators.setVaccinOrderList(list)
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
        }
    }
}
export default connect(mapStateTopProps,mapDispatchToProps)(VaccinOrderList);