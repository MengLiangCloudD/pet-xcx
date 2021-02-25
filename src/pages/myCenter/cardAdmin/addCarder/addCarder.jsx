import React, { Component,Fragment } from 'react'
import { View, Text,ScrollView,Image,Input,Picker  } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
import './addCarder.scss'
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import http from './../../../../utils/http';
import * as actionCreators from './store/actionCreators';
import * as imager from './../assager'
import setTimeout from './../setTimeout';
class AddPet extends Component {
    constructor(props){
        super(props);
        this.state={
            header:"新建一卡通",
            //出生日期
            birthday_date:'',
             //宠物性别
             userSex:'',
             userSex_lable:'',
             selectorUserSex:[{lable:"男",value:1},{lable:"女",value:2}],
            //宠物性别
            sex:'',
            sex_lable:'',
            selectorSex:[{lable:"公",value:1},{lable:"母",value:2}],
            is_birth_list:[{lable:"是",value:1},{lable:"否",value:2}],
            //是否绝育
            is_birth:'',
            is_birth_lable:'',
            //验证码点击状态
            codeStart:false,
            //倒计时
            time:60,
            //用户姓名
            userName:'',
            //电话
            phone:'',
            //验证码
            code:'',
            // 宠物姓名
            petName:'',
            //宠物种类
            nation:'',
            nationLable:'',
            nationList:[{lable:"小狗",value:'01'},{lable:"小猫",value:'02'},{lable:"其他",value:'03'}],
            //宠物品种
            charge_type:'',
            //体重
            weight:'',
            colour:'',
            subStart:true

        }
    }
    //返回上一层
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    //出生时间
    onDateChange (e){
        this.setState({
            birthday_date: e.detail.value
        })
    }
    //性别
    onpetpetSexChange(e){
        
        var sex =  this.state.selectorSex[e.detail.value].value;
        var sex_lable = this.state.selectorSex[e.detail.value].lable;
        this.setState({
            sex:sex,
            sex_lable:sex_lable
        })
    }
    //主人性别
    onpetpetUserSexChange(e){
        var userSex =  this.state.selectorUserSex[e.detail.value].value;
        var userSex_lable = this.state.selectorUserSex[e.detail.value].lable;
        this.setState({
            userSex:userSex,
            userSex_lable:userSex_lable
        })
    }
    //是否绝育
    onfalseOrtrueChange(e){
        var is_birth =  this.state.is_birth_list[e.detail.value].value;
        var is_birth_lable = this.state.is_birth_list[e.detail.value].lable;
        this.setState({
            is_birth:is_birth,
            is_birth_lable:is_birth_lable
        })
    }
    //分类
    onnationChange(e){
        var nation =  this.state.nationList[e.detail.value].value;
        var nationLable = this.state.nationList[e.detail.value].lable
        this.setState({
            nation:nation,
            nationLable:nationLable
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
    //输入框value
    changeValue(type,e){
        if(type==="userName"){
            this.setState({
                userName:e.target.value
            })
        }
        if(type==="phone"){
            this.setState({
                phone:e.target.value
            })
            
        }
        if(type==="code"){
            this.setState({
                code:e.target.value
            })
        }
        if(type==="petName"){
            this.setState({
                petName:e.target.value
            })
        }
        if(type==="charge_type"){
            this.setState({
                charge_type:e.target.value
            })
        }
        if(type==="weight"){
            this.setState({
                weight:e.target.value
            })
        }
        if(type==="colour"){
            this.setState({
                colour:e.target.value
            })
        }
        
    }
    //提交
    submit(){
        var that = this;
        var url = "card/buildCard";
        var userName=that.state.userName;
        var userSex=that.state.userSex;
        var phone=that.state.phone;
        var code=that.state.code;
        var petName=that.state.petName;
        var nation=that.state.nation;
        var is_birth=that.state.is_birth;
        var sex=that.state.sex;
        var weight=that.state.weight;
        var birthday_date=that.state.birthday_date;
        var charge_type=that.state.charge_type;
        var colour = that.state.colour;
        if(userName===''||userSex===''||phone===''||petName===''||nation===''||is_birth===''||sex===''||weight===''||birthday_date===''||charge_type===''||code===''||colour===''){
            Taro.showToast({
                title:'请将信息填写完整',
                icon:'none',
                duration:1000
            })
        }else{
            var prams={
                userName,userSex,phone,code,petName,nation,is_birth,sex,weight,birthday_date,charge_type,colour
            }
            if(that.state.subStart){
                that.setState({
                    subStart:false
                })
                http.postRequest(url,prams,
                    function(res){
                        if(res.errcode===0){
                            that.setState({
                                userName:'',userSex:'',phone:'',code:'',petName:'',nation:'',is_birth:'',sex:'',weight:'',birthday_date:'',charge_type:'',colour:'',userSex_lable:'',sex_lable:'',is_birth_lable:'',nationLable:''
                            })
                            Taro.showToast({
                                title:'添加成功',
                              icon:'none',
                              duration:1000
                            })
                            that.getback()
                        }else{
                            Taro.showToast({
                                title:res.errmsg,
                              icon:'none',
                              duration:1000
                            })
                        }
                        // setTimeout(() => {
                            that.setState({
                                subStart:true
                            })
                        // }, 1000);
                    }, 
                    function(err){
                        // setTimeout(() => {
                            that.setState({
                                subStart:true
                            })
                        // }, 1000);
                    }
                )
            }
                
        }
            
    }
    //进入页面时判断是否需要授权
    componentDidShow () {
        if(wx.getStorageSync('token')==undefined||wx.getStorageSync('token')==''||wx.getStorageSync('token')==null||wx.getStorageSync('avatar')==undefined||wx.getStorageSync('avatar')==''||wx.getStorageSync('avatar')==null||wx.getStorageSync('nickname')==undefined||wx.getStorageSync('nickname')==''||wx.getStorageSync('nickname')==null){
            Taro.navigateTo({
                url: '/pages/impower/impower'　　
            })
            
        }else{
            
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
                        <View className="item">
                            <Text className="item_title">主&nbsp;&nbsp;人&nbsp;&nbsp;姓&nbsp;&nbsp;名：</Text>
                             <Input type='text' className="inputValue" placeholder='请填写' value={this.state.userName} onInput={this.changeValue.bind(this,"userName")}/>
                        </View>
                        <View className="item">
                            <Text className="item_title">主&nbsp;&nbsp;人&nbsp;&nbsp;性&nbsp;&nbsp;别：</Text>
                            <View className="item_content">
                                {
                                    this.state.userSex_lable!==''?<Text className="xuan1">{this.state.userSex_lable}</Text>:<Text className="xuan">请选择</Text>
                                }
                                <Image className="youjian" src={imager.youjian}/>
                            </View>
                            <Picker mode='selector'  range={this.state.selectorUserSex} rangeKey={"lable"}  onChange={this.onpetpetUserSexChange.bind(this)} className="selectQi">
                                <AtList>
                                    <AtListItem extraText={this.state.userSex_lable} />
                                </AtList>
                            </Picker>
                        </View>
                        
                        <View className="item">
                            <Text className="item_title">宠&nbsp;&nbsp;物&nbsp;&nbsp;昵&nbsp;&nbsp;称：</Text>
                                <Input type='text' className="inputValue" placeholder='请填写' value={this.state.petName} onInput={this.changeValue.bind(this,"petName")}/>
                        </View>
                        
                        <View className="item">
                            <Text className="item_title">宠&nbsp;&nbsp;物&nbsp;&nbsp;种&nbsp;&nbsp;类：</Text>
                            <View className="item_content">
                                {
                                    this.state.nationLable!==''?<Text className="xuan1">{this.state.nationLable}</Text>:<Text className="xuan">请选择</Text>
                                }
                                <Image className="youjian" src={imager.youjian}/>
                            </View>
                            <Picker mode='selector'  range={this.state.nationList} rangeKey={"lable"} onChange={this.onnationChange.bind(this)} className="selectQi">
                                <AtList>
                                    <AtListItem extraText={this.state.nationLable} />
                                </AtList>
                            </Picker>
                        </View>
                        <View className="item">
                            <Text className="item_title">宠&nbsp;&nbsp;物&nbsp;&nbsp;品&nbsp;&nbsp;种：</Text>
                            <Input type='text' className="inputValue" placeholder='请填写' value={this.state.charge_type} onInput={this.changeValue.bind(this,"charge_type")}/>
                        </View>
                        <View className="item">
                            <Text className="item_title">宠物体重(kg)：</Text>
                            <Input type='text' className="inputValue" placeholder='请填写' value={this.state.weight} onInput={this.changeValue.bind(this,"weight")}/>
                        </View>
                        <View className="item">
                            <Text className="item_title">宠&nbsp;&nbsp;物&nbsp;&nbsp;颜&nbsp;&nbsp;色：</Text>
                            <Input type='text' className="inputValue" placeholder='请填写' value={this.state.colour} onInput={this.changeValue.bind(this,"colour")}/>
                        </View>
                        <View className="item">
                            <Text className="item_title">宠物出生日期：</Text>
                            
                            <View className="item_content">
                                {
                                    this.state.birthday_date!==''?<Text className="xuan1">{this.state.birthday_date}</Text>:<Text className="xuan">请选择</Text>
                                }
                               
                                <Image className="youjian" src={imager.youjian}/>
                            </View>
                            <Picker mode='date' onChange={this.onDateChange.bind(this)} className="selectQi">
                                <AtList>
                                    <AtListItem extraText={this.state.birthday_date} />
                                </AtList>
                            </Picker>
                        </View>
                        <View className="item">
                            <Text className="item_title">宠&nbsp;&nbsp;物&nbsp;&nbsp;性&nbsp;&nbsp;别：</Text>
                            <View className="item_content">
                                {
                                    this.state.sex_lable!==''?<Text className="xuan1">{this.state.sex_lable}</Text>:<Text className="xuan">请选择</Text>
                                }
                                <Image className="youjian" src={imager.youjian}/>
                            </View>
                            <Picker mode='selector'  range={this.state.selectorSex} rangeKey={"lable"}  onChange={this.onpetpetSexChange.bind(this)} className="selectQi">
                                <AtList>
                                    <AtListItem extraText={this.state.sex_lable} />
                                </AtList>
                            </Picker>
                        </View>
                        <View className="item">
                            <Text className="item_title">是&nbsp;&nbsp;否&nbsp;&nbsp;绝&nbsp;&nbsp;育：</Text>
                            <View className="item_content">
                                {
                                    this.state.is_birth_lable!==''?<Text className="xuan1">{this.state.is_birth_lable}</Text>:<Text className="xuan">请选择</Text>
                                }
                                <Image className="youjian" src={imager.youjian}/>
                            </View>
                            <Picker mode='selector' range={this.state.is_birth_list} rangeKey={"lable"} onChange={this.onfalseOrtrueChange.bind(this)} className="selectQi">
                                <AtList>
                                    <AtListItem extraText={this.state.is_birth_lable}/>
                                </AtList>
                            </Picker>
                        </View>
                        <View className="item itemPhone">
                            <Text className="item_title">主人手机号码：</Text>
                             <Input type='text' className="inputValue" placeholder='请填写' value={this.state.phone} onInput={this.changeValue.bind(this,"phone")}/>
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
                             <Input type='text' className="inputValue" placeholder='请填写' value={this.state.code} onInput={this.changeValue.bind(this,"code")}/>
                        </View>
                        <View className="bottom">
                            <View className="btn_bottom" onClick={this.submit.bind(this)}>确定</View>
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
export default connect(mapStateTopProps,mapDispatchToProps)(AddPet)