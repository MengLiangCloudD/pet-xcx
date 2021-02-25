import React, { Component,Fragment } from 'react'
import { View, Text,Image } from '@tarojs/components'
import './hospitaReferral.scss'
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import http from './../../../../utils/http';
import * as imager from './../../assager';
class HospitaReferral extends Component{
    constructor(props){
        super(props);
        this.state={
            header:'医院介绍'
        }
    }
    //返回上一层
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    render(){
        var style = {
            height:'calc(100% -  40px - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
         }
        return (
            <Fragment>
                <View className="components-page">
                    <Hearder titleText={this.state.header}  goback={true} background={true} toback={this.getback}></Hearder>
                    <View className="content">
                        <View className="title"></View>
                        <View className="content_text">
                            <View className="text_title">
                                <View className="biao"></View>
                                <View className="biao_text">博拉图宠物健康中心</View>
                            </View>
                            <View className="txt_info">
                                博拉图宠物健康中心创立于1992年，是北京市第一家三证齐全的宠物医院，也是国内率先通过ISO9000认证的5A级大型综合性宠物医院。医院建筑面积1000余平方米，设备先进，设有门诊部、综合处置室、药房、检验科、影像中心、住院部、无菌手术室、销售/美容部门。医生团队硕士以及以上学历占比达到70%以上，多位经验丰富的宠物医师分别在内科、外科、皮肤科、牙科、急危重症、中兽医、异宠等领域有着较深的造诣。
                            </View>
                        </View>
                        <View className="content_text">
                            <View className="text_title">
                                <View className="biao"></View>
                                <View className="biao_text">博拉图宠物健康中心</View>
                            </View>
                            <View className="txt_info">
                                博拉图宠物健康中心创立于1992年，是北京市第一家三证齐全的宠物医院，也是国内率先通过ISO9000认证的5A级大型综合性宠物医院。医院建筑面积1000余平方米，设备先进，设有门诊部、综合处置室、药房、检验科、影像中心、住院部、无菌手术室、销售/美容部门。医生团队硕士以及以上学历占比达到70%以上，多位经验丰富的宠物医师分别在内科、外科、皮肤科、牙科、急危重症、中兽医、异宠等领域有着较深的造诣。
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
      
    }
  }
  export default connect(mapStateTopProps,mapDispatchToProps)(HospitaReferral)