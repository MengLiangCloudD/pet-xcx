import React, { Component,Fragment } from 'react'
import { View, Text,Image } from '@tarojs/components'
import './inRegardsHome.scss'
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import http from './../../../../utils/http';
import * as actionCreators from './store/actionCreators';
import * as imager from './../../assager';
class InRegardsHome extends Component{
    constructor(props){
        super(props);
        this.state={
            header:'关于本院'
        }
    }
    //返回上一层
    getback(){
        Taro.switchTab({
            url: '/pages/index/myCenter/myCenter',
        });
    }
    //医院介绍
    goHospitaReferral(){
        Taro.navigateTo({
            url: '/pages/myCenter/inRegards/hospitaReferral/hospitaReferral'　　
        })
    }
    //联系我们
    goContact(){
        Taro.navigateTo({
            url: '/pages/myCenter/inRegards/contact/contact'　　
        })
    }
    render(){
        const config = require('./../../../../utils/config');
        var style = {
            height:'calc(100% -  40px - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
         }
        return (
            <Fragment>
                <View className="components-page">
                    <Hearder titleText={this.state.header}  goback={true} background={true} toback={this.getback}></Hearder>
                    <View className="content" style={style}>
                        <View className="item">
                            <View className="title" >
                                <Image  mode="widthFix" className="icno" src={config.imgUrl+'icon.png'}/>
                                <View className="title_txt">博拉图宠物健康中心</View>
                            </View>
                            <View className="item_content">
                                <View className="item_child" onClick={this.goHospitaReferral.bind(this)}>
                                    <View className="item_child_text" >医院介绍</View>
                                    <Image  mode="widthFix" className="huiYou_child" src={imager.huiYou}/>
                                </View>
                                <View className="item_child" >
                                    <View className="item_child_text" >我院医生</View>
                                    <Image  mode="widthFix" className="huiYou_child" src={imager.huiYou}/>
                                </View>
                                <View className="item_child" >
                                    <View className="item_child_text" >公示信息</View>
                                    <Image  mode="widthFix" className="huiYou_child" src={imager.huiYou}/>
                                </View>
                                <View className="item_child" onClick={this.goContact.bind(this)}>
                                    <View className="item_child_text" >联系我们</View>
                                    <Image  mode="widthFix" className="huiYou_child" src={imager.huiYou}/>
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
        
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    return {
      
    }
  }
  export default connect(mapStateTopProps,mapDispatchToProps)(InRegardsHome)