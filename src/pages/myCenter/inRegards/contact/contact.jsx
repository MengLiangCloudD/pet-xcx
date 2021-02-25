import React, { Component,Fragment } from 'react'
import { View, Text,Image } from '@tarojs/components'
import './contact.scss'
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import http from './../../../../utils/http';
import * as imager from './../../assager';
class Contact extends Component{
    constructor(props){
        super(props);
        this.state={
            header:'联系我们'
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
                    <View className="content" style={style}>
                        <View className="item">
                            <View className="item_child">电话：0913-5454545</View>
                            <View className="item_child">邮箱：meng15991896157@163.com</View>
                            <View className="item_child">地址：北京市东三环</View>
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
  export default connect(mapStateTopProps,mapDispatchToProps)(Contact)