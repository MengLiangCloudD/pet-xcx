import React, { Component, Fragment } from 'react'
import { View, Text,Image,ScrollView } from '@tarojs/components';
import './caseHistory.scss';
import Hearder from './../../../../commen/header/header';
import SelactCard from './../../../../commen/selactCard/selactCard';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import * as imager from './../../assager';
import * as actionCreators from './store/actionCreators';
import * as caseInfoActionCreators from './../caseInfo/store/actionCreators';
import selectCardList from './../../../../commen/selectCardList';
import http from '../../../../utils/http';
class CaseHistory extends Component{
    constructor(props){
        super(props);
        this.state={
            header:'病历查询',
            card:'',
            cardList:[]
        }
    }
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    getSelectCard(card,thats){
        thats.props.selectCaseList(card);
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
         const config = require('./../../../../utils/config');
        const caseList = this.props.caseList.toJS();
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
                    {
                        caseList.length>0?
                        caseList.map((item,index)=>{
                            return (
                                <View className="item" key={index}>
                                    <View className="item_title" onClick={this.props.goCaseInfo.bind(this,item)}>
                                        <View className="title_txt">病历单</View>
                                        <Image  mode="widthFix" className="huiYou_child" src={imager.huiYou}/>
                                    </View>
                                    <View className="item_content">
                                        <View className="item_txt">
                                            <Text className="first_txt">医&nbsp;院&nbsp;名&nbsp;称：</Text>
                                            <Text>北京博拉图动物医院</Text>
                                        </View>
                                        <View className="item_txt">
                                            <Text className="first_txt">一卡通卡号：</Text>
                                            <Text>{item.card_no}</Text>
                                        </View>
                                        <View className="item_txt">
                                            <Text className="first_txt">就&nbsp;诊&nbsp;时&nbsp;间：</Text>
                                            <Text>{item.visit_date}</Text>
                                        </View>
                                        <View className="item_txt">
                                            <Text className="first_txt">就&nbsp;诊&nbsp;序&nbsp;号：</Text>
                                            <Text>{item.clinic_no}</Text>
                                        </View>
                                        <View className="item_txt">
                                            <Text className="first_txt">医&nbsp;师&nbsp;姓&nbsp;名：</Text>
                                            <Text>{item.doctor_name}</Text>
                                        </View>
                                        <View className="item_txt">
                                            <Text className="first_txt">宠&nbsp;物&nbsp;昵&nbsp;称：</Text>
                                            <Text>{item.pet_name}</Text>
                                        </View>
                                        <View className="item_txt">
                                            <Text className="first_txt">宠&nbsp;物&nbsp;种&nbsp;类：</Text>
                                            <Text>{item.pet_name}</Text>
                                        </View>
                                        <View className="item_txt">
                                            <Text className="first_txt">宠&nbsp;物&nbsp;品&nbsp;种：</Text>
                                            <Text>{item.charge_type}</Text>
                                        </View>
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
        caseList:state.getIn(["caseHistory","caseList"])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        //病历详情
        goCaseInfo(item){
            var action = caseInfoActionCreators.setClinicItem(item);
            dispatch(action);
            Taro.navigateTo({
                url: '/pages/myCenter/seeDoctorInfo/caseInfo/caseInfo'　　
            })
        },
        //查询病历列表
        selectCaseList(card_no){
            var url = 'department/queryDepartmentHistory';
             var prams = {
                card_no
            }
            http.postRequest(url, prams,
              function (res) {
                if (res.errcode == 0) {
                    var list = res.data;
                    for(var i = 0;i<list.length;i++){
                        list[i].start=0
                    }
                  var action = actionCreators.setCaseList(list);
                  dispatch(action)
                }
              },
              function (err) {
                console.log(err)
              }
            )
        }
    }
}
export default connect(mapStateTopProps,mapDispatchToProps)(CaseHistory)