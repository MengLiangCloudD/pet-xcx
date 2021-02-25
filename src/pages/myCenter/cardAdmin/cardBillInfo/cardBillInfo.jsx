import React, { Component,Fragment } from 'react'
import { View, Text,ScrollView,Image,Input } from '@tarojs/components'
import './cardBillInfo.scss'
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import http from './../../../../utils/http';
import * as actionCreators from './store/actionCreators';
class CardBillInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            header:"查看明细",
            //总页数
            allYear:0,
            //默认第一页
            offset:1,
            //一页默认十条
            limit:15,
        }
    }
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    componentDidMount () { 
        var offset = 1;
        this.setState(() => ({
            offset: offset
        }), () => {
            this.props.selectBillInfoList(this,0)
        })
    
    }
    //上划加载
    onScrolltoupper(e){
        var offset = this.state.offset;
        if(offset < this.state.allYear){
            offset+=1
            this.setState(()=>({
                offset:offset
            }),()=>{
                this.props.selectBillInfoList(this,1);
            })
            
        }else{

        }
    }
    render(){
        const style = {
            height:'calc(100% -  40px - 13.33333rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        const BillInfoList = this.props.BillInfoList.toJS();
        return(
            <Fragment>
                <View className="title">
                    <Hearder titleText={this.state.header} goback={true} background={true} toback={this.getback}></Hearder>
                </View>
                <ScrollView className='content'
                    scrollY
                    scrollWithAnimation
                    scrollTop={0}
                    style={style}
                    lowerThreshold="100"
                    onScrolltolower ={this.onScrolltoupper.bind(this)}>
                        {
                            BillInfoList.map((item,index)=>{
                                return (
                                    <View className="item" key={index}>
                                        <View className="item_title">{item.create_date}</View>
                                        <View className="item_content">
                                            <Text className="content_title">{item.reason}</Text>
                                            <Text>￥{item.zengsong_money + item.chongzhi_money}</Text>
                                        </View>
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
        //宠物档案
        userInfo:state.getIn(["petFile","userInfo"]),
        BillInfoList:state.getIn(["cardBillInfo","BillInfoList"])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        //查询明细
        selectBillInfoList(that,type){
            var url = 'card/queryPayLogs';
            if(type===0){
                var action = actionCreators.setBillInfoList([])
                    dispatch(action);
            }
            var userInfo = that.props.userInfo.toJS()
            var cardNo = userInfo.card_no;
            var page_size = that.state.limit;
            var page_num  = that.state.offset;
            var prams = {
                cardNo,
                page_size,
                page_num
            }
            http.postRequest(url,prams,
                function(res){
                    if(res.errcode===0){
                        var allTiao= res.data.total;
                        var allYear
                        if(allTiao / 10 <= 1){
                            allYear=1
                        }else{
                            allYear= parseInt(allTiao / 10) + 1 
                        }
                        that.setState({
                            allYear:allYear
                        })
                        var  content = res.data.content;
                        var nesList = that.props.BillInfoList.toJS();
                        for(var i = 0; i < content.length;i++){
                            nesList.push(content[i]);
                        }
                        var action = actionCreators.setBillInfoList(nesList);
                        dispatch(action);
                    }else{

                    }
                },
                function(err){
    
                }
            )
        }
    }
}
export default connect(mapStateTopProps,mapDispatchToProps)(CardBillInfo)