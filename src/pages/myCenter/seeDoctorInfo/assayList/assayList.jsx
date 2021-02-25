import React, { Component, Fragment } from 'react';
import { View, Text,Image,ScrollView } from '@tarojs/components';
import './assayList.scss';
import Hearder from './../../../../commen/header/header';
import SelactCard from './../../../../commen/selactCard/selactCard';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import * as imager from './../../assager';
import * as actionCreators from './store/actionCreators';
import * as assayInfoActionCreators from './../assayInfo/store/actionCreators';
import selectCardList from './../../../../commen/selectCardList';
import http from '../../../../utils/http';
class AssayList extends Component{
    constructor(props){
        super(props);
        this.state={
            header:'化验单查询',
            card:'',
            cardList:[],
            isOpened:false
        }
    }
    getback(){
        if(this.props.assUrlType===1){
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
        thats.props.selectAssayList(card);
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
    render(){
        var style = {
            height:'calc(100% -  40px - 14.66667rpx - 14.66667rpx - 80.66667rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        var style1 = {
            height:'calc(100% - 40px - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        const config = require('./../../../../utils/config');
        const assayList = this.props.assayList.toJS();
        return (
            <Fragment>
                {
                    this.state.isOpened?
                    <View className="zhezhao">
                        <View className="module">
                            <View className="consstent">
                                *结果暂未开出，请耐心等待！
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
                        assayList.length>0?
                        assayList.map((item,index)=>{
                            return (
                                <View className="item" key={index}>
                                    <View className="item_title" onClick={this.props.goAssayInfo.bind(this,item)}>
                                        <View className="title_txt">{item.items_name}</View>
                                        <Image  mode="widthFix" className="huiYou_child" src={imager.huiYou}/>
                                    </View>
                                    <View className="item_content">
                                        <View className="item_txt">
                                            <Text className="first_txt">一卡通卡号：</Text>
                                            <Text>{item.card_no}</Text>
                                        </View>
                                        <View className="item_txt">
                                            <Text className="first_txt">宠&nbsp;物&nbsp;昵&nbsp;称：</Text>
                                            <Text>{item.name}</Text>
                                        </View>
                                        <View className="item_txt">
                                            <Text className="first_txt">宠&nbsp;物&nbsp;种&nbsp;类：</Text>
                                            <Text>{item.charge_type}</Text>
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
                                            <Text className="first_txt">检&nbsp;查&nbsp;项&nbsp;目：</Text>
                                            <Text>{item.caiyang}</Text>
                                        </View>
                                    </View>
                                    {
                                        item.result_status!=='1'
                                        ?<View className="bottom">*结果暂未开出，请耐心等待！</View>:''
                                    }
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
        assayList:state.getIn(["assayList","assayList"]),
        assUrlType:state.getIn(["assayList","assUrlType"])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        //化验详情
        goAssayInfo(item){
            if(item.result_status==='1'){
                var action = assayInfoActionCreators.setAssayMapId(item);
                dispatch(action);
                Taro.navigateTo({
                    url: '/pages/myCenter/seeDoctorInfo/assayInfo/assayInfo'　　
                })
            }else{
                this.setState({isOpened:true})
            }
                
        },
        //查询化验单
        selectAssayList(cardNo){
            var url = 'queryTestListByCardNo';
             var prams = {
                cardNo
            }
            http.postRequest(url, prams,
              function (res) {
                if (res.errcode == 0) {
                    var list = res.data;
                  var action = actionCreators.setAssayList(list);
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
export default connect(mapStateTopProps,mapDispatchToProps)(AssayList)