import React, { Component } from 'react'
import { View, Text,Image,ScrollView,Button } from '@tarojs/components'
import './myCenter.scss'
import { clickPublic } from '../../../commen/publiClick';
import Hearder from '../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import * as imager from '../assager';
import http from '../../../utils/http';
import * as actionCreators from './store/actionCreators';
import * as cardAdmiAactionCreators from './../../myCenter/cardAdmin/cardList/store/actionCreators';
import * as actionCreatorSite from './../../myCenter/MyAddress/addressList/store/actionCreators';
import config from '../../../utils/config';
class MyCenter extends Component {
  constructor(props){
    super(props);
    this.state={
      cardMap:{}
    }
  }
  //监听taber
  onTabItemTap (item) {
    console.log(clickPublic(item.pagePath))
    if(clickPublic(item.pagePath)){
      console.log(item.index)
      console.log(item.pagePath)
      console.log(item.text)
    }else{
      Taro.navigateTo({
          url: '/pages/impower/impower'　　// 页面 A
      })
      
    }
  }
  componentWillMount(){
    
  }
  componentDidMount () { 
   
  }

  componentWillUnmount () { }
  //进入页面时判断是否需要授权
  componentDidShow () { 
    // if(wx.getStorageSync('token')==undefined||wx.getStorageSync('token')==''||wx.getStorageSync('token')==null||wx.getStorageSync('avatar')==undefined||wx.getStorageSync('avatar')==''||wx.getStorageSync('avatar')==null||wx.getStorageSync('nickname')==undefined||wx.getStorageSync('nickname')==''||wx.getStorageSync('nickname')==null){
    //   Taro.navigateTo({
    //     url: '/pages/impower/impower'　　
    //   })
    // }else{
      this.props.getUserInfo(this);
    // }
    
  }

  componentDidHide () { }
  //我的挂号
  goRegisterList(){
    Taro.navigateTo({
      url: '/pages/myCenter/registerOrder/registerList/registerList'　　
    })
    
  }
  // 订单列表
  goVaccinOrderList(){
    Taro.navigateTo({
      url: '/pages/myCenter/vaccinOrder/vaccinOrderList/vaccinOrderList'　　
    })
    
  }
   // 疫苗订单列表
   goMyShoopOrder(){
    Taro.navigateTo({
      url: '/pages/myCenter/myShoopOrder/myShoopOrder'　　
    })
    
  }
  
  //就诊信息
  goSeeInfoHome(){
    Taro.navigateTo({
      url: '/pages/myCenter/seeDoctorInfo/seeInfoHome/seeInfoHome'　　
    })
    
    
  }
  //咨询订单
  goMyConsultOrder(){
    Taro.navigateTo({
      url: '/pages/home/consult/consultOrder/consultOrder'　　
    })
    
  }
  //关于本院
  goInRegardsHome(){
    Taro.navigateTo({
      url: '/pages/myCenter/inRegards/inRegardsHome/inRegardsHome'　　
    })
    
  }
  
