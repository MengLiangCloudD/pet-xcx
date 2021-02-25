import React, { Component,Fragment } from 'react'
import { View, Text,ScrollView,Image,Input,Picker  } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
import './bindingCarder.scss'
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import http from './../../../../utils/http';
import * as actionCreators from './store/actionCreators';
import setTimeout from './../setTimeout';
class AddPet extends Component {
    constructor(props){
        super(props);
        this.state={
            header:"绑定一卡通",
            codeStart:false,
            time:60,
            phone:'',
            code:''
        }
    }
    //返回上一层
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    //获取验证码
    send(){
        var phone = this.state.phone.trim();
        if(phone===''){
            Taro.showToast({
                title:'请先填写手机号',
                icon:'none',
                duration:1000
            })
            
        }else if(!(/^1[3456789]\d{9}$/.test(phone))){
            Taro.showToast({
                title:'号码格式有误',
                icon:'none',
                duration:1000
            })
        }else{
            setTimeout.getCode(phone,this,http)
        }
        
    }
    //绑定
    bindCard(){
        var that = this;
        var url = "card/queryCardsByPhoneNumber";
        var phone = that.state.phone;
        var code = that.state.code;
        if(phone===''){
            Taro.showToast({
                title:'请先填写手机号',
                icon:'none',
                duration:1000
            })
            return
        }else if(!(/^1[3456789]\d{9}$/.test(phone))){
            Taro.showToast({
                title:'号码格式有误',
                icon:'none',
                duration:1000
            })
            return
        }
        if(code===''){
            Taro.showToast({
                title:'请先填写验证码',
                icon:'none',
                duration:1000
            })
            return
        }
        var prams = {
            phone:phone,
            code:code
        }
        http.postRequest(url,prams,
            function(res){
              if(res.errcode===0){
                Taro.showToast({
                    title:'绑卡成功',
                    icon:'none',
                    duration:1000
                })
                that.getback();
              }else{
                Taro.showToast({
                    title:res.errmsg,
                    icon:'none',
                    duration:1000
                })
              }
            }, 
            function(err){
  
            }
          )
    }
    changeValue(type,e){
        if(type==='phone'){
            this.setState({
                phone:e.target.value
            })
        }else if(type==='code'){
            this.setState({
                code:e.target.value
            })
        }
        
    }
    render(){
        const style = {
            height:'calc(100% -  40px - 13.33333rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        return (
            <Fragment>
                <View className="title">
                    <Hearder titleText={this.state.header} goback={true} background={true} toback={this.getback}></Hearder>
                </View>
                <ScrollView className='content'
                    scrollY
                    scrollWithAnimation
                    scrollTop={0}
                    style={style}>
                        <View className="item itemPhone">
                            <Text className="item_title">主人联系方式：</Text>
                             <Input type='text' className="inputValue" placeholder='请填写' value={this.state.phone} onInput={this.changeValue.bind(this,'phone')}/>
                        </View>
                        {
                            this.state.codeStart
                            ?<View className="btn_code btn_code1">
                                {this.state.time}后获取
                            </View>
                            :<View className="btn_code" onClick={this.send.bind(this)}>
                                获取验证码
                            </View>
                        }
                        <View className="item">
                            <Text className="item_title">手机验证码：</Text>
                             <Input type='text' className="inputValue" placeholder='请填写' value={this.state.code} onInput={this.changeValue.bind(this,'code')}/>
                        </View>
                        <View className="bottom">
                            <View className="btn_bottom" onClick={this.bindCard.bind(this)}>确定</View>
                        </View>
                        
                    </ScrollView>
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
export default connect(mapStateTopProps,mapDispatchToProps)(AddPet);