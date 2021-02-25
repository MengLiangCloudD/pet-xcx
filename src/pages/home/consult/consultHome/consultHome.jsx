import React, { Component } from 'react'
import { View, Text,Image } from '@tarojs/components'
import './consultHome.scss'
import Hearder from '../../../../commen/header/header';
import {connect} from 'react-redux'
import * as images from './../assets'
import Taro from '@tarojs/taro'
import http from './../../../../utils/http'
//支付的reduc
import * as actionCreators from './../../../paymentOrder/store/actionCreators';
import * as actionCreatorsDialogueBox from './../dialogueBox/store/actionCreators';
class ConsultHome extends Component{
    constructor(props){
        super(props)
        this.state={
            header:'在线咨询'
        }
    }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }
  //进入页面时判断是否需要授权
  componentDidShow () { 
    if(wx.getStorageSync('token')==undefined||wx.getStorageSync('token')==''||wx.getStorageSync('token')==null||wx.getStorageSync('avatar')==undefined||wx.getStorageSync('avatar')==''||wx.getStorageSync('avatar')==null||wx.getStorageSync('nickname')==undefined||wx.getStorageSync('nickname')==''||wx.getStorageSync('nickname')==null){
      Taro.navigateTo({
        url: '/pages/impower/impower'　　
      })
      
    }else{
      
    }
  }
  componentDidHide () { }
  //返回上一层
  getback(){
    Taro.switchTab({
      url: '/pages/index/home/index',
    });
  }
  render () {
    const config = require('./../../../../utils/config');
    return (
      <View className='components-page'>
          <Hearder titleText={this.state.header} goback={true} toback={this.getback}></Hearder>
          <Image  mode="widthFix" className="imager" src={config.imgUrl+'zixunTitler.png'}/>
          <View className="content">
              <View className="content_title">
                  <View className="nav"></View>
                  <View className="nav_text1">用户评价</View>
              </View>
              <View className="content_evaluate">
                  <View className="evaluate_list">
                    <View className="evaluate_Item">
                        <View className="Item_title">
                            <View className="img">

                            </View>
                            <View className="name">
                                孙**
                            </View> 
                        </View>
                        <Text className="evaluate_content">
                            耐心的医生，非常感谢
                        </Text>
                    </View>
                    <View className="evaluate_Item">
                        <View className="Item_title">
                            <View className="img">

                            </View>
                            <View className="name">
                                张**
                            </View> 
                        </View>
                        <Text className="evaluate_content">
                            刚咨询，马上回复很有耐心，讲解详细。
                        </Text>
                    </View>
                    <View className="evaluate_Item">
                        <View className="Item_title">
                            <View className="img">

                            </View>
                            <View className="name">
                                李**
                            </View> 
                        </View>
                        <Text className="evaluate_content">
                            医生生很专业~很细心。
                        </Text>
                    </View>
                    <View className="evaluate_Item">
                        <View className="Item_title">
                            <View className="img">

                            </View>
                            <View className="name">
                                田**
                            </View> 
                        </View>
                        <Text className="evaluate_content">
                          刚咨询，马上回复很有耐心，讲解详细。
                        </Text>
                    </View>
                    <View className="evaluate_Item">
                        <View className="Item_title">
                            <View className="img">

                            </View>
                            <View className="name">
                                王**
                            </View> 
                        </View>
                        <Text className="evaluate_content">
                            耐心的医生，非常感谢
                        </Text>
                    </View>
                  </View>
              </View>
          </View>
          {/* <View className="petContent">
              <View className="petContent_title">
                  <View className="nav"></View>
                  <View className="nav_text">宠物档案</View>
              </View>
              <View className="petContent_content">
                <View className="petContent_infor">
                  <View className="test"><Text>一卡通卡号：</Text><Text>123456</Text></View>
                  <View className="test"><Text>宠&nbsp;物&nbsp;昵&nbsp;称：</Text><Text>团子</Text></View>
                  <View className="test"><Text>宠&nbsp;物&nbsp;种&nbsp;类：</Text><Text>哈士奇</Text></View>
                </View>
                <View className="petContent_jian">
                  <Image className="imager" src={images.youjian}/>
                </View>
              </View>
          </View> */}
          <View className="iciont">
             <Image className="imager" src={images.chongwu}/>
             <View className="biaoti"><Text>您的宠物专家</Text></View>
             <View className="biaoti2"><Text>YOUR PET EXPERT</Text></View>
          </View>
          <View className="bottom">
            <View className="btn" onClick={this.props.goPaymentOrder.bind(this)}>
              <View className="text">立即咨询</View>
              {/* <View className="text1">30分钟/15元</View> */}
            </View>
          </View>
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
      goPaymentOrder(){
        var url = 'consult/genarateOrder';
        var prams = {
          im_price_id:123,
          card_id:'123456',
          pet_id:'123456'
        }
        http.postRequest(url,prams,
          function(res){
            if(res.errcode==0){
              // 暂时不需要支付了
                // var orderNoaction =actionCreators.getorderNo(res.data.order_id);
                // var orderTypeaction =  actionCreators.getType(1);
                // var priceAction= actionCreators.getPrice(0.01);
                // dispatch(orderNoaction);
                // dispatch(orderTypeaction);
                // dispatch(priceAction);
                // Taro.navigateTo({
                //   url: '/pages/paymentOrder/paymentOrder'　　
                // })
                var orderAction =  actionCreatorsDialogueBox.setOrderNo(res.data.order_id);
                dispatch(orderAction);
                var orderCodeAction =  actionCreatorsDialogueBox.setOrderCode(res.data.order_code);
                dispatch(orderCodeAction)
                Taro.navigateTo({
                    url: '/pages/home/consult/dialogueBox/dialogueBox'　　
                })
                
            }else{
              Taro.showToast({
                title:res.errmsg,
                 icon:'none',
                 duration:1000
               })
            }
            
          },
          function(err){
            console.log(err)
          }
        )
        
      }
    }
}
  export default connect(mapStateTopProps,mapDispatchToProps)(ConsultHome)