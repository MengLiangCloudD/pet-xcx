import React, { Component } from 'react'
import { View, Text, Input, Image, ScrollView } from '@tarojs/components'
import './myShoopOrder.scss'
import { clickPublic } from '../../../commen/publiClick';
import Hearder from '../../../commen/header/header';
import { connect } from 'react-redux';
import Taro from '@tarojs/taro';
import * as actionCreators from './store/actionCreators';
import * as actionCreatorsInfo from '../orderInfo/store/actionCreators';
import * as actionCreatorsPayment from '../../paymentOrder/store/actionCreators';
import * as imager from '../assager';
import http from '../../../utils/http';
class MyOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      header: '商城订单',
      //选中的是哪个
      selectType: 0,
      //更多
      ifGenduo: false,
      //总页数
      allYear: 0,
      //默认第一页
      offset: 1,
      //一页默认十条
      limit: 10,
      isOpened:false,
      orderId:''
    }

  }

  componentDidMount() {
    
  }

  componentWillUnmount() { }
  //进入页面时判断是否需要授权
  componentDidShow() { 
    var offset = 1;
    var selectType = 0;
    this.setState(() => ({
      offset: offset,
      selectType: selectType
    }), () => {
      this.props.getOrderList(this)
    })
  }

  componentDidHide() { }
  //返回个人中心
  getback() {
    Taro.switchTab({
      url: '/pages/index/myCenter/myCenter',
    });
  }
  //上划加载
  onScrolltoupper(e) {
    var offset = this.state.offset;

    if (offset < this.state.allYear) {
      offset += 1
      this.setState(() => ({
        offset: offset
      }), () => {
        this.props.getOrderList(this,0)
      })

    } else {

    }

  }
  
  //未支付时打开更多
  moreClick() {
    var ifGenduo = !this.state.ifGenduo;
    this.setState({
      ifGenduo: ifGenduo
    })
  }
  itemModule() {
    var { orderList } = this.props;
    var list = orderList.toJS();
    const config = require('./../../../utils/config');
    return (
      list.length>0?
      list.map((item, index) => {
        return (
          <View className="item_content" key={index}>
            <View className="item_title">
              <View className="shoop_loge">
                <Image mode="widthFix" className="loge_image" src={config.imgUrl+'tianmaot%402x.png'} />
                <View className="shoop_text">
                  商品
                  </View>
              </View>
              {
                item.order_code === 8 
                ?<View className="shoop_state">
                    申请退款中
                </View>
                : item.order_code === 20
                ? <View className="shoop_state">
                    待收货
                </View>
                : item.order_code === 30
                ? <View className="shoop_state">
                  待收货
                </View>
                : item.order_code === 40
                ? <View className="shoop_state">
                    待收货
                </View>
                : item.order_code === 50
                ? <View className="shoop_state">
                  订单完成
                </View>
                : item.order_code === 7
                ? <View className="shoop_state">
                  订单取消
                </View>
                : <View className="shoop_state">
                  待付款
                </View>
              }
            </View>
            {

              item.subOrderList.map((items, indexId) => {
                return (
                  <View className="shoop_item" key={indexId} onClick={this.props.goOrderInfo.bind(this, item.order_id)}>
                    <View className="shoop_img">
                       <Image  mode="widthFix" className="imager" src={items.pro_main_photo} />
                    </View>
                    <View className="shoop_info">
                      <View className="shoop_jieshao">
                        <View className="text">{items.drug_name}</View>
                        <View className="text">
                          <Text>运费：</Text>
                          {
                            item.pro_freight_sum>0?<Text>{item.pro_freight_sum}</Text>:<Text>包邮</Text>
                          }
                        </View>
                        <View className="text">
                          <Text>类别：</Text>
                          <Text>{items.sku_name}</Text>
                        </View>
                      </View>
                      <View className="shoop_guig">
                        <View className="gui_text">￥{items.pro_platform}</View>
                        <View className="gui_text">X{items.goods_counts}</View>
                      </View>
                    </View>
                  </View>
                )
              })
            }
            <View className="zongji">
              <View className="allPrice">
                <Text className="texrt1">总价：</Text>
                <Text className="texrt2">￥{item.pro_sum}</Text>
              </View>
              <View className="discounts">
                <Text className="texrt1">优惠：</Text>
                <Text className="texrt2">￥{item.integral}</Text>
              </View>
              <View className="reality">
                <Text className="texrt1">实付款：</Text>
                <Text className="texrt2">￥{item.totle_sum}</Text>
              </View>
            </View>
            <View className="order_bottom">
              {
                item.order_code === 10
                ? <View className="tishi">订单即将关闭，建议尽快支付</View>
                : ''
              }

              <View className="bottom_btn">
                {/* 隐藏掉的东西 暂时用不上 */}
                <View className="gengduuo">
                  <View className="clickZhezao" onClick={this.moreClick.bind(this)}>
                    <Image mode="widthFix" className="qita" src={imager.qita} />
                  </View>
                  <View className={this.state.ifGenduo ? "info_content info_block" : "info_content info_none"}>
                    <View></View>
                    <View className="info_text1">取消订单</View>
                    <View className="info_text2">联系卖家</View>
                  </View>
                </View>
                {
                  item.order_code === 10
                  ? <View className="butt">
                      <View className="update_dizhi" onClick={this.modelTrue.bind(this, item.order_id)}>取消订单</View>
                      <View className="bottoner" onClick={this.props.gouPayment.bind(this, item.order_id, item.totle_sum, 2)}>去支付</View>
                  </View>
                  : item.order_code === 20
                  ? <View className="butt">
                      <View className="update_dizhi" onClick={this.modelTrue.bind(this, item.order_id)}>取消订单</View>
                        
                  </View>
                  : item.order_code === 30
                  ? <View className="butt">

                  </View>
                  : item.order_code === 40
                  ? <View className="butt">
                    <View className="bottoner" onClick={this.props.confirmOrder.bind(this, item.order_id)}>确认收货</View>
                  </View>
                  : item.order_code === 8
                  ? <View className="butt">
                      {/* <View className="bottoner">取消申请</View> */}
                  </View>
                  : item.order_code === 7
                  ? <View className="butt">
                      {/* <View className="update_dizhi">删除订单</View> */}
                  </View>
                  : <View className="butt">
                    {/* <View className="update_dizhi">删除订单</View> */}
                  </View>
                }

              </View>
            </View>
          </View>
        )
      }):<View className="que">
          <Image  mode="widthFix" className="que" src={config.imgUrl+'noContent.png'}/>
      </View>
    )


  }
    handleCancel(){
        this.setState({isOpened:false})
    }
    handleConfirm(){
        this.setState({isOpened:false})
        this.props.updateOrder(this,this.state.orderId)
    }
    //弹出层
    modelTrue(orderId){
        this.setState({isOpened:true,orderId:orderId})
    }
  render() {
    var style = {
      height:'calc(100% -  40px - 85rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
    }
    var { orderList } = this.props;
    var list = orderList.toJS();
    return (
      <View className='components-page'>
          {
            this.state.isOpened?
            <View className="zhezhao">
                <View className="module">
                    <View className="consstent">
                        您确认取消订单吗！
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
            <View className="nav_list">
              <View className="nav_item" onClick={this.props.updateClick.bind(this, 0)}>
                <View className={this.state.selectType === 0 ? "item_text" : 'text_item'}>
                  全部
                          </View>
                <View className={this.state.selectType === 0 ? "item_border" : ''}></View>
              </View>
              <View className="nav_item" onClick={this.props.updateClick.bind(this, 1)}>
                <View className={this.state.selectType === 1 ? "item_text" : 'text_item'}>
                  待付款
                          </View>
                <View className={this.state.selectType === 1 ? "item_border" : ''}></View>
              </View>
              <View className="nav_item" onClick={this.props.updateClick.bind(this, 2)}>
                <View className={this.state.selectType === 2 ? "item_text" : 'text_item'}>
                  待收货
                          </View>
                <View className={this.state.selectType === 2 ? "item_border" : ''}></View>
              </View>
              <View className="nav_item" onClick={this.props.updateClick.bind(this, 3)}>
                <View className={this.state.selectType === 3 ? "item_text" : 'text_item'}>
                  已完成
                          </View>
                <View className={this.state.selectType === 3 ? "item_border" : ''}></View>
              </View>
              <View className="nav_item" onClick={this.props.updateClick.bind(this, 4)}>
                <View className={this.state.selectType === 4 ? "item_text" : 'text_item'} >
                  已取消
                          </View>
                <View className={this.state.selectType === 4 ? "item_border" : ''}></View>
              </View>
            </View>
          </View>
        </View>
        {/* 订单列表 */}
          <ScrollView className='content'
            scrollY
            scrollWithAnimation
            scrollTop={0}
            style={style}
            lowerThreshold="100"
            onScrolltolower={this.onScrolltoupper.bind(this)}>
            {this.itemModule()}
          </ScrollView>
      </View>
    )
  }
}

