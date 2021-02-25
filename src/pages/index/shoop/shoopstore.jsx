import React, { Component } from 'react'
import { View, Input,Image,Text,ScrollView } from '@tarojs/components'
import './shoopstore.scss'
import { clickPublic } from '../../../commen/publiClick';
import Hearder from '../../../commen/header/header';
import MySwiper from '../../../commen/MySwiper/MySwiper';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import * as imager from './../assager';
import http from '../../../utils/http';
import * as actionCreators from './store/actionCreators';
import * as actionCreatorsShoopInfo from '../../shoopstore/shoopPayBefore/shoopList/store/actionCreators';
class Shoopstore extends Component {
  constructor(props){
    super(props);
    this.state={
      shoopValue:'',
      butRo:false
    }
  }
  //监听taber
  onTabItemTap (item) {
    if(clickPublic(item.pagePath)){

    }else{
      Taro.navigateTo({
          url: '/pages/impower/impower'
      })
    }
  }
  componentWillMount () { 
    
  }

  componentDidMount () { }

  componentWillUnmount () { }
  //进入页面时判断是否需要授权
  componentDidShow () { 
    // if(wx.getStorageSync('token')==undefined||wx.getStorageSync('token')==''||wx.getStorageSync('token')==null||wx.getStorageSync('avatar')==undefined||wx.getStorageSync('avatar')==''||wx.getStorageSync('avatar')==null||wx.getStorageSync('nickname')==undefined||wx.getStorageSync('nickname')==''||wx.getStorageSync('nickname')==null){
    //   Taro.navigateTo({
    //     url: '/pages/impower/impower'　　
    //   })
    // }else{
      this.props.selectShoopListe(this)
    // }
  }

  componentDidHide () { }
  
