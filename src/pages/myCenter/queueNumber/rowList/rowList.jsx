import React, { Component,Fragment } from 'react'
import { View, Text,Image } from '@tarojs/components'
import './rowList.scss'
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import http from './../../../../utils/http';
// import * as actionCreators from './store/actionCreators';
import * as imager from './../../assager';
class InRegardsHome extends Component{
    constructor(props){
        super(props);
        this.state={
            header:'排号列表'
        }
    }
    componentWillMount(){

    }
    //返回上一层
    getback(){
        Taro.switchTab({
            url: '/pages/index/myCenter/myCenter',
        });
    }
    
    render(){
        var style = {
            height:'calc(100% -  40px - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
         }
        return ( 
            <Fragment>
                <View className="components-page">
                    <Hearder titleText={this.state.header}  goback={true} background={true} toback={this.getback}></Hearder>
                    <View className="content" style={style}>
                        <View className="title">
                            <View className="title_nav">
                                <View className="nav_biao"></View>
                                <View className="nav_text">宠物档案</View>
                            </View>
                            <View className="title_content">
                                <View className="text">
                                    <Text>一卡通卡号：</Text>
                                    <Text>13054612584</Text>
                                </View>
                                <View className="text">
                                    <Text>宠&nbsp;物&nbsp;昵&nbsp;称：</Text>
                                    <Text>团子</Text>
                                </View>
                                <View className="text">
                                    <Text>宠&nbsp;物&nbsp;种&nbsp;类：</Text>
                                    <Text>狗狗</Text>
                                </View>
                            </View>
                        </View>
                        <View className="pet_info">
                            <View className="info_title">
                                排号信息
                            </View>
                            <View className="info_conent">
                                <View className="info_item">
                                    <View className="item_child">宠物序号</View>
                                    <View className="item_info">1301</View>
                                </View>
                                <View className="info_item">
                                    <View className="item_child">宠物名称</View>
                                    <View className="item_info">团子</View>
                                </View>
                                <View className="info_item">
                                    <View className="item_child">排队时间</View>
                                    <View className="item_info">2020-10-23 16：06：33</View>
                                </View>
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
        time:state.getIn(['rowNumber','time']),
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    return {

    }
  }
  export default connect(mapStateTopProps,mapDispatchToProps)(InRegardsHome)