
import React, { Component } from 'react'
import { View,Image,Swiper,SwiperItem } from '@tarojs/components'
import './MySwiper.scss'
import {connect} from 'react-redux';
import Taro from '@tarojs/taro'
class MySwiper extends Component {
  //构造函数第一个执行
  tableTiao(type){
    if(type===2){
      Taro.navigateTo({
        url: '/pages/home/consult/consultHome/consultHome'　　// 页面 A
      })
      
    }
    if(type===1){
      Taro.navigateTo({
        url: './../../../pages/home/registration/depList/depList'　　// 页面 A
      })
    }
    if(type===0){
      Taro.navigateTo({
        url: './../../../pages/myCenter/inRegards/inRegardsHome/inRegardsHome'
      })
    }
  }
  render () {
      var {banner,type} = this.props;
    return (
      <View>
        {
          type
          ?<Swiper
            className="swiper"
            circular
            indicatorDots
            indicatorColor='#999'
            indicatorActiveColor='#fff'
            autoplay>
              { 
                banner.map((item,index)=>{
                    return(
                        <SwiperItem key={index} onClick={this.tableTiao.bind(this,item.type)}>
                            <Image className="swiperImg" src={item.image_src}/>
                        </SwiperItem>
                    )
                    
                })
              }
          </Swiper>
          :<Swiper
            className="swiper1"
            circular
            indicatorDots
            indicatorColor='#999'
            indicatorActiveColor='#fff'
            autoplay>
              { 
                banner.map((item,index)=>{
                    return(
                        <SwiperItem key={index} onClick={this.tableTiao.bind(this,item.type)}>
                            <Image className="swiperImg1" src={item.image_src}/>
                        </SwiperItem>
                    )
                    
                })
              }
          </Swiper>
        }
        
      </View>
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
export default connect(mapStateTopProps,mapDispatchToProps)(MySwiper)