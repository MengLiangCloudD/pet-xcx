import React, { Component, Fragment } from 'react';
import { View, Text,Image,ScrollView } from '@tarojs/components';
import './examine.scss';
import Hearder from './../../../../commen/header/header';
import SelactCard from './../../../../commen/selactCard/selactCard';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import * as imager from './../../assager';
import * as actionCreators from './store/actionCreators';
import selectCardList from './../../../../commen/selectCardList';
import http from '../../../../utils/http';
class Examine extends Component{
    constructor(props){
        super(props);
        this.state={
            header:'检查单查询',
            cardList:[],
            card:'',
            isOpened:false,
        }
    }
    getback(){
        if(this.props.examUrlType===1){
            Taro.navigateBack({
                delta: 1
            })
        }else{
            Taro.switchTab({
                url: '/pages/index/home/index',
            });
        }
    }
    getSelectCard(card,thats){
        thats.props.selectexamineList(card);
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
    handleConfirm(){
        this.setState({isOpened:false})
    }
    //弹出层
    modelTrue(){
        this.setState({isOpened:true})
    }
    render(){
        var style = {
            height:'calc(100% -  40px - 14.66667rpx - 14.66667rpx - 80.66667rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        var style1 = {
            height:'calc(100% - 40px - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        const config = require('./../../../../utils/config');
        const examineList = this.props.examineList.toJS();
        return (
            <Fragment>
                {
                    this.state.isOpened?
                    <View className="zhezhao">
                        <View className="module">
                            <View className="consstent">
                                请到院内查看检查结果
                            </View>
                            <View className="botdtom">
                                <View className="btn_mod"  onClick={this.handleConfirm.bind(this)}>确定</View>
                            </View>
                        </View>
                    </View>:''
                }
                <View className="title">
                    <Hearder titleText={this.state.header} goback={true} toback={this.getback.bind(this)} background={true}></Hearder>
                    {
                        this.state.cardList.length>0?<SelactCard cardList={this.state.cardList} thats={this} selectCard={this.getSelectCard}></SelactCard>:''
                    }
                </View>
                <ScrollView className="content" style={this.state.cardList.length>0?style:style1}
                scrollY
                scrollWithAnimation
                scrollTop={0}>
                    {
                        examineList.length>0?
                        examineList.map((item,index)=>{
                            return (
                                <View className="item" key={index}>
                                    <View className="item_title" onClick={this.modelTrue.bind(this)}>
                                        <View className="title_txt">{item.items_name}</View>
                                        {
                                            item.result_status==='有'?<View className="huiYou_child">已出结果</View>:<View className="huiYou_child">暂未结果</View>
                                        }
                                    </View>
                                    <View className="item_content">
                                        <View className="item_txt">
                                            <Text className="first_txt">一卡通卡号：</Text>
                                            <Text>{this.state.card}</Text>
                                        </View>
                                        <View className="item_txt">
                                            <Text className="first_txt">宠&nbsp;物&nbsp;昵&nbsp;称：</Text>
                                            <Text>{item.name}</Text>
                                        </View>
                                        <View className="item_txt">
                                            <Text className="first_txt">宠&nbsp;物&nbsp;种&nbsp;类：</Text>
                                            <Text>哈士奇</Text>
                                        </View>
                                        <View className="item_txt">
                                            <Text className="first_txt">申&nbsp;请&nbsp;科&nbsp;室：</Text>
                                            <Text>{item.dept_name}</Text>
                                        </View>
                                        <View className="item_txt">
                                            <Text className="first_txt">临&nbsp;床&nbsp;诊&nbsp;断：</Text>
                                            <Text>{item.zhenduan}</Text>
                                        </View>
                                        <View className="item_txt">
                                            <Text className="first_txt">采&nbsp;样&nbsp;时&nbsp;间：</Text>
                                            <Text>{item.caiyangshijian}</Text>
                                        </View>
                                        <View className="item_txt">
                                            <Text className="first_txt">检&nbsp;查&nbsp;医&nbsp;生：</Text>
                                            <Text>{item.kaidan_yisheng}</Text>
                                        </View>
                                    </View>
                                    <View className="bottom">*请到院内查看检查结果</View>
                                </View>
                            )
                        })
                        :<View className="que">
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
        examineList:state.getIn(["examine","examineList"]),
        examUrlType:state.getIn(["examine","examUrlType"])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        //化验详情
        selectexamineList(cardNo){
            var url = 'queryCheckListByCardNo';
            var prams = {
                cardNo
            }
           http.postRequest(url, prams,
             function (res) {
               if (res.errcode === 0) {
                   var list = res.data;
                 var action = actionCreators.setExamineList(list)
                 dispatch(action);
               }
             },
             function (err) {
               console.log(err)
             }
           )
        }
    }
}
export default connect(mapStateTopProps,mapDispatchToProps)(Examine)