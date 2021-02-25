import React, { Component, Fragment } from 'react'
import { View, Text,Image,ScrollView } from '@tarojs/components'
import './selectReport.scss'
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import * as imager from './../../assager';
import http from '../../../../utils/http';
import * as actionCreatorsExamine from './../examine/store/actionCreators';
import * as actionCreatorsAssayList from './../assayList/store/actionCreators';
class SelectReport extends Component {
    constructor(props){
        super(props);
        this.state={
            header:'报告查询'
        }
    }
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
                <View className="title">
                    <Hearder titleText={this.state.header} goback={true} toback={this.getback} background={true}></Hearder>
                </View>
                <View className="content" style={style}>
                        <View className="item">
                            <View className="item_content">
                                <View className="item_child"  onClick={this.props.goExamineList.bind(this)}>
                                    <View className="item_child_text" >检查单</View>
                                    <Image  mode="widthFix" className="huiYou_child" src={imager.huiYou}/>
                                </View>
                                <View className="item_child" onClick={this.props.goAssayList.bind(this)}>
                                    <View className="item_child_text" >化验单</View>
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
        //化验单
        goAssayList(){
            var action = actionCreatorsAssayList.setAssUrlType(1);
            dispatch(action);
            Taro.navigateTo({
                url: '/pages/myCenter/seeDoctorInfo/assayList/assayList'　　
            })
        },
        //检查单
        goExamineList(){
            var action  = actionCreatorsExamine.setExamUrlType(1);
            dispatch(action);
            Taro.navigateTo({
                url: '/pages/myCenter/seeDoctorInfo/examine/examine'　　
            })
        }
    }
}
export default connect(mapStateTopProps,mapDispatchToProps)(SelectReport)