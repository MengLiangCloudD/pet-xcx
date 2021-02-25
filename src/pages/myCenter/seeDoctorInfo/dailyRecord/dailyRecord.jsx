import React, { Component, Fragment } from 'react'
import { View, Text,Image,ScrollView,Picker } from '@tarojs/components';
import './dailyRecord.scss';
import { AtList, AtListItem } from 'taro-ui';
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import * as imager from './../../assager';
import * as actionCreators from './store/actionCreators';
import http from '../../../../utils/http';
class DailyRecord extends Component{
    constructor(props){
        super(props);
        this.state = {
            header:'每日记录',
            //总页数
            allYear: 0,
            //默认第一页
            offset: 1,
            //一页默认十条
            limit: 10,
            timer:''

        }
    }
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    //上划加载
    onScrolltoupper(e) {
        var offset = this.state.offset;

        if (offset < this.state.allYear) {
        offset += 1
        this.setState(() => ({
            offset: offset
        }), () => {
            // this.props.getOrderList(this,0)
        })

        } else {

        }

    }
    onDateChange (e){
        this.setState(() => ({
            timer: e.detail.value
        }), () => {
            this.props.selectDayInfo(this)
        })
        
        // this.setState({
            
        // })
    }
    componentDidMount(){
        var nedata = new Date();
        var yy = nedata.getFullYear();
        var mm
        if(nedata.getMonth() + 1<10){
            mm = "0" + nedata.getMonth() + 1;
        }else{
            mm =nedata.getMonth() + 1;
        }
        var dd
        if(nedata.getDate()<10){
            dd = "0" + nedata.getDate();
        }else{
            dd = nedata.getDate();
        }
        var timer = yy + '-' + mm + '-' + dd
        this.setState(()=>({
            timer
        }),()=>{
            this.props.selectDayInfo(this)
        })
    }
    clickPreviewImage(src,picture){
        Taro.previewImage({
            current: src, // 当前显示图片的http链接
            urls: picture // 需要预览的图片http链接列表
          })
    }
    
    itemValueImgList(pictureList){
        var picture = JSON.parse(pictureList);
        if(picture.length===1){
            return (
                <View className="img_list">
                   {
                        picture.map((item,index)=>{
                            return (
                                <View className="img_item" key={index}>
                                    <Image  mode="widthFix" className="img_item_img" src={item} onClick={this.clickPreviewImage.bind(this,item,picture)}/>
                                </View>
                            )
                        })
                   }
                </View>
                    
                
            )
        }else if(picture.length===2||picture.length===4){
            return (
                <View className="img_list">
                    {
                        picture.map((item,index)=>{
                            return (
                                <View className="img_item1" key={index}>
                                    <Image  mode="widthFix" className="img_item1_img" src={item} onClick={this.clickPreviewImage.bind(this,item,picture)}/>
                                </View>
                                
                            )
                        })
                    }
                </View>
            )
        }else{
            return (
                <View className="img_list">
                    {
                        picture.map((item,index)=>{
                            return (
                               <View className="img_item2">
                                    <Image  mode="widthFix" className="img_item2_img" src={item} onClick={this.clickPreviewImage.bind(this,item,picture)}/>
                                </View>
                            )
                        })
                    }
                </View>
                
            )
        }

    }
    //数据集合
    itemValueList(){
        const dayInfoList = this.props.dayInfoList.toJS();
        const config = require('./../../../../utils/config');
        return (
            dayInfoList.length>0?
            dayInfoList.map((item,index)=>{
                return (
                    <View className="item" key={index}>
                        {this.itemValueImgList(item.picture)}
                        <View className="item_bottom">
                            <View className="item_time">{item.descripte_date}</View>
                            <View className="item_content">{item.description}</View>
                        </View>
                    </View>
                )
            }):<View className="que">
                <Image  mode="widthFix" className="que" src={config.imgUrl+'noContent.png'}/>
            </View>
        )
    }
    render(){
        const config = require('./../../../../utils/config');
        const style = {
            height:'calc(100% -  40px - 14.66667rpx - 14.66667rpx - 80.66667rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        return (
            <Fragment>
                <View className="title">
                    <Hearder titleText={this.state.header} goback={true} toback={this.getback} background={true}></Hearder>
                    <View className="select_title">
                        <View className="select_time">
                            <Image  mode="widthFix" className="riq" src={config.imgUrl+'riq.png'}/>
                            {
                                this.state.timer!==''?<View className="data_ye_mo">{this.state.timer}</View>:<View className="data_ye_mo">请选择时间</View>
                            }
                            
                            <Picker mode='date' onChange={this.onDateChange.bind(this)} className="selectQi">
                                <AtList>
                                    <AtListItem extraText={this.state.timer} />
                                </AtList>
                            </Picker>
                        </View>
                    </View>
                </View>
                <ScrollView className='content'
                scrollY
                scrollWithAnimation
                scrollTop={0}
                style={style}
                lowerThreshold="100"
                onScrolltolower={this.onScrolltoupper.bind(this)}>
                    {this.itemValueList()}
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state) => {
    return {
        VisitNo:state.getIn(["hospitalInfo","VisitNo"]),
        dayInfoList:state.getIn(["dailyRecord","dayInfoList"])
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        //查询、当日信息
        selectDayInfo(that){
            var url = 'hospitalization/queryEveryDayInfo';
            var visit_id = that.props.VisitNo;
            var date = that.state.timer
            var prams = {
                date,
                visit_id
            }
            http.postRequest(url,prams, 
              function(res){
                if(res.errcode===0){
                    var action = actionCreators.setDayInfoList(res.data)
                    dispatch(action);
                }
              },
              function(err){
            
              }
            )
        }
    }
  }
  export default connect(mapStateTopProps, mapDispatchToProps)(DailyRecord)