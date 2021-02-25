import React, { Component, Fragment } from 'react'
import { View, Text,Image,ScrollView } from '@tarojs/components';
import "./dateDetail.scss";
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import * as imager from './../../assager';
import * as actionCreators from './store/actionCreators';
import http from '../../../../utils/http';
class DateDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            header:'消费明细'
        }
    }
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    componentDidMount(){
        this.props.selectDetail(this);
    }
    render(){
        var style = {
            height:'calc(100% -  40px  - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
         }
         const detailList = this.props.detailList.toJS();
         const config = require('./../../../../utils/config');
        return (
            <Fragment>
                <View className="title">
                    <Hearder titleText={this.state.header} goback={true} toback={this.getback} background={true}></Hearder>
                </View>
                <ScrollView className="content" style={style}
                scrollY
                scrollWithAnimation
                scrollTop={0}>
                    {
                        detailList.length>0?
                        detailList.map((item,index)=>{
                            return (
                                <View className="item" key={index}>
                                    <View className="item_title">
                                        {item.create_date}
                                    </View>
                                    <View className="item_content">
                                        <Text className="content_ti">{item.item_name}</Text>
                                        <Text>￥{item.charges}</Text>
                                    </View>
                                </View>
                            )
                        }):<View className="que">
                            <Image  mode="widthFix" className="que" src={config.imgUrl+'noContent.png'}/>
                        </View>
                    }
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        detailList:state.getIn(["dateDetail","detailList"]),
        VisitNo:state.getIn(["hospitalInfo","VisitNo"]),
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        //查询明细
        selectDetail(that){
            var url = 'hospitalization/queryCostList';
            var visit_id = that.props.VisitNo;
            var prams = {
                visit_id
            }
            http.postRequest(url,prams, 
              function(res){
                if(res.errcode===0){
                    var action = actionCreators.setDetailList(res.data.details);
                    dispatch(action);
                }
              },
              function(err){
            
              }
            )
        }
    }
}
export default connect(mapStateTopProps,mapDispatchToProps)(DateDetail)