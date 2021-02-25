import React, { Component,Fragment } from 'react'
import { View, Text,ScrollView,Image,Input,Picker  } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
import './addPet.scss'
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import http from './../../../../utils/http';
import * as actionCreators from './store/actionCreators';
import * as imager from './../assager'
class AddPet extends Component {
    constructor(props){
        super(props);
        this.state={
            header:"添加宠物",
            birthday_date:'',
            nation:'',
            nationLable:'',
            nationList:[{lable:"小狗",value:'01'},{lable:"小猫",value:'02'},{lable:"其他",value:'03'}],
            //宠物性别
            sex:'',
            sex_lable:'',
            selectorSex:[{lable:"公",value:1},{lable:"母",value:2}],
            is_birth_list:[{lable:"是",value:1},{lable:"否",value:2}],
            //是否绝育
            is_birth:'',
            is_birth_lable:'',
            //宠物昵称
            petName:'',
            //宠物品种
            charge_type:'',
            //宠物体重
            weight:'',
            //宠物颜色
            colour:''
        }
    }
    //返回上一层
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    onDateChange (e){
        this.setState({
          birthday_date: e.detail.value
        })
    }
    onnationChange(e){
        var nation =  this.state.nationList[e.detail.value].value;
        var nationLable = this.state.nationList[e.detail.value].lable
        this.setState({
            nation:nation,
            nationLable:nationLable
        })
    }
    onpetpetSexChange(e){
        var sex =  this.state.selectorSex[e.detail.value].value;
        var sex_lable = this.state.selectorSex[e.detail.value].lable;
        this.setState({
            sex:sex,
            sex_lable:sex_lable
        })
    }
    onfalseOrtrueChange(e){
        var is_birth =  this.state.is_birth_list[e.detail.value].value;
        var is_birth_lable = this.state.is_birth_list[e.detail.value].lable;
        this.setState({
            is_birth:is_birth,
            is_birth_lable:is_birth_lable
        })
    }
    changeValue(type,e){
        
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
    submit(){
        var that = this;
        var url = "card/addPet";
        const userInfo = that.props.userInfo.toJS();
        var cardNo = userInfo.card_no;
        var name=that.state.petName;
        var nation=that.state.nation;
        var is_birth=that.state.is_birth;
        var sex=that.state.sex;
        var weight=that.state.weight;
        var birthday_date=that.state.birthday_date;
        var charge_type=that.state.charge_type;
        var colour = that.state.colour;
        if(cardNo===''||name===''||nation===''||is_birth===''||sex===''||weight===''||birthday_date===''||charge_type===''||colour===''){
            Taro.showToast({
                title:'请将信息填写完整',
                icon:'none',
                duration:1000
            })
        }else{
            var prams={
                cardNo,name,nation,is_birth,sex,weight,birthday_date,charge_type,colour
            }
            http.postRequest(url,prams,
                function(res){
                    if(res.errcode===0){
                        that.setState({
                            petName:'',nation:'',is_birth:'',sex:'',weight:'',birthday_date:'',charge_type:'',colour:''
                        })
                        Taro.showToast({
                            title:'添加成功',
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
    }
    render(){
        const style = {
            height:'calc(100% -  40px - 13.33333rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        const userInfo = this.props.userInfo.toJS();
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
                            <Text className="item_content">{userInfo.user_name}</Text>
                        </View>
                        <View className="item">
                            <Text className="item_title">主人联系方式：</Text>
                            <Text className="item_content">{userInfo.phone_number}</Text>
                        </View>
                        <View className="item">
                            <Text className="item_title">一&nbsp;卡&nbsp;通&nbsp;卡&nbsp;号：</Text>
                            <Text className="item_content">{userInfo.card_no}</Text>
                        </View>
                        <View className="item">
                            <Text className="item_title">宠&nbsp;&nbsp;物&nbsp;&nbsp;昵&nbsp;&nbsp;称：</Text>
                            {/* <Text > */}
                                <Input type='text' className="inputValue" placeholder='请填写宠物昵称' value={this.state.petName} onInput={this.changeValue.bind(this,"petName")}/>
                            {/* </Text> */}
                        </View>
                        <View className="item">
                            <Text className="item_title">宠&nbsp;&nbsp;物&nbsp;&nbsp;种&nbsp;&nbsp;类：</Text>
                            <View className="item_content">
                                {
                                    this.state.nationLable!==''?<Text className="xian1">{this.state.nationLable}</Text>:<Text className="xian">请选择</Text>
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
                            <Text className="item_title">宠物品种：</Text>
                            <Input type='text' className="inputValue" placeholder='请填写' value={this.state.charge_type} onInput={this.changeValue.bind(this,"charge_type")}/>
                        </View>
                        <View className="item">
                            <Text className="item_title">宠&nbsp;&nbsp;物&nbsp;&nbsp;颜&nbsp;&nbsp;色：</Text>
                            <Input type='text' className="inputValue" placeholder='请填写' value={this.state.colour} onInput={this.changeValue.bind(this,"colour")}/>
                        </View>
                        <View className="item">
                            <Text className="item_title">宠物体重(kg)：</Text>
                            <Input type='text' className="inputValue" placeholder='请填写' value={this.state.weight} onInput={this.changeValue.bind(this,"weight")}/>
                        </View>
                        <View className="item">
                            <Text className="item_title">宠物出生日期：</Text>
                            <View className="item_content">
                                {
                                    this.state.birthday_date!==''?<Text className="xian1">{this.state.birthday_date}</Text>:<Text className="xian">请选择</Text>
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
                                    this.state.sex_lable!==''?<Text className="xian1">{this.state.sex_lable}</Text>:<Text className="xian">请选择</Text>
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
                                    this.state.is_birth_lable!==''?<Text className="xian1">{this.state.is_birth_lable}</Text>:<Text className="xian">请选择</Text>
                                }
                                <Image className="youjian" src={imager.youjian}/>
                            </View>
                            <Picker mode='selector' range={this.state.is_birth_list} rangeKey={"lable"} onChange={this.onfalseOrtrueChange.bind(this)} className="selectQi">
                                <AtList>
                                    <AtListItem extraText={this.state.is_birth_lable}/>
                                </AtList>
                            </Picker>
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
        userInfo:state.getIn(["petFile","userInfo"]),
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {

    }
}
export default connect(mapStateTopProps,mapDispatchToProps)(AddPet)