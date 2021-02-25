import React, { Component } from 'react';
import { View,Input,Image,Text,ScrollView} from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import Hearder from './../../../commen/header/header';
import MySwiper from './../../../commen/MySwiper/MySwiper';
import {connect} from 'react-redux';
import { clickPublic } from './../../../commen/publiClick';
import * as imager from './assets';
import * as actionCreators from './store/actionCreators';
import * as actionCreatorsShoopInfo from './../../shoopstore/shoopPayBefore/shoopList/store/actionCreators';
import http from './../../../utils/http';
 class Index extends Component {
   constructor(props){
     super(props);
     this.state={
        menuList:[{
          imager:imager.table0,
          txt:"建卡绑卡",
          code:1
        },{
          imager:imager.table1,
          txt:"疫苗接种",
          code:2
        },{
          imager:imager.table2,
          txt:"体检套餐",
          code:3
        },{
          imager:imager.table3,
          txt:"关于本院",
          code:4
        },{
          imager:imager.table4,
          txt:"住院查询",
          code:5
        },{
          imager:imager.table5,
          txt:"自助缴费",
          code:6
        },{
          imager:imager.table6,
          txt:"病历查询",
          code:7
        },{
          imager:imager.table7,
          txt:"报告查询",
          code:8
        }]
     }
   }
   //监听taber
  onTabItemTap (item) {
    //判断授权
    if(clickPublic(item.pagePath)){

    }else{
      Taro.navigateTo({
          url: '/pages/impower/impower'　　// 页面 A
      })
      
    }
    
  }
  componentWillMount () {
    
  }

  componentDidMount () {
    console.log(1)
  }

  componentWillUnmount () {
    console.log(2)
  }

  componentDidShow () { 
    // this.props.selectShoopList(this)
  }

  componentDidHide () {
    console.log(4)
  }
  //咨询
  goconsultHome(){
      Taro.navigateTo({
        url: './../../../pages/home/consult/consultHome/consultHome'　　// 页面 A
      })
      
  }
  //挂号
  goappointment(){
    Taro.navigateTo({
      url: './../../../pages/home/registration/depList/depList'　　// 页面 A
    })
    
  }
  //cilckMenu
  cilckMenu(item){
    if(item.code===2){
      Taro.navigateTo({
        url: `./../../../pages/home/vaccine/vaccination/vaccination?b=${125}`
      })
      
    }else if(item.code===1){
      Taro.navigateTo({
        url: './../../../pages/myCenter/cardAdmin/cardList/cardList'
      })
    }else if(item.code===3){
      Taro.showToast({
        title:"功能暂未开通",
         icon:'none',
         duration:1000
       })
    }else if(item.code===4){
      Taro.navigateTo({
        url: './../../../pages/myCenter/inRegards/inRegardsHome/inRegardsHome'
      })
    }else if(item.code===5){
      Taro.navigateTo({
        url: './../../../pages/myCenter/seeDoctorInfo/residehospital/residehospital'
      })
    }else if(item.code===6){
      Taro.navigateTo({
        url: './../../../pages/myCenter/seeDoctorInfo/docTreatment/docTreatment'
      })
    }else if(item.code===7){
      Taro.navigateTo({
        url: './../../../pages/myCenter/seeDoctorInfo/caseHistory/caseHistory'
      })
      
    }else if(item.code===8){
      Taro.navigateTo({
        url: './../../../pages/myCenter/seeDoctorInfo/selectReport/selectReport'
      })
      
    }
  }
  goInRegardsHome(){
    Taro.navigateTo({
      url: './../../../pages/myCenter/inRegards/inRegardsHome/inRegardsHome'
    })
  }
  render () {
    var style = {
      height:'calc(100% -  40px - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
    }
    const config = require('./../../../utils/config');
    var banner = [{image_src:config.imgUrl+'banner1.png',type:0},{image_src:config.imgUrl+'banner2.png',type:1},{image_src:config.imgUrl+'banner3.png',type:2}]
    var shoopList = this.props.shoopList.toJS();
    return (
      <View className='components-page'>
        <View className="title">
          <Hearder titleText={this.props.header} background={true}></Hearder>
          {/* <View className="search">
            <View className="search_img">
              <Image  mode="widthFix" className="sousuo" src={imager.sousuo}/>
            </View>
            <Input type='text' className="inputValue" placeholder='搜索医生...'/>
          </View> */}
        </View>
        <ScrollView className='scrollview'
            scrollY
            scrollWithAnimation
            scrollTop={0}
            style={style}>
        {/* 轮播图 */}
        <View className="nav">
          <MySwiper banner={banner}  type={false}></MySwiper>
        </View>
        <View className="menu">
          {
            this.state.menuList.map((item,index)=>{
              return (
                <View className="menu_item" key={index} onClick={this.cilckMenu.bind(this,item)}>
                  <Image  mode="widthFix" className="table" src={item.imager}/>
                  <View className="menu_text">
                    {item.txt}
                  </View>
                </View>
              )
            })
          }
        </View>
        <View className="module">
          <View className="module_guahao">
            <Image  mode="widthFix" className="guahao" src={imager.guahao} onClick={this.goappointment.bind(this)}/>
          </View>
          <View className="module_zixun">
            <Image  mode="widthFix" className="zixun" src={imager.zixun} onClick={this.goconsultHome.bind(this)}/>
          </View>
        </View>
        {/* <View className="content">
          {
            shoopList.map((item,index)=>{
              return(
                <View className="content_item" key={index} onClick={this.props.goShoopINfo.bind(this,item)}>
                  <View className="item_left">
                    <Image  mode="widthFix" className="shoop_imgzhu" src={item.proMianPhoto}/>
                  </View>
                  <View className="item_right">
                    <View className="item_name">
                      {item.drugName}
                    </View>
                    <View className="item_infor">
                      {item.proDescription}
                    </View>
                    <View className="item_number">
                      已售{item.proSoldNumber}件
                    </View>
                    <View className="item_price">
                      <Text className="original_price">￥{item.proPlatform}</Text>
                      <Text className="now_price">专享价</Text>
                      <Text className="now_price_number">￥{item.proPrice}</Text>
                    </View>
                    <View className="item_bottom">
                      新品现货首买
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View> */}
        <View className="content">
          <View className="bottom_img" onClick={this.goInRegardsHome}>
              <Image  mode="widthFix" className="bottom_img" src={config.imgUrl+'0b9af3389b00cc41eaf718bc2201f0d.png'}/>
          </View>
          <View className="shoop_noshow">
            更多内容敬请期待
          </View>
        </View>
        </ScrollView>
      </View>
    )
  }
}
const mapStateTopProps = (state)=>{
  return {
      //头部信息
      header:state.getIn(['homeIndex','header']),
      // 商品列表
      shoopList:state.getIn(['homeIndex','shoopList']),
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    //查询三个商品
    selectShoopList(){
      var url = 'product/getHomeList';
      var prams = {
      }
      http.postRequest(url, prams,
        function (res) {
          if (res.errcode == 0) {
            var action = actionCreators.setShoopList(res.data);
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
      var action =  actionCreatorsShoopInfo.setProductId(item.productId)
      dispatch(action)
      Taro.navigateTo({
          url: '/pages/shoopstore/shoopPayBefore/shoopInfo/shoopInfo'
      })
      
    }
  }
}
export default connect(mapStateTopProps,mapDispatchToProps)(Index)