const mapStateTopProps = (state) => {
  return {
    orderList: state.getIn(['myShoopOrder', 'orderList'])
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    //获取订单列表
    getOrderList(that,type) {
      var url = 'mallOrder/orderList';
      var limit = that.state.limit;
      var offset = that.state.offset;
      var order_code = that.state.selectType;
      var prams = {
        limit,
        order_code,
        offset
      }
      http.postRequest(url, prams,
        function (res) {
          if (res.errcode == 0) {
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
            if(type===0){
              var content = res.data.content;
              var orderList = that.props.orderList.toJS();
              for (var i = 0; i < content.length; i++) {
                orderList.push(content[i]);
              }
            }else{
              var orderList=res.data.content;
            }
            var orderAction = actionCreators.setOrderList(orderList)
            dispatch(orderAction);
          }

        },
        function (err) {
          console.log(err)
        }
      )
    },
    //取消订单
    updateOrder(that,order_id) {
      var url = 'mallOrder/cancelOrder';
      var prams = {
        order_id: order_id
      }
      http.postRequest(url, prams,
        function (res) {
          if (res.errcode == 0) {
            if (res.data.status === '1' || res.data.status === '2') {
              if(res.data.status === '1' ){
                Taro.showToast({
                  title: '操作成功，订单已取消',
                  icon: 'success',
                  duration: 2000
                })
              }else if(res.data.status === '2'){
                Taro.showToast({
                  title: '操作成功，等待审核',
                  icon: 'success',
                  duration: 2000
                })
              }
              //修改成功改变订单状态
              var list = that.props.orderList.toJS();
              for (var i = 0; i < list.length; i++) {
                if (list[i].order_id === order_id) {
                  list[i].order_code = 7;
                }
              }
              var orderAction = actionCreators.setOrderList(list)
              dispatch(orderAction);
            } else {
              Taro.showToast({
                title: '取消失败',
                icon: 'none',
                duration: 2000
              })
            }
          }else{
            Taro.showToast({
              title: res.errmsg,
              icon: 'none',
              duration: 2000
            })
          }
        },
        function (err) {
          console.log(err)
        }
      )
    },
    //确认收货
    confirmOrder(order_id) {
      var url = 'mallOrder/confirmOrder';
      var prams = {
        order_id: order_id
      }
      http.postRequest(url, prams,
        function (res) {
          if (res.errcode == 0) {
            Taro.showToast({
              title: '收货成功',
              icon: 'success',
              duration: 2000
            })
            //修改成功改变订单状态
            var list = this.props.orderList.toJS();
            for (var i = 0; i < list.length; i++) {
              if (list[i].order_id === order_id) {
                list[i].order_code = 50;
              }
            }
            var orderAction = actionCreators.setOrderList(list)
            dispatch(orderAction);
          }
        },
        function (err) {
          console.log(err)
        }
      )
    },
    //点击去支付
    gouPayment(order_id, price, type) {
      var typeAction = actionCreatorsPayment.getType(type);
      var priceAction = actionCreatorsPayment.getPrice(price);
      var orderNoAction = actionCreatorsPayment.getorderNo(order_id);
      var cardNoAction = actionCreatorsPayment.getCardNumber('');
        dispatch(cardNoAction);
      dispatch(typeAction);
      dispatch(priceAction);
      dispatch(orderNoAction);
      Taro.navigateTo({
        url: '/pages/paymentOrder/paymentOrder',
      });
    },
    //点击进入订单详情
    goOrderInfo(order_id) {
      var orderIdAction = actionCreatorsInfo.getorderNo(order_id);
      dispatch(orderIdAction);
      Taro.navigateTo({
        url: '/pages/myCenter/orderInfo/orderInfo',
      });
    },
    // 切换订单类型
    updateClick(type) {
      var offset = 1;
      this.setState(() => ({
        offset: offset,
        selectType: type
      }), () => {
        //切换类型首先初始化清空数据
        var orderAction = actionCreators.setOrderList([])
        dispatch(orderAction);
        this.props.getOrderList(this)
      })
    }
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(MyOrder)