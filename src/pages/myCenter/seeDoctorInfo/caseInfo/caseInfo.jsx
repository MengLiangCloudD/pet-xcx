import React, { Component, Fragment } from 'react'
import { View, Text,Image,ScrollView } from '@tarojs/components';
import './caseInfo.scss';
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import * as imager from './../../assager';
import * as actionCreators from './store/actionCreators';
import http from '../../../../utils/http';
class CaseInfo extends Component {
    constructor(props){
        super(props);
        this.state={
            header:'病历详情'
        }
    }
    //返回
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    componentDidMount(){
        this.props.selectCaseInfo(this);
    }
    render(){
        var style = {
            height:'calc(100% -  40px - 14.66667rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        
        const clinicItem = this.props.clinicItem.toJS();
        const caseInfoMap = this.props.caseInfoMap.toJS();
        return (
            <Fragment>
                <View className="title">
                    <Hearder titleText={this.state.header} goback={true} toback={this.getback} background={true}></Hearder>
                </View>
                <ScrollView className="content" style={style}
                scrollY
                scrollWithAnimation
                scrollTop={0}>
                    <View className="title">
                        <View className="title_item">
                            <Text>一卡通卡号：</Text>
                            <Text>{clinicItem.card_no}</Text>
                        </View>
                        <View className="title_item">
                            <Text>宠&nbsp;物&nbsp;昵&nbsp;称：</Text>
                            <Text>{clinicItem.pet_name}</Text>
                        </View>
                        <View className="title_item">
                            <Text>宠&nbsp;物&nbsp;种&nbsp;类：</Text>
                            <Text>{clinicItem.charge_type}</Text>
                        </View>
                    </View>
                    <View className="content_item">
                        <View className="item_info">
                            <Text className="biao_title">医&nbsp;院&nbsp;名&nbsp;称：</Text>
                            <Text className="biao_info">北京博拉图动物医院</Text>
                        </View>
                        <View className="item_info">
                            <Text className="biao_title">就&nbsp;诊&nbsp;时&nbsp;间：</Text>
                            <Text className="biao_info">{caseInfoMap.visit_date}</Text>
                        </View>
                        <View className="item_info">
                            <Text className="biao_title">就&nbsp;诊&nbsp;序&nbsp;号：</Text>
                            <Text className="biao_info">{caseInfoMap.clinic_no}</Text>
                        </View>
                        <View className="item_info">
                            <Text className="biao_title">诊&nbsp;断&nbsp;结&nbsp;果：</Text>
                            <Text className="biao_info">{caseInfoMap.zhenduan}</Text>
                        </View>
                        <View className="item_info">
                            <Text className="biao_title">医&nbsp;师&nbsp;姓&nbsp;名：</Text>
                            <Text className="biao_info">{caseInfoMap.doctor_name}</Text>
                        </View>
                        <View className="item_info">
                            <Text className="biao_title">医&nbsp;师&nbsp;建&nbsp;议：</Text>
                            <Text className="biao_info">{caseInfoMap.yijian}</Text>
                        </View>
                        <View className="item_info">
                            <Text className="biao_title">医&nbsp;师&nbsp;主&nbsp;诉：</Text>
                            <Text className="biao_info">{caseInfoMap.zhusu}</Text>
                        </View>
                        <View className="item_info">
                            <Text className="biao_title">既&nbsp;往&nbsp;病&nbsp;史：</Text>
                            <Text className="biao_info">{caseInfoMap.jiwangshi}</Text>
                        </View>
                        <View className="item_info">
                            <Text className="biao_title">现&nbsp;有&nbsp;病&nbsp;史：</Text>
                            <Text className="biao_info">{caseInfoMap.xianbinshi}</Text>
                        </View>
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        clinicItem:state.getIn(["caseInfo","clinicItem"]),
        caseInfoMap:state.getIn(["caseInfo","caseInfoMap"])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        //查询病历详情
        selectCaseInfo(that){
            var url = 'department/queryDepartmentHistoryInfo';
            var clinicItem = that.props.clinicItem.toJS();
            var clinic_id = clinicItem.clinic_id;
             var prams = {
                clinic_id
            }
            http.postRequest(url, prams,
              function (res) {
                  if(res.errcode===0){
                    var action = actionCreators.setCaseInfoMap(res.data);
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
export default connect(mapStateTopProps,mapDispatchToProps)(CaseInfo)