import React, { Component } from 'react'
import { View, Text,ScrollView,Image } from '@tarojs/components'
import './news.scss'
import { clickPublic } from '../../../commen/publiClick';
import Hearder from '../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import * as imager from '../assager';
import http from '../../../utils/http';
import * as actionCreators from './store/actionCreators';
class News extends Component {
  constructor(props){
    super(props);
    this.state={
      //总页数
      allYear:0,
      //默认第一页
      offset:1,
      //一页默认十条
      limit:10,
    }
  }
  //监听taber
  onTabItemTap (item) {
    if(clickPublic(item.pagePath)){
      
    }else{
      Taro.navigateTo({
                url: '/pages/impower/impower'　　// 页面 A
        })
    }
  }
  componentWillMount () {

  }

  componentDidMount () { 
    
    
  }

  componentWillUnmount () { }
  //进入页面时判断是否需要授权
  componentDidShow () { 
    var offset = 1;
    this.setState(() => ({
      offset: offset
    }), () => {
      this.props.getNesList(this,0)
    })
  }

  componentDidHide () { }
  //上划加载
  onScrolltoupper(e){
    var offset = this.state.offset;
    if(offset < this.state.allYear){
      offset+=1
      this.setState(()=>({
        offset:offset
      }),()=>{
        this.props.getNesList(this,1);
      })
      
    }else{

    }
  }
  render () {
    var style = {
      height:'calc(100% -  40px - 14.66667rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
    }
    var nesList = this.props.nesList.toJS();
    const config = require('./../../../utils/config');
    return (
      <View className='components-page'>
        <View className="title">
           <Hearder titleText={this.props.header} background={true}></Hearder>         
        </View>
        <ScrollView className={nesList.length>0?'scrollview':'scrollview scrollview1'}
            scrollY
            scrollWithAnimation
            scrollTop={0}
            style={style}
            lowerThreshold="100"
            onScrolltolower ={this.onScrolltoupper.bind(this)}>
              <View className="content">
                {
                  nesList.length>0?
                  nesList.map((item,index)=>{
                    return (
                      <View className="item" key={index} onClick={this.props.clIckYes.bind(this,item)}>
                        {
                          item.type===1
                          ?<View className="itrm_title">
                            <View className="item_img">
                              <Image  mode="widthFix" className="xitong" src={imager.xitong}/>
                              {
                                item.read_status==='no'?<View className="yidu"></View>:''
                              }
                              
                            </View>
                            <View className="title_txt">
                              系统消息
                            </View>
                          </View>
                          :<View className="itrm_title">
                            <View className="item_img">
                              <Image  mode="widthFix" className="xitong" src={imager.qitxixi}/>
                              {
                                item.read_status==='no'?<View className="yidu"></View>:''
                              }
                            </View>
                            <View className="title_txt">
                              其他消息
                            </View>
                          </View>
                        }
                        <View className="content_text">
                          {item.content}
                        </View>
                        <View className="time_txt">
                          {item.created_at}
                        </View>
                      </View>
                    )
                  }):<View className="que">
                      <Image  mode="widthFix" className="que" src={config.imgUrl+'noContent.png'}/>
                  </View>
                }
              </View>
            </ScrollView>
      </View>
    )
  }
}
const mapStateTopProps = (state)=>{
  return {
      //头部信息
      header:state.getIn(['news','header']),
      //消息列表
      nesList:state.getIn(['news','nesList'])
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    //查询消息列表
    getNesList(that,type){
      if(type===0){
        var action = actionCreators.setNesList([]);
            dispatch(action);
      }
      var limit = that.state.limit;
      var offset = that.state.offset;
      var url  = 'message/queryMessage';
      var prams = {
        offset,
        limit
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
            var nesList = that.props.nesList.toJS();
            for(var i = 0; i < content.length;i++){
              nesList.push(content[i]);
            }
            var action = actionCreators.setNesList(nesList);
            dispatch(action);
          }
        },
        function(err){
              
        }
      )
    },
    // 点击已读
    clIckYes(item){
      var that = this
      var url = 'message/readMessage'
      var prams = {
        message_id:item.message_id
      }
      http.postRequest(url,prams,
        function(res){
          if(res.errcode===0){
            var nesList = that.props.nesList.toJS();
            for(var i = 0; i < nesList.length;i++){
              if(nesList[i].message_id===item.message_id){
                nesList[i].read_status='yes';
              }
            }
            var action = actionCreators.setNesList(nesList);
            dispatch(action);
          }
        },
        function(err){
              
        }
      )
    }
  }
}
export default connect(mapStateTopProps,mapDispatchToProps)(News)
