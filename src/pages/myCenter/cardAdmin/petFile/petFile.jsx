import React, { Component,Fragment } from 'react'
import { View, Text,ScrollView,Image } from '@tarojs/components'
import './petFile.scss'
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import http from './../../../../utils/http';
import * as actionCreators from './store/actionCreators';
import * as registeredActionCreators from './../../../home/registration/oKregistered/store/actionCreators';
import * as vaccinationActionCreators from './../../../home/vaccine/vaccination/store/actionCreators';
class PetFile extends Component{
    constructor(props){
        super(props);
        this.state = {
            header:'宠物档案'
        }
    }
    componentDidMount(){
        if(this.props.selectStart!==0){
            this.setState({
                header:'选择宠物'
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
            this.props.getPetfile(this)
        }
      }
    //返回上一层
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    //修改密码
    goChangePassword(){
        Taro.navigateTo({
            url: '/pages/myCenter/cardAdmin/changePassword/changePassword',
        })
    }
    render(){
        const style = {
            height:'calc(100% -  40px - 69.33333rpx - 166rpx - 13.33333rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        const style1 = {
             height:'calc(100% -  40px - 69.33333rpx - 13.33333rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        const userInfo = this.props.userInfo.toJS();
        const fileList = this.props.fileList.toJS();
        return (
            <Fragment>
                <View className="title">
                    <Hearder titleText={this.state.header} goback={true} toback={this.getback}></Hearder>
                    <View className="addBtn" onClick={this.props.goAddPet.bind(this)}>添加新宠物</View>
                </View>
                <ScrollView className='content'
                    scrollY
                    scrollWithAnimation
                    scrollTop={0}
                    style={this.props.selectStart===0?style:style1}>
                        <View className="user_info">
                            <View className="content_item">
                                <View className="card_no">
                                    <Text className="user_title">一卡通卡号：</Text>
                                    <Text> {userInfo.card_no}</Text>
                                </View>
                                <View className="user_name">
                                    <Text className="user_title">主&nbsp;人&nbsp;姓&nbsp;名：</Text>
                                    <Text> {userInfo.user_name}</Text>
                                </View>
                                <View className="phone_no">
                                    <Text className="user_title">联&nbsp;系&nbsp;方&nbsp;式：</Text>
                                    <Text> {userInfo.phone_number}</Text>
                                </View>
                                {
                                    this.props.selectStart===0
                                    ?<View className="user_botom">
                                        <View className="user_btn">
                                            <View className="look_info" onClick={this.props.goCardBillInfo.bind(this)}>查看明细</View>
                                            <View className="addMoney" onClick={this.goChangePassword.bind(this)}>修改密码</View>
                                        </View>
                                    </View>
                                    :''
                                }
                                
                            </View>
                        </View>
                        <View className="pet_info">
                            {
                                fileList.map((item,index)=>{
                                    return (
                                        <View className={this.props.selectStart===0?'pet_item':(item.start===1?'pet_item pet_item1':'pet_item')} onClick={this.props.selectFile.bind(this,item)} key={index}>
                                            <View className="pet_name">
                                                <Text className="pet_title">宠&nbsp;物&nbsp;昵&nbsp;称：</Text>
                                                <Text> {item.name}</Text>
                                            </View>
                                            {
                                                this.props.selectStart===0
                                                ?<View className="pet_particular">
                                                    <Text className="pet_title">宠&nbsp;物&nbsp;种&nbsp;类：</Text>
                                                    {
                                                        item.nation==="01"
                                                        ?<Text> 小狗</Text>
                                                        :item.nation==="02"
                                                        ?<Text> 小猫</Text>
                                                        :<Text> 其他</Text>
                                                    }
                                                </View>
                                                :""
                                            }
                                            <View className="pet_particular">
                                                <Text className="pet_title">宠&nbsp;物&nbsp;体&nbsp;重：</Text>
                                                <Text> {item.weight}(kg)</Text>
                                            </View>
                                            {
                                                this.props.selectStart===0
                                                ?<View className="pet_particular">
                                                    <Text className="pet_title">宠&nbsp;物&nbsp;颜&nbsp;色：</Text>
                                                    <Text> {item.colour}</Text>
                                                </View>
                                                :''
                                            }
                                            {
                                                this.props.selectStart===0
                                                ? <View className="pet_particular">
                                                    <Text className="pet_title">宠&nbsp;物&nbsp;品&nbsp;种：</Text>
                                                    <Text> {item.charge_type}</Text>
                                                </View>
                                                :''
                                            }
                                            <View className="pet_particular">
                                                <Text className="pet_title">出&nbsp;生&nbsp;日&nbsp;期：</Text>
                                                <Text> {item.birthday_date.substring(0,10)}</Text>
                                            </View>
                                            {
                                               this.props.selectStart===0
                                               ? <View className="pet_particular">
                                                    <Text className="pet_title">宠&nbsp;物&nbsp;性&nbsp;别：</Text>
                                                    {
                                                        item.sex==='1'?<Text> 公</Text>:<Text> 母</Text>
                                                    }
                                                </View>
                                               :'' 
                                            }
                                            {
                                                this.props.selectStart===0
                                                ? <View className="pet_particular">
                                                    <Text className="pet_title">是&nbsp;否&nbsp;绝&nbsp;育：</Text>
                                                    {
                                                        item.is_birth==='1'?<Text> 是</Text>:<Text>否</Text>
                                                    }
                                                </View>
                                                :'' 
                                            }
                                            
                                        </View>
                                    )
                                })
                            }
                                        
                        </View>
                </ScrollView>
                {
                    this.props.selectStart===0
                    ?<View className="bottom">
                        <View className="zfPrice">
                            <Text>余额：</Text>
                            <Text>￥{userInfo.balance}</Text>
                        </View>
                        <View className="payBtn" onClick={this.props.goTopupCarder.bind(this)}>
                            充值
                        </View>
                    </View>
                    :''
                }
                
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        //宠物档案
        fileList:state.getIn(["petFile","fileList"]),
        userInfo:state.getIn(["petFile","userInfo"]),
        //状态
        selectStart:state.getIn(["cardList","selectStart"])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        goAddPet(){
            Taro.navigateTo({
                url: '/pages/myCenter/cardAdmin/addPet/addPet'　　 
            })
        },
        //选择宠物
        selectFile(item){
            var selectStart = this.props.selectStart;
            if(selectStart!==0){
                var userInfo = this.props.userInfo.toJS();
                var obj = {}
                obj.cardNo=userInfo.card_no;
                obj.petName=item.name;
                obj.id = item.id;
                if(item.nation==='01'){
                    obj.petType="小狗"
                }else if(item.nation==='02'){
                    obj.petType="小猫"
                }else{
                    obj.petType="其他"
                }
                var fileList = this.props.fileList.toJS();
                for(var i = 0;i<fileList.length;i++){
                    if(fileList[i].id===item.id){
                        fileList[i].start=1;
                    }else{
                        fileList[i].start=0;
                    }
                }
                var petAction = actionCreators.setFileList(fileList);
                dispatch(petAction);
                if(selectStart===1){
                    var action = registeredActionCreators.setPetInfo(obj);
                    dispatch(action);
                    Taro.navigateBack({
                        delta: 1
                    })
                }else if(selectStart===2){
                    var action = vaccinationActionCreators.setPetMapInfo(obj);
                    dispatch(action);
                    Taro.navigateBack({
                        delta: 1
                    })
                }
            }
                
        },
        //充值
        goTopupCarder(){
            Taro.navigateTo({
                url: '/pages/myCenter/cardAdmin/topupCarder/topupCarder'　　 
            })
        },
        //明细
        goCardBillInfo(){
            Taro.navigateTo({
                url: '/pages/myCenter/cardAdmin/cardBillInfo/cardBillInfo'　　 
            })
        },
        //查询宠物档案
        getPetfile(that){
            var userInfo = that.props.userInfo.toJS()
            var url = "card/queryCardInfo";
            var prams = {
                cardNo:userInfo.card_no
            }
            http.postRequest(url,prams,
                function(res){
                    if(res.errcode===0){
                        userInfo.balance = res.data.balance;
                        var fileList = res.data.pets;
                        for(var i = 0;i<fileList.length;i++){
                            fileList[i].start = 0;
                        }
                        fileList[0].start = 1;
                        var petAction = actionCreators.setFileList(fileList);
                        var userAction = actionCreators.setUserInfo(userInfo);
                        dispatch(petAction);
                        dispatch(userAction);
                    }
                },
                function(err){

                }
            )
        }
    }
}
export default connect(mapStateTopProps,mapDispatchToProps)(PetFile)