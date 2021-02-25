import React,{ Component,Fragment } from 'react';
import { View, Text,ScrollView,Image,Input } from '@tarojs/components';
import './changePassword.scss';
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import http from './../../../../utils/http';
class ChangePassword extends Component{
    constructor(props){
        super(props);
        this.state={
            header:'修改密码',
            oldPassword:'',
            newPassword:'',
            newPassword1:''
        }
    }
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    changeValue(type,e){
        if(type==="oldPassword"){
            this.setState({
                oldPassword:e.target.value
            })
        }
        if(type==="newPassword"){
            this.setState({
                newPassword:e.target.value
            })
        }
        if(type==="newPassword1"){
            this.setState({
                newPassword1:e.target.value
            })
        }
    }
    submitPassword(){
        var userInfo = this.props.userInfo.toJS();
        var url = "card/updateCardPassword";
        var card_no = userInfo.card_no;
        var oldPassword = this.state.oldPassword.trim();
        var newPassword = this.state.newPassword.trim();
        var newPassword1 = this.state.newPassword1.trim();
        if(oldPassword===newPassword){
            Taro.showToast({
                title:"新旧秘密不能相同",
                 icon:'none',
                 duration:1000
            })
            return
        }
        if(newPassword!==newPassword1){
            Taro.showToast({
                title:"两次输入的密码不同,请重新输入",
                 icon:'none',
                 duration:1000
            })
            return
        }
        if(!/^\d{6}$/.test(oldPassword)){
            Taro.showToast({
                title:"请输入6位纯数字的旧密码密码",
                 icon:'none',
                 duration:1000
            })
            return
        }
        if(!/^\d{6}$/.test(newPassword)){
            Taro.showToast({
                title:"请输入6位纯数字的新密码密码",
                 icon:'none',
                 duration:1000
            })
            return
        }
        var prams = {
            card_no,
            oldPassword,
            newPassword
        }
        var that = this;
        http.postRequest(url,prams,
            function(res){
                if(res.errcode===0){
                    Taro.showToast({
                        title:"修改成功",
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
                        <View className="item">
                            <Text className="item_title">原&nbsp;密&nbsp;码：</Text>
                             <Input type='password' className="inputValue" placeholder='默认密码：111111' value={this.state.oldPassword} onInput={this.changeValue.bind(this,"oldPassword")}/>
                        </View>
                        <View className="item">
                            <Text className="item_title">新&nbsp;密&nbsp;码：</Text>
                             <Input type='password' className="inputValue" placeholder='请填写6位数字的新密码' value={this.state.newPassword} onInput={this.changeValue.bind(this,"newPassword")}/>
                        </View>
                        <View className="item">
                            <Text className="item_title">新&nbsp;密&nbsp;码：</Text>
                             <Input type='password' className="inputValue" placeholder='请再次填写6位数字的新密码' value={this.state.newPassword1} onInput={this.changeValue.bind(this,"newPassword1")}/>
                        </View>
                        <View className="bottom">
                            <View className="bottom_btn" onClick={this.submitPassword.bind(this)}>确认提交</View>
                        </View>
                    </ScrollView>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        //宠物档案
        userInfo:state.getIn(["petFile","userInfo"]),
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {

    }
}
export default connect(mapStateTopProps,mapDispatchToProps)(ChangePassword)