import React, { Component,Fragment } from 'react'
import { View, Text,ScrollView,Image } from '@tarojs/components'
import './cardList.scss'
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import http from './../../../../utils/http';
import * as actionCreators from './store/actionCreators';
import * as actionCreatorsPetFile from './../petFile/store/actionCreators';
import * as imager from './../assager'
class CardList extends Component{
    constructor(props){
        super(props);
        this.state={
            header:'一卡通管理',
            zheStart:false
        }
    }
    componentDidMount(){
        if(this.props.selectStart!==0){
            this.setState({
                header:'选择一卡通'
            })
        }
        
    }
    //由于返回上一层只能在这个方法调用
    componentDidShow () { 
        if(wx.getStorageSync('token')==undefined||wx.getStorageSync('token')==''||wx.getStorageSync('token')==null||wx.getStorageSync('avatar')==undefined||wx.getStorageSync('avatar')==''||wx.getStorageSync('avatar')==null||wx.getStorageSync('nickname')==undefined||wx.getStorageSync('nickname')==''||wx.getStorageSync('nickname')==null){
          Taro.navigateTo({
            url: '/pages/impower/impower'　　
          })
        }else{
            this.props.getCarderList(this);
        }
      }
    //返回上一层
    getback() {
        var selectStart = this.props.selectStart;
        if(selectStart===0){
            Taro.switchTab({
                url: '/pages/index/myCenter/myCenter',
            });
        }else if(selectStart===1){
            Taro.navigateBack({
                delta: 1
            })
        }else if(selectStart===2){
            Taro.navigateBack({
                delta: 1
            })
        }
            
    }
    //打开遮罩层
    addZhe(){
        this.setState({
            zheStart:true
        })
    }
    //关闭遮罩层
    closeZhe(){
        this.setState({
            zheStart:false
        })
    }
    render(){
        const style = {
            height:'calc(100% -  40px - 69.33333rpx - 0.66667rpx - 0.66667rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        const zheStlay = {
            height:'calc(100% -  40px - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')',
            top:'calc(40px  + ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        const cardList = this.props.cardList.toJS();
        const config = require('./../../../../utils/config');
        return (
            <Fragment>
                {
                    this.state.zheStart
                    ?<View className="zhe" style={zheStlay} onClick={this.closeZhe.bind(this)}>
                        <View className="select_addtype">选择添加方式</View>
                        <View className="addtype" onClick={this.props.goAddCarder.bind(this)}>新建一卡通</View>
                        <View className="addtype" onClick={this.props.goBindingCarder.bind(this)}>绑定已有的一卡通</View>
                    </View>
                    :''
                }
                
                <View className="title">
                    <Hearder titleText={this.state.header}  goback={true} toback={this.getback.bind(this)}></Hearder>
                    <View className="addBtn" onClick={this.addZhe.bind(this)}>新建（绑定）一卡通</View>
                </View>
                <ScrollView className='content'
                    scrollY
                    scrollWithAnimation
                    scrollTop={0}
                    style={style}>
                        {
                            cardList.length>0?
                            cardList.map((item,index)=>{
                                return (
                                    <View className="content_item" key={index} onClick={this.props.goPetFile.bind(this,item)}>
                                        <View className="card_no">
                                            <Text>一卡通卡号：</Text>
                                            <Text>{item.card_no}</Text>
                                        </View>
                                        <View className="user_name">
                                            <Text>主&nbsp;人&nbsp;姓&nbsp;名：</Text>
                                            <Text>{item.user_name}</Text>
                                        </View>
                                        <View className="phone_no">
                                            <Text>联&nbsp;系&nbsp;方&nbsp;式：</Text>
                                            <Text>{item.phone_number}</Text>
                                        </View>
                                        <Image  mode="widthFix" className="youjian" src={imager.youjian}/>
                                    </View>
                                )
                            }):<View className="que">
                                <Image  mode="widthFix" className="que" src={config.imgUrl+'noContent.png'}/>
                            </View>
                        }
                </ScrollView>

            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        //卡列表
        cardList:state.getIn(["cardList","cardList"]),
        //状态
        selectStart:state.getIn(["cardList","selectStart"])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        //查询就诊卡列表
        getCarderList(){
            var url = 'card/queryCardsList';
            var prams= {

            }
            http.postRequest(url,prams,
                function(res){
                    if(res.errcode===0){
                        var action = actionCreators.setCardList(res.data);
                        dispatch(action);
                    }
                },
                function(err){

                }
            )
        },
        // 宠物档案
        goPetFile(item){
            var selectStart = this.props.selectStart;
            var action = actionCreatorsPetFile.setUserInfo(item);
            dispatch(action);
            if(selectStart!==0){
                Taro.redirectTo({
                    url: '/pages/myCenter/cardAdmin/petFile/petFile'　　 
                })
            }else{
                Taro.navigateTo({
                    url: '/pages/myCenter/cardAdmin/petFile/petFile'　　 
                })
            }
            
        },
        //新建就诊卡
        goAddCarder(){
            Taro.navigateTo({
                url: '/pages/myCenter/cardAdmin/addCarder/addCarder'　　 
            })
        },
        //绑定已有的卡
        goBindingCarder(){
            Taro.navigateTo({
                url: '/pages/myCenter/cardAdmin/bindingCarder/bindingCarder'　　 
            })
        },
    }
}
export default connect(mapStateTopProps,mapDispatchToProps)(CardList)