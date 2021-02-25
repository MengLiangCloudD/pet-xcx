import React, { Component, Fragment } from 'react'
import { View, Text,Image,ScrollView } from '@tarojs/components'
import './hospitalInfo.scss'
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import * as imager from './../../assager';
import * as actionCreators from './store/actionCreators';
import * as topupHosActionCreators from './../topupHos/store/actionCreators';
import http from '../../../../utils/http';
class HospitalInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            header:'住院详情'
        }
    }
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    componentDidMount(){
        
    }
    //进入页面时判断是否需要授权
    componentDidShow () {
        if(wx.getStorageSync('token')==undefined||wx.getStorageSync('token')==''||wx.getStorageSync('token')==null||wx.getStorageSync('avatar')==undefined||wx.getStorageSync('avatar')==''||wx.getStorageSync('avatar')==null||wx.getStorageSync('nickname')==undefined||wx.getStorageSync('nickname')==''||wx.getStorageSync('nickname')==null){
            Taro.navigateTo({
                url: '/pages/impower/impower'　　
            })
        }else{
            this.props.selectHosInfo(this);
        }
    }
    render(){
        var style = {
            height:'calc(100% -  40px - 18.66667rpx - 166rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
         }
         var style1 = {
            height:'calc(100% -  40px - 18.66667rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
         }
         const HosInfo = this.props.HosInfo.toJS();
        return (
            <Fragment>
                <View className="title">
                    <Hearder titleText={this.state.header} goback={true} toback={this.getback} background={true}></Hearder>
                </View>
                <ScrollView className="content" style={HosInfo.in_flag==='0'?style:style1}
                scrollY
                scrollWithAnimation
                scrollTop={0}>
                    <View className="content_item">
                        <View className="item_title">
                            <View className="item_biao"></View>
                            <View className="item_txt">宠物档案</View>
                        </View>
                        <View className="item_info">
                            <Text>一卡通卡号：</Text>
                            <Text>{HosInfo.card_no}</Text>
                        </View>
                        <View className="item_info">
                            <Text>宠&nbsp;物&nbsp;昵&nbsp;称：</Text>
                            <Text>{HosInfo.name}</Text>
                        </View>
                        <View className="item_info">
                            <Text>宠&nbsp;物&nbsp;品&nbsp;种：</Text>
                            <Text>{HosInfo.charge_type}</Text>
                        </View>
                    </View>
                    <View className="content_item">
                        <View className="item_title">
                            <View className="item_biao"></View>
                            <View className="item_txt">住院信息</View>
                        </View>
                        <View className="item_info">
                            <Text>住院时间：</Text>
                            <Text>{HosInfo.admission_date}</Text>
                        </View>
                        <View className="item_info">
                            <Text>宠物笼号：</Text>
                            <Text>{HosInfo.bed_no}</Text>
                        </View>
                        <View className="item_info">
                            <Text>住院状态：</Text>
                            {
                                HosInfo.in_flag==='0'?<Text>住院中</Text>:<Text>已出院</Text>
                            }
                        </View>
                        <View className="info_bottom">
                            <View className="info_btn" onClick={this.props.goDailyRecord.bind(this)}>
                                每日记录
                            </View>
                        </View>
                    </View>
                    <View className="content_item">
                        <View className="item_title">
                            <View className="item_biao"></View>
                            <View className="item_txt">费用信息</View>
                        </View>
                        <View className="item_info">
                            <Text>预&nbsp;&nbsp;&nbsp;&nbsp;缴&nbsp;&nbsp;&nbsp;&nbsp;金&nbsp;&nbsp;&nbsp;额：</Text>
                            <Text>￥{HosInfo.sum_amount}</Text>
                        </View>
                        {/* <View className="item_info">
                            <Text>2020-07-15预存：</Text>
                            <Text>123456</Text>
                        </View>
                        <View className="item_info">
                            <Text>2020-07-15预存：</Text>
                            <Text>123456</Text>
                        </View> */}
                        <View className="item_info">
                            <Text>当&nbsp;&nbsp;&nbsp;&nbsp;前&nbsp;&nbsp;&nbsp;&nbsp;剩&nbsp;&nbsp;&nbsp;余：</Text>
                            <Text>￥{HosInfo.balance}</Text>
                        </View>
                        <View className="info_bottom">
                            <View className="info_btn"  onClick={this.props.godateDetail.bind(this)}>
                                消费明细
                            </View>
                        </View>
                    </View>
                    <View className="content_item1">
                      <View className="text"> *办理出院后 剩余费用会原路返回</View> 
                    </View>
                </ScrollView>
                {
                    HosInfo.in_flag==='0'
                    ?<View className="botton">
                        <View className="addbtn" onClick={this.props.addFee.bind(this)}>预存住院费用</View>
                    </View>:''
                }
                
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        HosInfo:state.getIn(["hospitalInfo","HosInfo"]),
        VisitNo:state.getIn(["hospitalInfo","VisitNo"]),
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        //每日记录
        goDailyRecord(){
            Taro.navigateTo({
                url: '/pages/myCenter/seeDoctorInfo/dailyRecord/dailyRecord'　　 
            })
        },
        godateDetail(){
            Taro.navigateTo({
                url: '/pages/myCenter/seeDoctorInfo/dateDetail/dateDetail'　　 
            })
        },
        //查询住院详情
        selectHosInfo(that){
            var url = 'hospitalization/queryHospitalizationInfo';
            var visit_id = that.props.VisitNo;
            var prams = {
                visit_id
            }
            http.postRequest(url,prams, 
              function(res){
                if(res.errcode===0){
                    var action = actionCreators.setHosInfo(res.data);
                    dispatch(action);
                }
              },
              function(err){
            
              }
            )
        },
        //预存住院费用
        addFee(){
            var map = this.props.HosInfo.toJS();
            var actionHosInfo = topupHosActionCreators.setInfoMap(map);
            dispatch(actionHosInfo);
            Taro.navigateTo({
                url: '/pages/myCenter/seeDoctorInfo/topupHos/topupHos'　　 
            })
        }
    }
}
export default connect(mapStateTopProps,mapDispatchToProps)(HospitalInfo)