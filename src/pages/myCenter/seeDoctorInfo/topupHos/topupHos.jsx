import React, { Component,Fragment } from 'react'
import { View, Text,ScrollView,Image,Input } from '@tarojs/components';
import './topupHos.scss'
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import http from './../../../../utils/http';
import * as actionCreatorsPay from './../../../paymentOrder/store/actionCreators';
class TopupCarder extends Component{
    constructor(props){
        super(props);
        this.state = {
            header:"住院费预缴",
            inputValue:'',
            submitStart:true
        }
    }
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    setInputValue(e){ 
        this.setState({
            inputValue:e.target.value
        })
    }
    render(){
        const InfoMap = this.props.infoMap.toJS();
        return(
            <Fragment>
                <View className="title">
                    <Hearder titleText={this.state.header} goback={true} background={true} toback={this.getback}></Hearder>
                </View>
                <View className="content">
                    <View className="item">
                        <View className="card_no">
                            <Text className="user_title">一卡通卡号：</Text>
                            <Text> {InfoMap.card_no}</Text>
                        </View>
                        <View className="user_name">
                            <Text className="user_title">宠&nbsp;物&nbsp;昵&nbsp;称：</Text>
                            <Text> {InfoMap.name}</Text>
                        </View>
                        <View className="phone_no">
                            <Text className="user_title">宠&nbsp;物&nbsp;笼&nbsp;号：</Text>
                            <Text> {InfoMap.bed_no}</Text>
                        </View>
                    </View>
                    <View className="price_money">
                        <View className="balance">
                            <Text>预交金余额：</Text>
                            <Text>￥{InfoMap.balance}</Text>
                        </View>
                        <View className="inpue_money">
                            <Input type='text' className="inputValue" value={this.state.inputValue} onInput={this.setInputValue.bind(this)} placeholder='请填写充值金额' />
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
        infoMap:state.getIn(["topupHos","infoMap"])
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
                    this.props.topupHosFee(this)
                  })
                
            }
        },
        //充值
        topupHosFee(that){
            var infoMap = that.props.infoMap.toJS();
            var url = 'hospitalization/rechargeHospitalizationMoney';
            var visit_id = infoMap.id;
            var total_fee = that.state.inputValue;
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
                visit_id,
                total_fee
            }
            http.postRequest(url,prams, 
              function(res){
                if(res.errcode===0){
                    var orderNoaction = actionCreatorsPay.getorderNo(res.data);
                    var orderTypeaction = actionCreatorsPay.getType(4);
                    var priceAction = actionCreatorsPay.getPrice(total_fee);
                    var cardNoAction = actionCreatorsPay.getCardNumber(infoMap.card_no);
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
              function(err){
                setTimeout(() => {
                    that.setState({
                        submitStart:true
                    })
                }, 1000);
              }
            )
        }
    }
}
export default connect(mapStateTopProps,mapDispatchToProps)(TopupCarder)