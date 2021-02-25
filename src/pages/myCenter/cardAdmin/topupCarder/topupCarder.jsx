import React, { Component,Fragment } from 'react'
import { View, Text,ScrollView,Image,Input } from '@tarojs/components'
import './topupCarder.scss'
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import http from './../../../../utils/http';
import * as actionCreatorsPay from './../../../paymentOrder/store/actionCreators';
class TopupCarder extends Component{
    constructor(props){
        super(props);
        this.state = {
            header:"一卡通充值",
            total_fee:'',
            submitStart:true
        }
    }
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    changeValue(e){
        this.setState({
            total_fee:e.target.value
        })
    }
    render(){
        const userInfo = this.props.userInfo.toJS();
        return(
            <Fragment>
                <View className="title">
                    <Hearder titleText={this.state.header} goback={true} background={true} toback={this.getback}></Hearder>
                </View>
                <View className="content">
                    <View className="item">
                        <View className="card_no">
                            <Text className="user_title">一卡通卡号：</Text>
                            <Text> {userInfo.card_no}</Text>
                        </View>
                        <View className="user_name">
                            <Text className="user_title">主&nbsp;人&nbsp;姓&nbsp;名：</Text>
                            <Text> {userInfo.user_name}</Text>
                        </View>
                        <View className="phone_no">
                            <Text className="user_title">联&nbsp;系&nbsp;方&nbsp;式：</Text>
                            <Text> {userInfo.phone_number}</Text>
                        </View>
                    </View>
                    <View className="price_money">
                        <View className="balance">
                            <Text>账户余额：</Text>
                            <Text>￥{userInfo.balance}</Text>
                        </View>
                        <View className="inpue_money">
                            <Input type='text' className="inputValue" placeholder='请填写充值数额' onInput={this.changeValue.bind(this)} value={this.state.total_fee}/>
                        </View>
                    </View>
                </View>
                <View className="bottom">
                    <View className="button" onClick={this.props.setOrder.bind(this)}>确认充值</View>
                </View>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        userInfo:state.getIn(["petFile","userInfo"]),
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        //下单校验
        setOrder(){
            if(this.state.submitStart===true){
                this.setState(()=>({
                    submitStart:false
                  }),()=>{
                    this.props.toUpCard(this)
                  })
                
            }
        },
        //提交
        toUpCard(that){
            var url = 'card/rechargeCard';
            var total_fee = that.state.total_fee;
            var userInfo = that.props.userInfo.toJS();
            var card_no = userInfo.card_no;
            if(total_fee === ''){
                that.setState({
                    submitStart:true
                })
                Taro.showToast({
                    title:'请填写充值金额',
                     icon:'none',
                     duration:1000
                })
                return
            }
             var prams = {
                total_fee,
                card_no
            }
            http.postRequest(url, prams,
              function (res) {
                if (res.errcode == 0) {
                    var orderNoaction = actionCreatorsPay.getorderNo(res.data);
                    var orderTypeaction =  actionCreatorsPay.getType(6);
                    var priceAction = actionCreatorsPay.getPrice(total_fee);
                    var cardNoAction = actionCreatorsPay.getCardNumber(card_no);
                    dispatch(cardNoAction);
                    dispatch(orderNoaction);
                    dispatch(orderTypeaction);
                    dispatch(priceAction);
                    Taro.navigateTo({
                        url: '/pages/paymentOrder/paymentOrder'　　
                    })
                }
                setTimeout(() => {
                    that.setState({
                        submitStart:true
                    })
                }, 1000);
                
              },
              function (err) {
                setTimeout(() => {
                    that.setState({
                        submitStart:true
                    })
                }, 1000);
                console.log(err)
              }
            )
        }
    }
}
export default connect(mapStateTopProps,mapDispatchToProps)(TopupCarder)