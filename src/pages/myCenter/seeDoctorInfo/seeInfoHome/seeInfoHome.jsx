import React, { Component, Fragment } from 'react'
import { View, Text,Image,ScrollView } from '@tarojs/components'
import './seeInfoHome.scss'
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import * as imager from './../../assager';
import http from '../../../../utils/http';
import  * as actionCreatorsdocTreatment from './../docTreatment/store/actionCreators';
class SeeInfoHome extends Component {
    constructor(props){
        super(props);
        this.state={
            header:'就诊信息'
        }
    }
    getback(){
        Taro.switchTab({
            url: '/pages/index/myCenter/myCenter',
        });
    }
    
    //住院
    goResidehospital(){
        Taro.navigateTo({
            url: '/pages/myCenter/seeDoctorInfo/residehospital/residehospital'　　
        })
    }
    //病历
    goCaseHistory(){
        Taro.navigateTo({
            url: '/pages/myCenter/seeDoctorInfo/caseHistory/caseHistory'　　
        })
    }
    //报告查询
    goSelectReport(){
        Taro.navigateTo({
            url: '/pages/myCenter/seeDoctorInfo/selectReport/selectReport'　　
        })
    }
    render(){
        var style = {
            height:'calc(100% -  40px - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
         }
        return (
            <Fragment>
                <View className="title">
                    <Hearder titleText={this.state.header} goback={true} toback={this.getback} background={true}></Hearder>
                </View>
                <View className="content" style={style}>
                        <View className="item">
                            <View className="item_content">
                                <View className="item_child" onClick={this.goResidehospital.bind(this)}>
                                    <View className="item_child_text" >住院查询</View>
                                    <Image  mode="widthFix" className="huiYou_child" src={imager.huiYou}/>
                                </View>
                                <View className="item_child"onClick={this.props.goDocTreatment.bind(this)} >
                                    <View className="item_child_text" >自助缴费</View>
                                    <Image  mode="widthFix" className="huiYou_child" src={imager.huiYou}/>
                                </View>
                                <View className="item_child" onClick={this.goCaseHistory.bind(this)}>
                                    <View className="item_child_text">病历查询</View>
                                    <Image  mode="widthFix" className="huiYou_child" src={imager.huiYou}/>
                                </View>
                                <View className="item_child" onClick={this.goSelectReport.bind(this)}>
                                    <View className="item_child_text" >报告查询</View>
                                    <Image  mode="widthFix" className="huiYou_child" src={imager.huiYou}/>
                                </View>
                                
                            </View>
                        </View>
                    </View>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        //医疗
        goDocTreatment(){
            var action = actionCreatorsdocTreatment.seturlType(1);
            dispatch(action);
            Taro.navigateTo({
                url: '/pages/myCenter/seeDoctorInfo/docTreatment/docTreatment'　　
            })
        },
        
    }
}
export default connect(mapStateTopProps,mapDispatchToProps)(SeeInfoHome)