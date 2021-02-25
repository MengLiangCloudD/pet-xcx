import React, { Component, Fragment } from 'react'
import { View, Text,Image,ScrollView } from '@tarojs/components';
import './residehospital.scss'
import Hearder from './../../../../commen/header/header';
import SelactCard from './../../../../commen/selactCard/selactCard';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import * as imager from './../../assager';
import * as actionCreators from './store/actionCreators';
import * as hosInfoActionCreators from './../hospitalInfo/store/actionCreators';
import selectCardList from './../../../../commen/selectCardList';
import http from '../../../../utils/http';
class Residehospital extends Component {
    constructor(props){
        super(props);
        this.state={
            header:'住院查询',
            cardList:[],
            card:''
        }
    }
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    componentDidMount(){
        // this.props.getHospitalizationList();
    }
    itemView(){
        var hosList = this.props.hosList.toJS();
        const config = require('./../../../../utils/config');
        return (
            hosList.length>0?
            hosList.map((item,index)=>{
                return (
                    <View className="item" key={index}>
                        <View className="item_title" onClick={this.props.goHospitalInfo.bind(this,item)}>
                            <View className="title_biao"></View>
                            <View className="title_txt">住院信息</View>
                            <Image  mode="widthFix" className="huiYou_child" src={imager.huiYou}/>
                        </View>
                        <View className="user_info">
                            <View className="user_info_child">
                                <Text>一卡通卡号：</Text>
                                <Text>{item.card_no}</Text>
                            </View>
                            <View className="user_info_child">
                                <Text>宠&nbsp;物&nbsp;昵&nbsp;称：</Text>
                                <Text>{item.name}</Text>
                            </View>
                            <View className="user_info_child">
                                <Text>宠&nbsp;物&nbsp;品&nbsp;种：</Text>
                                <Text>{item.charge_type}</Text>
                            </View>
                        </View>
                        <View className="user_info">
                            <View className="user_info_child">
                                <Text>住&nbsp;院&nbsp;时&nbsp;间：</Text>
                                <Text>{item.admission_date}</Text>
                            </View>
                            <View className="user_info_child">
                                <Text>笼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</Text>
                                <Text>{item.bed_no}</Text>
                            </View>
                        </View>
                        <View className="user_info price_info">
                            <View className="user_info_child">
                                <Text>预&nbsp;交&nbsp;金&nbsp;额：</Text>
                                <Text>￥{item.sum_amount}</Text>
                            </View>
                            {/* <View className="user_info_child">
                                <Text>2020-10-10预存：</Text>
                                <Text>饺子</Text>
                            </View>
                            <View className="user_info_child">
                                <Text>2020-10-10预存：</Text>
                                <Text>饺子</Text>
                            </View> */}
                            <View className="user_info_child">
                                <Text>当&nbsp;前&nbsp;剩&nbsp;余：</Text>
                                <Text>￥{item.balance}</Text>
                            </View>
                        </View>
                        <View className="info_bottom">
                                *办理出院后，剩余费用会原路返回
                        </View>
                    </View> 
                )
            }):<View className="que">
                <Image  mode="widthFix" className="que" src={config.imgUrl+'noContent.png'}/>
            </View>
        )
    }
    getSelectCard(card,thats){
        thats.props.getHospitalizationList(card);
        thats.setState({
            card:card
        })
    }
    //进入页面时判断是否需要授权
    componentDidShow () {
        if(wx.getStorageSync('token')==undefined||wx.getStorageSync('token')==''||wx.getStorageSync('token')==null||wx.getStorageSync('avatar')==undefined||wx.getStorageSync('avatar')==''||wx.getStorageSync('avatar')==null||wx.getStorageSync('nickname')==undefined||wx.getStorageSync('nickname')==''||wx.getStorageSync('nickname')==null){
            Taro.navigateTo({
                url: '/pages/impower/impower'　　
            })
        }else{
            var that = this;
            selectCardList.getCardList().then(res=>{
                that.setState({
                    cardList:res
                })
            })
        }
    }
    render(){
        var style = {
            height:'calc(100% -  40px - 14.66667rpx - 14.66667rpx - 80.66667rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
         }
         var style1 = {
            height:'calc(100% - 40px - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        return (
            <Fragment>
                <View className="title">
                    <Hearder titleText={this.state.header} goback={true} toback={this.getback} background={true}></Hearder>
                    {
                        this.state.cardList.length>0?<SelactCard cardList={this.state.cardList} thats={this} selectCard={this.getSelectCard}></SelactCard>:''
                    }
                </View>
                <ScrollView className="content" style={this.state.cardList.length>0?style:style1}
                scrollY
                scrollWithAnimation
                scrollTop={0}>
                    {this.itemView()}
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
      hosList:state.getIn(["residehospital","hospitalizationList"])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        // 查询住院单
        getHospitalizationList(card){
            var url = 'hospitalization/queryHospitalizationList';
            var card_no = card;
            var prams = {
                card_no:card_no
            }
            http.postRequest(url,prams, 
              function(res){
                if(res.errcode===0){
                    var action = actionCreators.setHospitalizationList(res.data);
                    dispatch(action);
                }
              },
              function(err){
            
              }
            )
        },
        //跳转到住院详情
        goHospitalInfo(item){
            var action = hosInfoActionCreators.setVisitNo(item.id);
            dispatch(action);
            Taro.navigateTo({
                url: '/pages/myCenter/seeDoctorInfo/hospitalInfo/hospitalInfo'　　
            })
        }
    }
}
export default connect(mapStateTopProps,mapDispatchToProps)(Residehospital)