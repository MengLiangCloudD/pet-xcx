import React, { Component, Fragment } from 'react'
import { View, Text,Image,ScrollView } from '@tarojs/components';
import './docTreatment.scss';
import Hearder from './../../../../commen/header/header';
import SelactCard from './../../../../commen/selactCard/selactCard';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import * as imager from './../../assager';
import * as actionCreators from './store/actionCreators';
import  * as actionCreatorsDocTreatInfo  from './../docTreatInfo/store/actionCreators';
import selectCardList from './../../../../commen/selectCardList';
import http from '../../../../utils/http';
class DocTreatment extends Component{
    constructor(props){
        super(props);
        this.state={
            header:"自助缴费",
            card:'',
            cardList:[],
            
        }
    }
    getback(){
        if(this.props.seturlType===1){
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
        thats.props.selectdocTreatInfo(card);
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
            height:'calc(100% - 40px - 14.66667rpx - 14.66667rpx - 80.66667rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        var style1 = {
            height:'calc(100% - 40px - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        const config = require('./../../../../utils/config');
        const docPriceList = this.props.docPriceList.toJS()
        return (
            <Fragment>
                
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
                        docPriceList.length>0?
                        docPriceList.map((item,index)=>{
                            return (
                                <View className="item" key={index}>
                                    <View className="item_title">
                                        <View className="item_time">{item.visit_date}</View>
                                    </View>
                                    <View className="item_content">
                                        <View className="item_info">
                                            <Text>医&nbsp;院&nbsp;名&nbsp;称：</Text>
                                            <Text>北京博拉图动物医院</Text>
                                        </View>
                                        <View className="item_info">
                                            <Text>一卡通卡号：</Text>
                                            <Text>{item.card_no}</Text>
                                        </View>
                                        <View className="item_info">
                                            <Text>就诊时间：</Text>
                                            <Text>{item.visit_date}</Text>
                                        </View>
                                        <View className="item_info">
                                            <Text>就诊序号：</Text>
                                            <Text>{item.clinic_no}</Text>
                                        </View>
                                        <View className="item_info">
                                            <Text>医师姓名：</Text>
                                            <Text>{item.doctor_name}</Text>
                                        </View>
                                        <View className="item_info">
                                            <Text>宠物昵称：</Text>
                                            <Text>{item.pet_name}</Text>
                                        </View>
                                        <View className="item_info">
                                            <Text>宠物品种：</Text>
                                            <Text>{item.charge_type}</Text>
                                        </View>
                                        
                                    </View>
                                    <View className="item_bottom">
                                        <View className="bottom_btn">
                                            <View className="btn_look" onClick={this.props.goDocTreatInfo.bind(this,item)}>查看详情</View>
                                        </View>
                                    </View>
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
        docPriceList:state.getIn(["docTreatment","docPriceList"]),
        seturlType:state.getIn(["docTreatment","urlType"])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        //医疗详情
        goDocTreatInfo(item){
            var action = actionCreatorsDocTreatInfo.setClinicId(item.clinic_id);
            dispatch(action);
            
            Taro.navigateTo({
                url: '/pages/myCenter/seeDoctorInfo/docTreatInfo/docTreatInfo'　　
            })
        },
        //查询医疗单
        selectdocTreatInfo(card_no){
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
                 var action = actionCreators.setDocPriceList(list);
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
export default connect(mapStateTopProps,mapDispatchToProps)(DocTreatment)