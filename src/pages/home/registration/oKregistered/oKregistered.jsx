import React, { Component,Fragment } from 'react'
import { View, Text,ScrollView,Image } from '@tarojs/components'
import './oKregistered.scss'
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import http from './../../../../utils/http';
import selectDefaultCard from './../../../../commen/selectDefaultCard';
import * as actionCreators from './store/actionCreators';
import * as cardListActionCreators from './../../../myCenter/cardAdmin/cardList/store/actionCreators';
import  * as actionCreatorsPay from './../../../paymentOrder/store/actionCreators';
import * as imager from './../assager'
class OKregistered extends Component{
    constructor(props){
        super(props);
        this.state={
            header:"确认信息",
            time_desc:"1",
            //医师姓名
            doctor_name:'',
            clinic_id:'',//号源id
            sex:'',
            isOpened:false,
            cardOpened:false,
            submitStart:true
        }
    }
    //返回上一页
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    componentDidMount(){
        var  petInfo =  this.props.petInfo.toJS();
        if(JSON.stringify(petInfo)==='{}'){
            this.props.getPetInfo(this);
        }
        this.props.updateJson(this)
    }
    cardCHandleCancel(){
        this.setState({cardOpened:false});
    }
    cardChandleConfirm(){
        this.setState({cardOpened:false});
        this.props.selectCard()
    }
    handleCancel(){
        this.setState({isOpened:false});
    }
    handleConfirm(){
        this.setState({isOpened:false});
        Taro.navigateTo({
            url: '/pages/myCenter/registerOrder/registerList/registerList'
        })
    }
    render(){
        const style = {
            height:'calc(100% -  40px - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        const config = require('./../../../../utils/config');
        const timeList = this.props.timeList.toJS();
        const petInfo = this.props.petInfo.toJS();
        const doctorInfo = this.props.doctorInfo.toJS();
        const timer = this.props.timer.toJS();
        return (
            <Fragment>
                {
                    this.state.isOpened?
                    <View className="zhezhao">
                        <View className="module">
                            <View className="consstent">
                                您有一个未支付订单！
                            </View>
                            <View className="botdtom">
                                <View className="btn_mod" onClick={this.handleCancel.bind(this)}>取消</View> <View className="btn_mod"  onClick={this.handleConfirm.bind(this)}>确定</View>
                            </View>
                        </View>
                    </View>:''
                }
                {
                    this.state.cardOpened?
                    <View className="zhezhao">
                        <View className="module">
                            <View className="consstent">
                                请先新建一张就诊卡！
                            </View>
                            <View className="botdtom">
                                <View className="btn_mod" onClick={this.cardCHandleCancel.bind(this)}>取消</View> <View className="btn_mod"  onClick={this.cardChandleConfirm.bind(this)}>确定</View>
                            </View>
                        </View>
                    </View>:''
                }
                <Hearder titleText={this.state.header} background={true} goback={true} toback={this.getback}></Hearder>
                {/* <View className="wrop" style={style}> */}
                <ScrollView className="wrop" style={style}
                scrollY
                scrollWithAnimation
                scrollTop={0}>
                    <View className="content">
                        <View className="doctor_info">
                            <View className="dontor_name">
                                <Text className="name">{this.state.doctor_name}</Text>
                                <Text className="job">主任医师</Text>
                            </View>
                            <View className="yuyue_time">
                                <Text className="year_month">{timer.month}</Text>
                                <Text className="week">{timer.week}</Text>
                            </View>
                            <View className="site">
                                北京市朝阳区XXXXXXXX
                            </View>
                            <View className="doctor_heardimg">
                                {
                                    this.state.sex==="1"?<Image  mode="widthFix" className="heardimg" src={config.imgUrl+'man.png'}/>:<Image  mode="widthFix" className="heardimg" src={config.imgUrl+'weman.png'}/>
                                }
                                <Image  mode="widthFix" className="heardimg" src={config.imgUrl+'man.png'}/>
                            </View>
                        </View>
                        <View className="pet_info" onClick={this.props.selectCard.bind(this)}>
                            <View className="card_no">
                                一卡通卡号：{petInfo.cardNo}
                            </View>
                            <View className="pet_name">
                                宠&nbsp;物&nbsp;名&nbsp;称：{petInfo.petName}
                            </View>
                            <View className="pet_type">
                                宠&nbsp;物&nbsp;种&nbsp;类：{petInfo.petType}
                            </View>
                            <Image  mode="widthFix" className="youjian" src={imager.youjian}/>
                        </View>
                        <View className="select_time">
                            <View className="time_title">
                                选择时间
                            </View>
                            <View className="time_nav">
                                {
                                    timeList.map((item,index)=>{
                                        return (
                                            <View className={item.disabled===true?(item.start===1?"time_nav_item time_nav_item_select":"time_nav_item "):"time_nav_item time_nav_item_disabled"} key={index} onClick={this.props.updateTime.bind(this,item)}>
                                                {item.time}
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View className="need_know">
                            <View className="know_title">挂号须知</View>
                            <View className="know_text">
                                <View className="know_text">为了宠物的安全，请看管好您的宠物，避免一些疾病的传染。动物因种类不同和个体差异，健康状态因而在治疗过程中也有一些不可预料的事情发生，如过敏、休克、感染等，请您相信我们医护人员的心情与您一样，因此您的信任和支持尤为重要。</View>
                            </View>
                        </View>
                        <View className="bottom">
                            <View className="doctor_pricce">
                                医事服务费：{doctorInfo.price}元
                            </View>
                            <View className="button" onClick={this.props.setOrder.bind(this)}>
                                立即支付
                            </View>
                        </View>
                        <View className="left_yuan"></View>
                        <View className="right_yuan"></View>
                    </View>
                
                </ScrollView> 
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        timeList:state.getIn(["oKregistered","timeList"]),
        petInfo:state.getIn(["oKregistered","petInfo"]),
        doctorInfo:state.getIn(["oKregistered","doctorInfo"]),
        dept_id:state.getIn(["appointment","dept_id"]),
        timer:state.getIn(["oKregistered","timer"])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        //处理数据
        updateJson(that){
            var doctorInfo = that.props.doctorInfo.toJS();
            var timeList = that.props.timeList.toJS();
            var regList = doctorInfo.idAndTimeDesc;
            var timeDescList=[];
            for(var i = 0; i<timeList.length;i++){
                timeList[i].disabled = false
            }
            var actiontimeList =actionCreators.setTimeList(timeList);
            dispatch(actiontimeList);
            if(regList[0].time_desc!="1"){
                for(var t = 0;t<timeList.length;t++){
                    timeList[t].start=0;
                    if(regList[0].time_desc===timeList[t].value){
                        timeList[t].start=1;
                    }
                }
                that.setState(()=>({
                    clinic_id:regList[0].id,
                    time_desc:regList[0].time_desc
                }),()=>{
                    that.props.getDoctInfo(that);
                })
            }else{
                that.setState(()=>({
                    clinic_id:regList[0].id,
                    time_desc:"2"
                }),()=>{
                    that.props.getDoctInfo(that);
                })
            }
            
            for(var i = 0;i<regList.length;i++){
                if(regList[i].time_desc==="1"){
                    for(var j = 0;j<timeList.length;j++){
                        timeList[j].start=0;
                        timeList[0].start=1;
                        timeList[j].disabled=true;
                    }
                    break
                }else{
                    timeDescList.push(regList[i].time_desc);
                }
            }
            if(timeDescList.length>0){
                for(var i = 0;i<timeDescList.length;i++){
                    for(var j = 0;j<timeList.length;j++){
                        if(timeDescList[i]===timeList[j].value){
                            timeList[j].disabled = true;
                        }
                    }
                }
            }
            var action =actionCreators.setTimeList(timeList);
            dispatch(action);
        },
        //查询医生信息
        getDoctInfo(that){
            var doctorInfo = that.props.doctorInfo.toJS();
            var url = 'register/queryDoctorInfo';
            var dept_id = that.props.dept_id;//	科室id
            var id = that.state.clinic_id;//号源id
            var clinic_date= doctorInfo.clinic_date;//	号源日期
            
            var prams = {
                dept_id,id,clinic_date
            };
            http.postRequest(url,prams,
                function(res){
                    if(res.errcode===0&&res.data!==null){
                        that.setState({
                            doctor_name:res.data[0].doctor_name,
                            sex:res.data[0].sex
                        })
                    }
                },    
                function(err){

                }
            )
        },
        //查询就诊信息
        getPetInfo(that){
            var obj ={}
            selectDefaultCard.getCard(that).then(res=>{
                obj=res;
                var action = actionCreators.setPetInfo(obj);
                dispatch(action);
            })
        },
        //切换时间段
        updateTime(item){
            if(item.disabled){
                var doctorInfo = this.props.doctorInfo.toJS();
                var regList = doctorInfo.idAndTimeDesc;
                var timeList = this.props.timeList.toJS();
                for(var i = 0;i<timeList.length;i++){
                    timeList[i].start=0;
                    if(timeList[i].value===item.value){
                        if(regList[0].time_desc==="1"){
                            timeList[i].start=1;
                            this.setState({
                                time_desc:timeList[i].value
                            })
                        }else{
                            for(var j = 0;j<regList.length;j++){
                                if(regList[j].time_desc===item.value){
                                    timeList[i].start=1;
                                    if(regList[j].id===this.state.clinic_id){
                                        this.setState({
                                            time_desc:timeList[i].value
                                        })
                                    }else{
                                        this.setState(()=>({
                                            time_desc:timeList[i].value,
                                            clinic_id:regList[j].id
                                        }),()=>{
                                            this.props.getDoctInfo(this);
                                        })
                                    }
                                }
                            }
                        }
                            
                        
                    }
                }
                var action =actionCreators.setTimeList(timeList);
                dispatch(action);
            }else{
                Taro.showToast({
                    title:"当前时间段无号源",
                     icon:'none',
                     duration:1000
                  })
            }
        },
        //选择就诊卡
        selectCard(){
           var action = cardListActionCreators.setSelectStart(1);
           dispatch(action);
            Taro.navigateTo({
                url: '/pages/myCenter/cardAdmin/cardList/cardList'　　 
            })
            
        },
        //下单校验
        setOrder(){
            if(this.state.submitStart===true){
                this.setState(()=>({
                    submitStart:false
                  }),()=>{
                    this.props.submit(this)
                  })
                
            }
        },
        //挂号下单
        submit(that){
            var doctorInfo = that.props.doctorInfo.toJS();
            var petInfo = that.props.petInfo.toJS();
            if(JSON.stringify(petInfo)==='{}'){
                that.setState({
                    submitStart:true
                })
                Taro.showToast({
                    title:"请先绑定或选择就诊卡信息",
                     icon:'none',
                     duration:1000
                   })
                return 
            }
            var timer = that.props.timer.toJS();
            var url = 'register/genareteRegisterOrder';
            var clinic_id = that.state.clinic_id;//号源id
            var dept_id = that.props.dept_id;//	科室id
            var pet_id = petInfo.id;//宠物id
            var time_desc=that.state.time_desc;//时间段
            var clinic_date= doctorInfo.clinic_date;//	号源日期
            var visit_date=timer.month;//	就诊日期
            var card_no =  petInfo.cardNo;
            var pet_name = petInfo.petName;
            var charge_type =petInfo.petType
            var prams = {
                clinic_id,dept_id,pet_id,time_desc,clinic_date,visit_date,card_no,charge_type,pet_name
            }
            http.postRequest(url,prams,
                function(res){
                   
                    if(res.errcode===0){
                        var orderNoaction = actionCreatorsPay.getorderNo(res.data);
                        var cardNoAction = actionCreatorsPay.getCardNumber(card_no);
                        var orderTypeaction =  actionCreatorsPay.getType(3);
                        var priceAction = actionCreatorsPay.getPrice(doctorInfo.price);
                        dispatch(cardNoAction);
                        dispatch(orderNoaction);
                        dispatch(orderTypeaction);
                        dispatch(priceAction);
                        Taro.navigateTo({
                            url: '/pages/paymentOrder/paymentOrder'　　
                        })
                            
                    }else if(res.errcode===3001){
                        that.setState({isOpened:true})
                    }else{
                        Taro.showToast({
                            title:res.errmsg,
                              icon:'none',
                             duration:1000
                        })
                    }
                    setTimeout(() => {
                        that.setState({
                            submitStart:true
                        })
                    }, 1000);
                },
                function(err){
                    setTimeout(() => {
                        that.setState({
                            submitStart:true
                        })
                    }, 1000);
                }
            )
                
        }
    }
}
export default connect(mapStateTopProps,mapDispatchToProps)(OKregistered)