  //点击进入购物车
  goCatShoop(){
    Taro.navigateTo({
        url: '/pages/shoopstore/shoopPayBefore/shoppingCart/shoppingCart'
    })
  }
  //输入框
  getshoopValue(e){
    var shoopValue = e.target.value;
    
    var butRo;
     
      if(shoopValue.length>0){
        butRo=true
      }else{
        butRo=false
      }
      this.setState({
        shoopValue:shoopValue,
        butRo:butRo
      })
  }
  render () {
    var style = {
      height:'calc(100% -  100px - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
    }
    const config = require('../../../utils/config');
    var banner = [{image_src:config.imgUrl+'shoopband1.png'},{image_src:config.imgUrl+'shoopband2.png'}]
    const shoopList = this.props.shoopList.toJS();
    return (
      <View className='components-page'>
        <View className="title">
          <Hearder titleText={this.props.header}  background={true}></Hearder>
          <View className="search">
            <View className="search_img">
              <Image  mode="widthFix" className="sousuo" src={imager.sousuo}/>
            </View>
            <Input type='text' onInput={this.getshoopValue.bind(this)} className="inputValue" value={this.state.shoopValue} placeholder='搜索商品...'/>
            {
              this.state.butRo?<View className="btn_sou" onClick={this.props.searchShoopList.bind(this)}>搜索</View>:''
            }
            
          </View>
          {/* <View className="nav">
            <View className="nav_list">
              <View className="nav_item" onClick={this.props.updateClick.bind(this, 0)}>
                <View className={this.state.selectType === 0 ? "item_text" : 'text_item'}>
                  医疗保健
                          </View>
                <View className={this.state.selectType === 0 ? "item_border" : ''}></View>
              </View>
              <View className="nav_item" onClick={this.props.updateClick.bind(this, 1)}>
                <View className={this.state.selectType === 1 ? "item_text" : 'text_item'}>
                  玩具日用
                          </View>
                <View className={this.state.selectType === 1 ? "item_border" : ''}></View>
              </View>
              <View className="nav_item" onClick={this.props.updateClick.bind(this, 2)}>
                <View className={this.state.selectType === 2 ? "item_text" : 'text_item'}>
                  口粮零食
                          </View>
                <View className={this.state.selectType === 2 ? "item_border" : ''}></View>
              </View>
              <View className="nav_item" onClick={this.props.updateClick.bind(this, 3)}>
                <View className={this.state.selectType === 3 ? "item_text" : 'text_item'}>
                  优惠促销
                          </View>
                <View className={this.state.selectType === 3 ? "item_border" : ''}></View>
              </View>
            </View>
          </View> */}
        </View>
        {/* <View className="content"> */}
          {/* 轮播图 */}
          <ScrollView className='content'
            scrollY
            scrollWithAnimation
            scrollTop={0}
            style={style}>
          <View className="banner">
            <MySwiper banner={banner} type={true}></MySwiper>
          </View>
          {
            shoopList.map((item,index)=>{
              return(
                <View className="shoop_type" key={index}>
                  <View className="shoop_nav">
                    <View className="shoop_nav_text">
                      <View className="lantiao"></View>
                      <View className="shoop_nav_txt">{item.name}</View>
                    </View>
                    <View className="iconAll">
                      <View className="icon_txt" onClick={this.props.goShoopList.bind(this,item)}>更多</View>
                      <View className="icon_img">
                        <Image  mode="widthFix" className="huiYou" src={imager.huiYou}/>
                      </View>
                    </View>
                  </View>
                  <View className="shoop_list">
                    {
                      item.list.map((item1,index1)=>{
                        return (
                          <View className="shoop_item" key={index1}  onClick={this.props.goShoopINfo.bind(this,item1)}>
                            <View className="shoopImg">
                                <Image  mode="widthFix" className="shoop_imgzhu" src={item1.proMianPhoto}/>
                            </View>
                            <View className="shoopInfo">
                                <View className="shoop_name">{item1.drugName}</View>
                                <View className="shoop_pinc">{item1.proDescription}</View>
                                <View className="shoop_shiyong">7 ~ 15kg犬可用</View>
                                <View className="shoop_price"><Text className="shishou">￥{item1.proPlatform}</Text><Text className="yaunjia">￥{item1.proPrice}</Text></View>
                                <View className="xiaoliang"></View>
                            </View>
                          </View>
                        )
                      })
                    }
                        
                    
                  </View>
                </View>
              )
            })
          }
                
          
          </ScrollView> 
        {/* </View> */}
        <View className="gouwuche" onClick={this.goCatShoop.bind(this)}>
          <Image  mode="widthFix" className="wuche" src={imager.gouwuche}/>
        </View>
      </View>
    )
  }
}
const mapStateTopProps = (state)=>{
  return {
      //头部信息
      header:state.getIn(['shoopStore','header']),
      shoopList:state.getIn(['shoopStore','shoopList'])
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    //查询数据列表
    selectShoopListe(that){
      var url = 'product/getListWx';
      var prams = {
      }
      http.postRequest(url, prams,
        function (res) {
          if (res.errcode === 0) {
            var action = actionCreators.setList(res.data);
            dispatch(action)
          }
        },
        function (err) {
          console.log(err)
        }
      )
    },
     //点击进入详情页
     goShoopINfo(item){
      var action =  actionCreatorsShoopInfo.setProductId(item.productId);
      dispatch(action);
      Taro.navigateTo({
          url: '/pages/shoopstore/shoopPayBefore/shoopInfo/shoopInfo'
      })
    },
    //跳转到列表页
    goShoopList(item){
      var action = actionCreatorsShoopInfo.setProOfficial(item.type);
      var shoopListInfo = actionCreatorsShoopInfo.setShoopList([]);
      var actions = actionCreatorsShoopInfo.setShoopValue('');
      dispatch(actions);
      dispatch(shoopListInfo);
      dispatch(action);
      Taro.navigateTo({
        url: '/pages/shoopstore/shoopPayBefore/shoopList/shoopList'　　
      })
    },
    
    //搜索进入列表页
    searchShoopList(){
      var action = actionCreatorsShoopInfo.setShoopValue(this.state.shoopValue);
      dispatch(action);
      var actions = actionCreatorsShoopInfo.setProOfficial('');
      dispatch(actions);
      var shoopListInfo = actionCreatorsShoopInfo.setShoopList([]);
      dispatch(shoopListInfo);
      Taro.navigateTo({
        url: '/pages/shoopstore/shoopPayBefore/shoopList/shoopList'　　
      })
    }
  }
}
export default connect(mapStateTopProps,mapDispatchToProps)(Shoopstore)
