import React, { Component, Fragment } from 'react'
import { View, Text,Image,ScrollView } from '@tarojs/components';
import './assayInfo.scss';
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import * as imager from './../../assager';
import * as actionCreators from './store/actionCreators';
import http from '../../../../utils/http';
class AssayInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            header:'化验单详情',
            lab_time:''
        }
    }
    //返回
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    componentDidMount(){
        this.props.selectAssayInfo(this);
    }
    render(){
        var style = {
            height:'calc(100% -  40px - 14.66667rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        var assayMapId = this.props.assayMapId.toJS();
        var assayInfoMap = this.props.assayInfoMap.toJS();
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
                            <Text>{assayMapId.card_no}</Text>
                        </View>
                        <View className="title_item">
                            <Text>宠&nbsp;物&nbsp;昵&nbsp;称：</Text>
                            <Text>{assayMapId.name}</Text>
                        </View>
                        <View className="title_item">
                            <Text>宠&nbsp;物&nbsp;种&nbsp;类：</Text>
                            <Text>{assayMapId.charge_type}</Text>
                        </View>
                    </View>
                    <View className="nav">
                        <View className="nav_title">
                            <View className="nav_item">
                                <Text>申请科室：</Text>
                                <Text>{assayMapId.dept_name}</Text>
                            </View>
                            <View className="nav_item">
                                <Text>申请医师：</Text>
                                <Text>{assayMapId.kaidan_yisheng}</Text>
                            </View>
                            <View className="nav_item">
                                <Text>临床诊断：</Text>
                                <Text>{assayMapId.zhenduan}</Text>
                            </View>
                        </View>
                        <View className="nav_time">
                            <View className="time_assay">
                                <View className="time_left">
                                    <Text>采样时间：</Text>
                                    <Text>{assayMapId.caiyangshijian}</Text>
                                </View>
                                <View className="time_right">
                                    <Text>检验者：</Text>
                                    <Text>{assayMapId.jianyan_yisheng}</Text>
                                </View>
                            </View>
                            <View className="time_assay">
                                <View className="time_left">
                                    <Text>报告时间：</Text>
                                    <Text>{assayMapId.lab_time}</Text>
                                </View>
                                <View className="time_right">
                                    <Text>审核者：</Text>
                                    <Text>{assayMapId.jianyan_yisheng}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="content_info">
                        <View className="info_title">
                            <View className='at-row'>
                                <View className='at-col at-col-5'>中文/英文名称</View>
                                <View className='at-col at-col-2'>结果</View>
                                <View className='at-col at-col-2'>提示</View>
                                <View className='at-col at-col-3'>参考值</View>
                            </View>
                        </View>
                        {
                            assayInfoMap.map((item,index)=>{
                                return (
                                    <View className="item" key={index}>
                                        <View className='at-row'>
                                            <View className='at-col at-col-5'>{item.report_item_name}</View>
                                            <View className='at-col at-col-2'>{item.result}</View>
                                            <View className='at-col at-col-2'>{item.abnormal_indicator}</View>
                                            <View className='at-col at-col-3'>{item.print_context}</View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                                
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        assayInfoMap:state.getIn(["assayInfo","assayInfoMap"]),
        assayMapId:state.getIn(["assayInfo","assayMapId"])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        //查询
        selectAssayInfo(that){
            var url ="queryTestInfo";
            var map = that.props.assayMapId.toJS();
            var apply_no = map.apply_on;
            var prams = {
                apply_no
            }
            http.postRequest(url, prams,
                function (res) {
                  if (res.errcode == 0) {
                      var list = res.data;
                      that.setState({
                        lab_time:list.lab_time
                      })
                    var action = actionCreators.setAssayInfoMap(list.results);
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
export default connect(mapStateTopProps,mapDispatchToProps)(AssayInfo)