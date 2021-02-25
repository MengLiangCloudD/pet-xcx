import React, { Component,Fragment } from 'react'
import { View, Text,ScrollView,Image } from '@tarojs/components'
import './appointment.scss'
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import http from './../../../../utils/http';
import * as actionCreators from './store/actionCreators';
import * as oKregisteredActionCreators from './../oKregistered/store/actionCreators';
class Appointment extends Component {
    constructor(props){
        super(props);
        this.state={
            header:'预约挂号',
            timer:{}
        }
    }
    //返回上一层
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    componentDidMount(){
        this.props.getNav(this)
    }
    render(){
        const style = {
            height:'calc(100% -  40px - 120.66667rpx - 13.33333rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        const config = require('./../../../../utils/config');
        const navList = this.props.navList.toJS();
        const doctorList = this.props.doctorList.toJS();
        return (
            <Fragment>
                {/* <View className='components-page'> */}
                    <View className="title">
                        <Hearder titleText={this.state.header} background={true} goback={true} toback={this.getback}></Hearder>     
                        <View className="nav">
                            {
                                navList.map((item,index)=>{
                                    return (
                                        <View className={item.start===1?"nav_item nav_item2":(item.trueORfalse===1?"nav_item":"nav_item nav_item1")} key={index} onClick={this.props.cutNavigation.bind(this,item)}>
                                            <View className="nav_week">{item.week}</View>
                                            <View className="nav_month">{item.date}</View>
                                            {
                                                item.trueORfalse===1?<View className="nav_trueORfalse">有号</View>:<View className="nav_trueORfalse">无号</View>
                                            }
                                        </View>
                                    )
                                })
                            }
                        </View>    
                    </View>
                    <ScrollView className='content'
                    scrollY
                    scrollWithAnimation
                    scrollTop={0}
                    style={style}>
                        {
                            doctorList.map((item,index)=>{
                                return (
                                    <View className="content_item" key={index}  onClick={this.props.gOKregistered.bind(this,item)}>
                                        <View className="doctor_img">
                                            <Image  mode="widthFix" className="heardimg" src={config.imgUrl+'tubiao.png'}/>
                                        </View>
                                        <View className="doctor_info">
                                            <View className="doctor_name">
                                                <Text className="name">{item.name}</Text>
                                                <Text className="job">主任医师</Text>
                                            </View>
                                            <View className="hos_name">
                                                <Text className="hos">北京博拉图动物医院</Text>
                                                <Text className="hos_dep">{this.props.deptName}</Text>
                                            </View>
                                            <View className="deb_title_nav">
                                                <View className="title_nav_item">内科</View>
                                                <View className="title_nav_item">消化不良</View>
                                                <View className="title_nav_item">内分泌</View>
                                                <View className="title_nav_item">绝育</View>
                                            </View>
                                            <View className="button">挂号</View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                                    
                    </ScrollView>
                {/* </View> */}
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        navList:state.getIn(["appointment","navList"]),
        doctorList:state.getIn(["appointment","doctorList"]),
        dept_id:state.getIn(["appointment","dept_id"]),
        deptName:state.getIn(["appointment","deptName"])
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    return {
        //查询导航信息
        getNav(that){
            var url = "register/getDateList";
            var prams = {
                
            }
            http.postRequest(url,prams,
                function(res){
                    if(res.errcode===0){
                        var list =res.data;
                        for(var i = 0;i<list.length;i++){
                            list[i].date=list[i].month.slice(5);
                            list[i].start=0;
                        }
                        list[0].start=1;
                        that.setState({
                            timer:list[0]
                        })
                        var action = actionCreators.setNavList(list);
                        dispatch(action);
                        that.props.getDocList(list[0].month,that)
                    }
                },
                function(err){

                }
            )
        },
        //查询医生列表
        getDocList(month,that){
            var url = "register/queryDoctorList";
            var dept_id = that.props.dept_id;
            var prams = {
                dept_id,
                time_desc:1,
                clinic_date:month
            }
            http.postRequest(url,prams,
                function(res){
                    if(res.errcode===0){
                        var action = actionCreators.setDoctorList(res.data);
                        dispatch(action);
                    }
                },
                function(err){

                }
            )
        },
        //切换导航
        cutNavigation(item){
            if(item.trueORfalse===1){
                var list = this.props.navList.toJS();
                for(var i = 0;i<list.length;i++){
                    list[i].start=0;
                    if(list[i].month===item.month){
                        this.setState({
                            timer:item
                        })
                        list[i].start=1;
                        this.props.getDocList(item.month,this);
                        
                    }
                }
                var action = actionCreators.setNavList(list);
                dispatch(action);
            }
                
        },
        //跳转到确认信息
        gOKregistered(item){
            var action = oKregisteredActionCreators.setDoctorInfo(item);
            var actionTimer = oKregisteredActionCreators.setTimer(this.state.timer)
            dispatch(actionTimer)
            dispatch(action)
            Taro.navigateTo({
                url: '/pages/home/registration/oKregistered/oKregistered'　　
              })
              
        }
    }
  }
  export default connect(mapStateTopProps,mapDispatchToProps)(Appointment)