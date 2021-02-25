import React, { Component } from 'react'
import { View, Text,Button } from '@tarojs/components'
import './impower.scss'
import {connect} from 'react-redux';
import http from './../../utils/http';
import * as actionCreators from './store/actionCreators';
import Taro from '@tarojs/taro'
import Hearder from './../../commen/header/header';
 class Index extends Component {
   constructor(props){
     super(props);
     this.state={
      header:'用户授权'
     }
   }
  componentWillMount () {
    var that = this;
    wx.login({
      success: function(res) {
        if (res.code) {
          that.props.setCode(res.code)
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }
  componentDidHide () { }
  //授权
  handleWXGetUserInfo = (res) => {
    
    var data = res.detail.userInfo;
    var avatar = data.avatarUrl;
    var nickname = data.nickName;
    var code = this.props.code;
    //请求
    var url  = 'system/userLogin'
    var prams = {
      avatar,
      nickname,
      code
    }
    http.postRequest(url,prams,
      function(res){
        console.log(1)
        console.log(res)
        wx.setStorageSync('token',res.data.token);
        wx.setStorageSync('avatar',res.data.avatar);
        wx.setStorageSync('nickname',res.data.nickname);
        wx.setStorageSync('avatar',res.data.avatar);
        Taro.navigateBack({
          delta: 1
        })
      },
      function(err){
        console.log(2)
        console.log(err)
      }
    )
    
  }
 
  noClick(){
    Taro.switchTab({
      url: '/pages/index/home/index'
    })
  }
  render () {
    var style = {
      height:'calc(100% - 30px - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')',
      top:wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 30 + 'px'
    }
    return (
      <View className='components-page'>
        <Hearder titleText={this.state.header}  background={true}></Hearder>
        <View className="content" style={style}>
            <View className="button">
              <Button className="ok_btn" openType='getUserInfo' onGetUserInfo={this.handleWXGetUserInfo.bind(this)}  bindtap="subTap">授权</Button>
              <Button className="no_btn" onClick={this.noClick.bind(this)}>取消授权</Button>
            </View>
        </View>
        {/* <Button onClick={this.noClick.bind(this)}>取消授权登录</Button>
        <Button openType='getUserInfo' onGetUserInfo={this.handleWXGetUserInfo.bind(this)}  bindtap="subTap">微信授权登录</Button> */}
      </View>
    )
  }
}
const mapStateTopProps = (state)=>{
  return {
    //code
    code:state.getIn(['impower','code'])
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    setCode(e){
      var action =actionCreators.codeInfo(e);
      dispatch(action);
    }
  }
}
export default connect(mapStateTopProps,mapDispatchToProps)(Index)
