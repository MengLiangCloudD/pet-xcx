import React, { Component,Fragment } from 'react'
import { View, Text,ScrollView,Image } from '@tarojs/components'
import './depList.scss'
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import http from './../../../../utils/http';
import * as actionCreators from './store/actionCreators';
import * as appointmenTactionCreators from './../appointment/store/actionCreators';
class DepList extends Component{
    constructor(props){
        super(props);
        this.state={
            header:'选择科室'
        }
    }
    componentDidMount(){
        
    }
    //返回上一层
    getback(){
        Taro.switchTab({
        url: '/pages/index/home/index',
        });
    }
    //进入页面时判断是否需要授权
    componentDidShow () { 
        if(wx.getStorageSync('token')==undefined||wx.getStorageSync('token')==''||wx.getStorageSync('token')==null||wx.getStorageSync('avatar')==undefined||wx.getStorageSync('avatar')==''||wx.getStorageSync('avatar')==null||wx.getStorageSync('nickname')==undefined||wx.getStorageSync('nickname')==''||wx.getStorageSync('nickname')==null){
          Taro.navigateTo({
            url: '/pages/impower/impower'　　
          })
          
        }else{
            this.props.getDepList(this)
        }
        
    }
    render(){
        const style = {
            height:'calc(100% -  40px - 14.66667rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        const config = require('./../../../../utils/config');
        const deptList = this.props.deptList.toJS();
        if(deptList.length===0){
            return ''
        }
        return (
            
            <Fragment>
                <View className="title">
                    <Hearder titleText={this.state.header} background={true} goback={true} toback={this.getback}></Hearder>
                </View>
                <ScrollView className='content'
                    scrollY
                    scrollWithAnimation
                    scrollTop={0}
                    style={style}>
                        {
                            deptList.map((item,index)=>{
                                return(
                                    <View className="item" key={index} onClick={this.props.goAppointment.bind(this,item)}>
                                        <View className="img">
                                            <Image  mode="widthFix" className="imager" src={config.imgUrl + item.photo}/>
                                        </View>
                                        <View className="item_txt">{item.dept_name}</View>
                                        <View className="item_info">{item.remarks}</View>
                                    </View>
                                )
                            })
                        }
                                    
                    </ScrollView>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        deptList:state.getIn(["depList","deptList"])
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    return {
        //查询科室列表
        getDepList(){
            //假的科室数据
            var list = [{
                photo:'shenjing.png',
                dept_name:"神经科",
                introduce:'主治神经，主治神经主治神经主治神经，主治神经，主治神经，主治神经，主治神经'
            },{
                photo:'yaoji.png',
                dept_name:"神经科",
                introduce:'主治神经，主治神经主治神经主治神经，主治神经，主治神经，主治神经，主治神经'
            },{
                photo:'shenjing.png',
                dept_name:"神经科",
                introduce:'主治神经，主治神经主治神经主治神经，主治神经，主治神经，主治神经，主治神经'
            },{
                photo:'yaoji.png',
                dept_name:"神经科",
                introduce:'主治神经，主治神经主治神经主治神经，主治神经，主治神经，主治神经，主治神经'
            },{
                photo:'shenjing.png',
                dept_name:"神经科",
                introduce:'主治神经，主治神经主治神经主治神经，主治神经，主治神经，主治神经，主治神经'
            },{
                photo:'yaoji.png',
                dept_name:"神经科",
                introduce:'主治神经，主治神经主治神经主治神经，主治神经，主治神经，主治神经，主治神经'
            },{
                photo:'shenjing.png',
                dept_name:"神经科",
                introduce:'主治神经，主治神经主治神经主治神经，主治神经，主治神经，主治神经，主治神经'
            },{
                photo:'yaoji.png',
                dept_name:"神经科",
                introduce:'主治神经，主治神经主治神经主治神经，主治神经，主治神经，主治神经，主治神经'
            }]
            var url = "register/queryDeptList";
            var prams ={

            }
            http.postRequest(url,prams,
                function(res){
                    if(res.errcode===0){
                        var depList = res.data;
                        var a = depList.length;
                        var num = 8 - a;
                        if(num>0){
                            for(var i =0;i<num;i++){
                                depList.push(list[i]);
                            }
                        }
                        var action = actionCreators.setDeptList(depList);
                        dispatch(action);
                    }
                },
                function(err){

                }
            )
        },
        //医生列表
        goAppointment(item){
            if(item.dept_id){
                var action = appointmenTactionCreators.setDeptId(item.dept_id);
                var nameAction = appointmenTactionCreators.setDeptName(item.dept_name);
                dispatch(nameAction);
                dispatch(action);
                Taro.navigateTo({
                    url: '/pages/home/registration/appointment/appointment'　　// 页面 A
                  })
                  
            }else{
                Taro.showToast({
                    title:"该科室暂未开通",
                     icon:'none',
                     duration:1000
                   })
            }
        }
    }
  }
  export default connect(mapStateTopProps,mapDispatchToProps)(DepList)