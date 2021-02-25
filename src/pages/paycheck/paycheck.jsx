import React, { Component } from 'react'
import { View, Text,Image } from '@tarojs/components'
import './paycheck.scss'
import Hearder from './../../commen/header/header';
import { connect } from 'react-redux';
import Taro from '@tarojs/taro';
import { Fragment } from 'react';
import * as actionCreatorsDialogueBox from './../home/consult/dialogueBox/store/actionCreators';
class Paycheck extends Component{
    constructor(props){
        super(props);
        this.state={
            header:'支付完成',
        }
    }
    getback(){
        Taro.switchTab({
            url: '/pages/index/home/index',
        });
    }
    componentDidMount(){
        var that = this;
        setTimeout(() => {
            that.props.goUrl(that);
        }, 2000);
        
    }
    render(){
        const config = require('./../../utils/config');
        return (
            <Fragment>
                <Hearder titleText={this.state.header} background={true} toback={this.getback}></Hearder>
                <View className="content">
                    <Image  mode="widthFix" className="imager" src={config.imgUrl+'payOver.png'}/>
                </View>
            </Fragment>
        ) 
    }
}
const mapStateTopProps = (state)=>{
    return {
      //订单号
      orderNo:state.getIn(['paymentOrder','orderNo']),
      //订单类型
      type:state.getIn(['paymentOrder','type']),
    }
  }
  const mapDispatchToProps=(dispatch)=>{
      return {
        goUrl(that){
            if(that.props.type===1){
                var orderAction =  actionCreatorsDialogueBox.setOrderNo(that.props.orderNo);
                dispatch(orderAction);
                var orderCodeAction =  actionCreatorsDialogueBox.setOrderCode(20);
                dispatch(orderCodeAction)
                Taro.reLaunch({
                  url: '/pages/home/consult/dialogueBox/dialogueBox',
                })
              }else if(that.props.type===2){
                Taro.reLaunch({
                  url: '/pages/myCenter/myShoopOrder/myShoopOrder',
                })
              }else if(that.props.type===3){
                Taro.reLaunch({
                  url: '/pages/myCenter/registerOrder/registerList/registerList',
                })
              }else if(that.props.type===4){
                Taro.navigateBack({
                    delta: 2
                })
              }else if(that.props.type===5){
                Taro.reLaunch({
                  url: '/pages/myCenter/vaccinOrder/vaccinOrderList/vaccinOrderList',
                })
              }else if(that.props.type===6){
                Taro.reLaunch({
                  url: '/pages/myCenter/cardAdmin/cardList/cardList',
                })
              }else if(that.props.type===7){
                Taro.reLaunch({
                  url: '/pages/myCenter/seeDoctorInfo/docTreatment/docTreatment',
                })
              }
        }
      }
  }
  export default connect(mapStateTopProps,mapDispatchToProps)(Paycheck)