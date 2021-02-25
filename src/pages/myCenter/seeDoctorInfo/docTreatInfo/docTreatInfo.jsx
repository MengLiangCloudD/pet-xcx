import React,{ Component,Fragment } from 'react';
import { View, Text,Image,ScrollView } from '@tarojs/components';
import './docTreatInfo.scss'
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import * as imager from './../../assager';
import * as actionCreators from './store/actionCreators';
import * as actionCreatorsPay from './../../../paymentOrder/store/actionCreators';
import http from '../../../../utils/http';
class DocTreatInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            header:'医疗费详情',
            selectCode:0,
            zonggong_costs:0,
            shiji_costs:0,
            isOpened:false,
            submitStart:true
        }
    }
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    //切换已支付未支付
    updateNavItem(code){
        this.setState(()=>({
            selectCode:code
        }),()=>{
            this.props.selectdocTreatList(this);
        })
    }
    componentDidMount(){
        this.props.selectdocTreatList(this);
    }
    handleCancel(){
        this.setState({
            isOpened:false
        })
    }
    handleConfirm(){
        this.setState({
            isOpened:false
        })
    }
    render(){
        var style = {
            height:'calc(100% - 40px - 14.66667rpx - 46.66667rpx - 4rpx - 166rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        var style1 = {
            height:'calc(100% - 40px - 14.66667rpx - 46.66667rpx - 4rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        const config = require('./../../../../utils/config');
        const docTreatInfoList = this.props.docTreatInfoList.toJS();
        return (
            <Fragment>
                {/* 弹出层 */}
                {
                    this.state.isOpened?
                    <View className="zhezhao">
                        <View className="module">
                            <View className="consstent">
                                您的缴费订单有变动，请刷新重试！
                            </View>
                            <View className="botdtom">
                                <View className="btn_mod" onClick={this.handleCancel.bind(this)}>取消</View> <View className="btn_mod"  onClick={this.handleConfirm.bind(this)}>确定</View>
                            </View>
                        </View>
                    </View>:''
                }
                <View className="title">
                    <Hearder titleText={this.state.header} goback={true} toback={this.getback} background={true}></Hearder>
                    <View className="nav">
                        <View className={this.state.selectCode===0?'nav_item':'nav_item nav_item1'} onClick={this.updateNavItem.bind(this,0)}>
                            <View className="nav_item_txt">未支付</View>
                            <View className="nav_item_border"></View>
                        </View>
                        <View className={this.state.selectCode===1?'nav_item':'nav_item nav_item1'} onClick={this.updateNavItem.bind(this,1)}>
                            <View className="nav_item_txt">已支付</View>
                            <View className="nav_item_border"></View>
                        </View>
                    </View>
                </View>
                <ScrollView className="content" style={this.state.selectCode===0?style:style1}
                scrollY
                scrollWithAnimation
                scrollTop={0}>
                    {
                        docTreatInfoList.length>0?
                        docTreatInfoList.map((item,index)=>{
                            return (
                                <View className="item" key={index}>
                                    <View className="item_title">
                                        <View className="title_time">
                                            <Text>{item.create_date}</Text>
                                        </View>
                                        <View className="title_card">
                                            {item.project_name}
                                        </View>
                                        {
                                            item.charge_flag==="0"?<View className="item_start">未支付</View>:<View className="item_start">已缴费</View>
                                        }
                                    </View>
                                    <View className="item_content">
                                        <View className="item_info">
                                            <View className="info">名称</View>
                                            <View className="info">单价</View>
                                            <View className="info">数量</View>
                                        </View>
                                        {
                                            item.info.map((items,indexs)=>{
                                                return (
                                                    <View className="item_info" key={indexs}>
                                                        <View className="info">{items.item_name}</View>
                                                        <View className="info">￥{items.item_price}</View>
                                                        <View className="info">X{items.item_num}</View>
                                                    </View>
                                                )
                                                    
                                            })
                                        }
                                    </View>
                                </View>
                            )
                        }):<View className="que">
                             <Image  mode="widthFix" className="que" src={config.imgUrl+'noContent.png'}/>
                        </View>
                    }
                                
                </ScrollView>
                {
                    this.state.selectCode===0
                    ?<View className="bottom">
                        <View className="zfPrice">
                            <Text>一卡通支付：</Text>
                            <Text>￥{this.state.shiji_costs}</Text>
                        </View>
                        <View className="zfPrice">
                            <Text>原价：</Text>
                            <Text>￥{this.state.zonggong_costs}</Text>
                        </View>
                        <View className="payBtn" onClick={this.props.setOrder.bind(this)}>
                            立即支付
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
        docTreatInfoList:state.getIn(["docTreatInfo","docTreatInfoList"]),
        clinic_id:state.getIn(["docTreatInfo","clinic_id"])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        //查询医疗费详情
        selectdocTreatList(that){
            var action = actionCreators.setDocTreatInfoList([]);
                        dispatch(action);
            var clinic_id = that.props.clinic_id;
            var charge_flag = that.state.selectCode;
            var url = "department/queryDepartmentCost";
            var prams = {
                clinic_id,
                charge_flag
            }
            http.postRequest(url,prams,
                function(res){
                    if(res.errcode===0){
                        var zonggong_costs = res.data.zonggong_costs;
                        var shiji_costs =  res.data.shiji_costs;
                        that.setState({
                            zonggong_costs,
                            shiji_costs
                        })
                        var action = actionCreators.setDocTreatInfoList(res.data.list);
                        dispatch(action);
                    }
                },
                function(err){

                }
            )
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
        submit(that){
            var docTreatInfoList = that.props.docTreatInfoList.toJS();
            var clinic_id = that.props.clinic_id;
            var card_no = docTreatInfoList[0].card_no;
            var clinic_no = docTreatInfoList[0].clinic_no;
            var subStr = JSON.parse(JSON.stringify(docTreatInfoList));
            var zonggong_costs = that.state.zonggong_costs;
            for(var i = 0;i<subStr.length;i++){
                delete subStr[i].info;
            }
            var prams = {
                clinic_id,card_no,clinic_no,subStr:JSON.stringify(subStr),zonggong_costs
            }
            var url = 'department/generateDepartmentOrder';
            http.postRequest(url,prams,
                function(res){
                    if(res.errcode===0){    
                        var orderNoaction = actionCreatorsPay.getorderNo(res.data);
                        var orderTypeaction =  actionCreatorsPay.getType(7);
                        var priceAction = actionCreatorsPay.getPrice(that.state.zonggong_costs);
                        var CardPrice = actionCreatorsPay.getCardPrice(that.state.shiji_costs);
                        var cardNoAction = actionCreatorsPay.getCardNumber(card_no);
                        dispatch(cardNoAction);
                        dispatch(CardPrice)
                        dispatch(orderNoaction);
                        dispatch(orderTypeaction);
                        dispatch(priceAction);
                        Taro.navigateTo({
                            url: '/pages/paymentOrder/paymentOrder'　　
                        })
                    }else if(res.errcode===9005){
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
export default connect(mapStateTopProps,mapDispatchToProps)(DocTreatInfo)