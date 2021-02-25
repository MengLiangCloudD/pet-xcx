import React, { Component,Fragment } from 'react'
import { View, Text,Image } from '@tarojs/components'
import './rowNumber.scss'
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import http from './../../../../utils/http';
import * as actionCreators from './store/actionCreators';
import SelactCard from './../../../../commen/selactCard/selactCard';
import selectCardList from './../../../../commen/selectCardList';
class InRegardsHome extends Component{
    constructor(props){
        super(props);
        this.state={
            header:'排号',
            seit:'',
            cardList:[]
        }
    }
    componentWillMount(){
        var that = this;
        Taro.getLocation({
            type: 'wgs84',
            success: function (res) {
                console.log(res)
              that.getLatLong(res,that)
            }
        })
        this.props.settimeRedux(this);
      }
    //返回上一层
    getback(){
        Taro.switchTab({
            url: '/pages/index/myCenter/myCenter',
        });
    }
    //排号列表
    goRowList(seit){
        if(seit<500){
            Taro.navigateTo({
                url: '/pages/myCenter/queueNumber/rowList/rowList'　　
            })
        }else{
            Taro.showToast({
                title: '距离过远，无法预约',
                icon: 'none',
                duration: 2000
              })
        }
        
    }
    getLatLong(item,that){
        console.log(item)
        var url = 'register/calculateDistance';
        var prams = {
            longitude:item.longitude,
            latitude:item.latitude
        }
        http.postRequest(url, prams,
            function (res) {
                console.log(res.data)
                if (res.errcode === 0) {
                    that.setState({
                        seit:res.data
                    })
                }
            },
            function (err) {
                console.log(err)
            }
        )
    }
    getSelectCard(card,thats){
        thats.props.getList(card);
        thats.setState({
            card:card
        })
    }
    componentDidShow(){
        var that = this;
            selectCardList.getCardList().then(res=>{
                that.setState({
                    cardList:res
                })
            })
    }
    render(){
        const config = require('./../../../../utils/config');
        var style = {
            height:'calc(100% -  40px - 14.66667rpx - 14.66667rpx - 80.66667rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
         }
         var style1 = {
            height:'calc(100% - 40px - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        var TodarRegisterList = this.props.TodarRegisterList.toJS();
        return ( 
            <Fragment>
                <View className="components-page">
                    <Hearder titleText={this.state.header}  goback={true} background={true} toback={this.getback}></Hearder>
                    {
                        this.state.cardList.length>0?<SelactCard cardList={this.state.cardList} thats={this} selectCard={this.getSelectCard}></SelactCard>:''
                    }
                    <View className="content" style={this.state.cardList.length>0?style:style1}>
                        <View className="title">
                            <View className="title_nav">
                                <View className="nav_biao"></View>
                                <View className="nav_text2">宠物档案</View>
                            </View>
                            {
                                JSON.stringify(TodarRegisterList)!=='{}'
                                ?<View className="title_content">
                                    <View className="text">
                                        <Text>一卡通卡号：</Text>
                                        <Text>{TodarRegisterList.card_no}</Text>
                                    </View>
                                    <View className="text">
                                        <Text>宠&nbsp;物&nbsp;昵&nbsp;称：</Text>
                                        <Text>{TodarRegisterList.pet_name}</Text>
                                    </View>
                                    <View className="text">
                                        <Text>宠&nbsp;物&nbsp;种&nbsp;类：</Text>
                                        <Text>{TodarRegisterList.charge_type}</Text>
                                    </View>
                                </View>
                                :<View className="tishixinxi">
                                    今日无预约挂号
                                </View>
                            }
                            
                        </View>
                        <View className="subject">
                            <View className="subject_title">
                                <Image  mode="widthFix" className="jinggao" src={config.imgUrl+'jinggao.png'}/>
                                
                                {
                                    JSON.stringify(TodarRegisterList)!=='{}'?<View className="jinggao_txt">当前距离{this.state.seit}米</View>:<View className="jinggao_txt">今日无预约挂号</View>
                                }
                            </View>
                            <View className="subject_content">
                                <View className= {this.state.seit>500?"content_time content_time1":"content_time"} onClick={this.goRowList.bind(this,this.state.seit)}>
                                    <View className="buton_time">立即挂号</View>
                                    <View className="time_value">{this.props.time}</View>
                                </View>
                            </View>
                        </View>
                        <View className="bottom">
                            *距离医院500米以内可以直接在此排号
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
        TodarRegisterList:state.getIn(['rowNumber','TodarRegisterList'])
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    return {
      settimeRedux(that){
          setInterval(() => {
                that.props.setTime()
          }, 1000);
      },
      //获取当前时间
      setTime(){
        var d=new Date();
        //获取小时
        var h=d.getHours();// 16下午4点     24小时制
        if(h<10){
            h = '0' + h;
        }
        //获取分钟
        var m=d.getMinutes();//31分
        if(m<10){
            m = '0' + m;
        }
        //获取描述
        var s=d.getSeconds();//50秒
        if(s<10){
            s = '0' + s;
        }
        var time = h+"："+m+"："+s;
        var action = actionCreators.setTime(time);
        dispatch(action)
      },
      getList(card){
        var url = 'register/queryTodarRegister';
        var card_no = card;
        var prams = {
            card_no:card_no
        }
        http.postRequest(url,prams, 
          function(res){
            if(res.errcode===0&&res.data!==null){
                var action = actionCreators.setTodarRegisterList(res.data);
                dispatch(action);
            }
          },
          function(err){
        
          }
        )
      }
    }
  }
  export default connect(mapStateTopProps,mapDispatchToProps)(InRegardsHome)