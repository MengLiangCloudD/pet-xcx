import React, { Component } from 'react'
import { View, Text, Input,Image,Textarea,ScrollView } from '@tarojs/components'
import './addressList.scss'
import Hearder from './../../../../commen/header/header';
import { connect } from 'react-redux';
import Taro from '@tarojs/taro';
import http from './../../../../utils/http';
import * as imager from './../assager';
import * as actionCreators from './store/actionCreators';
//添加地址的redux
import * as AddactionCreators from './../addAddress/store/actionCreators';
//订单选择地址的redux
import * as actionCreatorsSite from './../../../shoopstore/shoopPayBefore/SettlementOrder/store/actionCreators';
class AddressList extends Component {
    constructor(props){
        super(props);
        this.state={
            header:'收货地址',
            //总页数
            allYear: 0,
            //默认第一页
            offset: 1,
            //一页默认十条
            limit: 10,
        }
    }
    componentDidMount() {
        
    }
    //由于返回上一层只能在这个方法调用
    componentDidShow () { 
        if(wx.getStorageSync('token')==undefined||wx.getStorageSync('token')==''||wx.getStorageSync('token')==null||wx.getStorageSync('avatar')==undefined||wx.getStorageSync('avatar')==''||wx.getStorageSync('avatar')==null||wx.getStorageSync('nickname')==undefined||wx.getStorageSync('nickname')==''||wx.getStorageSync('nickname')==null){
          Taro.navigateTo({
            url: '/pages/impower/impower'　　
          })
          
        }else{
            var offset = 1;
            this.setState(() => ({
              offset: offset
            }), () => {
              this.props.getMysiteList(this,0)
            })
        }
      }
    //上划加载
    onScrolltoupper(e) {
        var offset = this.state.offset;
        if (offset < this.state.allYear) {
        offset += 1
        this.setState(() => ({
            offset: offset
        }), () => {
            this.props.getMysiteList(this,1)
        })

        } else {

        }

    }
    //返回上一层
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    //封装列表
    getList(){
        var { MysiteList } = this.props;
        var list = MysiteList.toJS();
        const config = require('./../../../../utils/config');
        return (
            list.length>0?
            list.map((item,index)=>{
                return (
                    <View className="item" key={index}>
                        <Image  mode="widthFix" className="imager" src={config.imgUrl+'dizhi%402x.png'}/>
                        <View className="content_text" onClick={this.props.selectSite.bind(this,item)}>
                            <View className="item_title">
                                <Text className="name">{item.recipient}</Text>
                                <Text className="cardno">{item.mobile}</Text>
                            </View>
                            <View className="dizhiInfo">
                                {
                                    item.isDefault===1
                                    ?<Text className="moren">
                                        默认
                                    </Text>
                                    :''
                                }
                                <Text>
                                    {item.address}
                                </Text>
                                
                            </View>
                        </View>
                        <View className="bottom"  onClick={this.props.compileSite.bind(this,item)}>
                            编辑
                        </View>
                    </View>
                )
            }):<View >
                <Image  mode="widthFix" className="que" src={config.imgUrl+'noContent.png'}/>
            </View>
        )
    }
    render(){
        var style = {
            height:'calc(100% -  40px - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
       
        return (
            <View className="components-page" >
                 <Hearder titleText={this.state.header}  goback={true} background={true} toback={this.getback}></Hearder>
                 <View className="content"  style={style}>
                    <View className="nav">
                        <View className="nav_btn" onClick={this.props.addsite.bind(this)}>
                            添加新地址
                        </View>
                    </View>
                    <ScrollView className='scrollview'
                    scrollY
                    scrollWithAnimation
                    scrollTop={0}
                    lowerThreshold="100"
                    style={style}
                    onScrolltolower={this.onScrolltoupper.bind(this)}>
                        <View className="item_content">
                            {this.getList()}
                        </View>
                    </ScrollView>
                 </View>
            </View>
        )
    }
}
const mapStateTopProps = (state) => { 
    return {
        MysiteList:state.getIn(["addressList","MysiteList"]),
        //是否是选择地址
        doORlook:state.getIn(["addressList","doORlook"])   
    }
}
const mapDispatchToProps = (dispatch) => { 
    return {
        //请求列表
        getMysiteList(that,type){
            if(type===0){
                var action = actionCreators.MysetSiteList([]);
                    dispatch(action);
              }
            var url = 'address/list';
            var limit = that.state.limit;
            var offset = that.state.offset;
            var prams = {
                limit,
                offset
            }
            http.postRequest(url,prams,
                function(res){
                    var allTiao = res.data.total;
                    var allYear
                    if (allTiao / 10 <= 1) {
                        allYear = 1
                    } else {
                        allYear = parseInt(allTiao / 10) + 1
                    }
                    that.setState({
                        allYear: allYear
                    })
                    var list  = res.data.list;
                    var MysiteList = that.props.MysiteList.toJS();
                    for(var i = 0; i < list.length;i++){
                        MysiteList.push(list[i]);
                      }
                    var action =actionCreators.MysetSiteList(MysiteList);
                    dispatch(action)
                },
                function(err){

                }
            )
        },
        // 编辑地址
        compileSite(item){
            var addORupdateAction=AddactionCreators.setAddORupdate(1);
            var updateSiteAction=AddactionCreators.setUpdateSite(item);
            dispatch(addORupdateAction);
            dispatch(updateSiteAction);
            Taro.navigateTo({
                url: '/pages/myCenter/MyAddress/addAddress/addAddress',
            });
        },
        //添加新地址
        addsite(){
            var addORupdateAction = AddactionCreators.setAddORupdate(0);
            dispatch(addORupdateAction);
            Taro.navigateTo({
                url: '/pages/myCenter/MyAddress/addAddress/addAddress',
            });
        },
        //选择地址
        selectSite(item){
            //如果doORlook为1是选择地址，为0是查看地址列表
            if(this.props.doORlook===1){
                var action=actionCreatorsSite.addRessInfo(item);
                dispatch(action);
                Taro.navigateBack({
                    delta: 1
                })
            }else{

            }   
            
        }
    }
    
}
export default connect(mapStateTopProps, mapDispatchToProps)(AddressList)