  //排号
  rowNumber(){
    Taro.navigateTo({
      url: '/pages/myCenter/queueNumber/rowNumber/rowNumber'　　
    })
    
  }
  handleContact (e) {
        console.log(e.detail.path)
        console.log(e.detail.query)
    }
  render () {
    var style = {
       height:'calc(100% -  40px - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
    }
    var userInfos = this.props.userInfo;
    var userInfo = userInfos.toJS();
    return (
      <View className='components-page'>
          <Hearder titleText={this.props.header} background={true}></Hearder>
          <View className="content" style={style}>
          <ScrollView className='scrollview'
            scrollY
            scrollWithAnimation
            scrollTop={0}
            style='height: 100%;'>
            <View className='nav'>
              <View className="nav_content">
                <View className="hearder_img">
                  <Image  mode="widthFix" className="avatar" src={userInfo.avatar}/>
                </View>
                <View className="user_info">
                  <View className="user_name">{userInfo.nickname}</View>
                  <View className="integral">
                    <View className="integral_img">

                    </View>
                    <View className="integral_text">
                      积分：{userInfo.integral}
                    </View>
                  </View>
                </View>
              </View>
              <View className="paihao" onClick={this.rowNumber.bind(this)}>排号</View>
            </View>
            <View className="content_item">
              <View className="item_nav">
                <View className="item_nav_title" onClick={this.props.goCarder.bind(this)}>
                  <Image  mode="widthFix" className="icno" src={imager.icon0}/>
                  <View className="item_nav_title_text">一卡通管理</View>
                  <Image  mode="widthFix" className="huiYou" src={imager.huiYou}/>
                </View>
                {
                  JSON.stringify(this.state.cardMap)==="{}"||this.state.cardMap===null
                  ?<View className="item_nav_content">
                    <View className="item_nav_content_text1">
                      暂未添加一卡通，请前往添加
                    </View>
                  </View>
                  :<View className="item_nav_content">
                    <View className="item_nav_content_text">
                      <Text>一卡通卡号：</Text>
                      <Text>{this.state.cardMap.card_no}</Text>
                    </View>
                    <View className="item_nav_content_text">
                      <Text>宠&nbsp;物&nbsp;昵&nbsp;称：</Text>
                      <Text>{this.state.cardMap.name}</Text>
                    </View>
                    <View className="item_nav_content_text">
                      <Text>宠&nbsp;物&nbsp;种&nbsp;类：</Text>
                      {
                        this.state.cardMap.nation==="01"?<Text>小狗</Text>:this.state.cardMap.nation==="02"?<Text>小猫</Text>:<Text>其他</Text>
                      }
                    </View>
                  </View>
                }
                
              </View>
              <View className="item">
                 <View className="item_child" onClick={this.goRegisterList.bind(this)}>
                    <Image  mode="widthFix" className="icno_child" src={imager.icon1}/>
                    <View className="item_child_text" >我的挂号</View>
                    <Image  mode="widthFix" className="huiYou_child" src={imager.huiYou}/>
                 </View>
                 <View className="item_child" onClick={this.goSeeInfoHome.bind(this)}>
                    <Image  mode="widthFix" className="icno_child" src={imager.icon5}/>
                    <View className="item_child_text">就诊信息</View>
                    <Image  mode="widthFix" className="huiYou_child" src={imager.huiYou}/>
                 </View>
                 <View className="item_child" onClick={this.goVaccinOrderList.bind(this)}>
                    <Image  mode="widthFix" className="icno_child" src={imager.icon3}/>
                    <View className="item_child_text">疫苗订单</View>
                    <Image  mode="widthFix" className="huiYou_child" src={imager.huiYou}/>
                 </View>
                 <View className="item_child" onClick={this.goMyConsultOrder.bind(this)}>
                    <Image  mode="widthFix" className="icno_child" src={imager.icon4}/>
                    <View className="item_child_text" >我的咨询</View>
                    <Image  mode="widthFix" className="huiYou_child" src={imager.huiYou}/>
                 </View>
                 <View className="item_child" onClick={this.goMyShoopOrder.bind(this)}>
                    <Image  mode="widthFix" className="icno_child" src={imager.icon2}/>
                    <View className="item_child_text">商城订单</View>
                    <Image  mode="widthFix" className="huiYou_child" src={imager.huiYou}/>
                 </View>
                 <View className="item_child" onClick={this.props.goAddressList.bind(this)}>
                    <Image  mode="widthFix" className="icno_child" src={imager.icon6}/>
                    <View className="item_child_text"  >收货地址</View>
                    <Image  mode="widthFix" className="huiYou_child" src={imager.huiYou}/>
                 </View>
                 <View className="item_child" onClick={this.goInRegardsHome.bind(this)}>
                    <Image  mode="widthFix" className="icno_child" src={imager.icon7}/>
                    <View className="item_child_text">关于本院</View>
                    <Image  mode="widthFix" className="huiYou_child" src={imager.huiYou}/>
                 </View>
                 <View className="item_child"  >
                    <Image  mode="widthFix" className="icno_child icno_child1" src={config.imgUrl +'keff.png'}/>
                    <View className="item_child_text">在线客服</View>
                    <Image  mode="widthFix" className="huiYou_child" src={imager.huiYou}/>
                    <Button open-type="contact" bindcontact={this.handleContact} className="kefu">客服</Button>
                 </View>
              </View>
              
            </View>
            </ScrollView>
          </View>
      </View>
    )
  }
}

const mapStateTopProps = (state)=>{
  return {
      //头部信息
      header:state.getIn(['myCenter','header']),
      //用户个人信息
      userInfo:state.getIn(['myCenter','userInfo'])
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    getUserInfo(that){
      var url = 'center/data';
      var prams = {

      }
      http.postRequest(url,prams,
        function(res){
          if(res.errcode===0){
            if(res.data.cardMap.errcode===0){
              var map = res.data.cardMap.data;
              that.setState({
                cardMap:map
              })
            }
            var action = actionCreators.setUserInfo(res.data);
            dispatch(action);
          }
        },
        function(err){

        }
      )
    },
    // 收货地址
    goAddressList(){
      var action = actionCreatorSite.MydoORlook(1);
              dispatch(action)
      Taro.navigateTo({
        url: '/pages/myCenter/MyAddress/addressList/addressList'　　
      })
      
    },
    // 一卡通管理
    goCarder(){
      var action = cardAdmiAactionCreators.setSelectStart(0);
      dispatch(action);
      Taro.navigateTo({
        url: '/pages/myCenter/cardAdmin/cardList/cardList'　　
      })
    }
  }
}
export default connect(mapStateTopProps,mapDispatchToProps)(MyCenter)