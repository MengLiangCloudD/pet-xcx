import React, { Component } from 'react'
import { View, Text, Checkbox, Label, CheckboxGroup,Image } from '@tarojs/components'
import './shoppingCart.scss'
import Hearder from '../../../../commen/header/header';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import Taro from '@tarojs/taro'
import http from './../../../../utils/http';
class ShoppingCart extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    
  }
  componentWillMount() { 
    
  }

  componentDidMount() { 
    this.props.selectcartList(this)
  }

  componentWillUnmount() { }
  //进入页面时判断是否需要授权
  componentDidShow() {
    if (wx.getStorageSync('token') == undefined || wx.getStorageSync('token') == '' || wx.getStorageSync('token') == null || wx.getStorageSync('avatar') == undefined || wx.getStorageSync('avatar') == '' || wx.getStorageSync('avatar') == null || wx.getStorageSync('nickname') == undefined || wx.getStorageSync('nickname') == '' || wx.getStorageSync('nickname') == null) {
      Taro.navigateTo({
        url: '/pages/impower/impower'
      })
    } else {

    }
  }
  componentDidHide() { }
  //返回上一层
  getback(){
    Taro.navigateBack({
      delta: 1
    })
  }
  render() {
    const { header,shoopList,checkAll,total } = this.props;
    const catList=shoopList.toJS();
    return (
      <View className='components-page'>
        <View className="title">
          <Hearder titleText={header} goback={true} toback={this.getback}></Hearder>
          <View className="nav">
          <Text className="text">购物车商品（{catList.length}）</Text>
          </View>
        </View>
          <View className="cat">
          <View className="content">
            <View className="shoop_cat">
              <View className="shoop_List">
                <CheckboxGroup onChange={this.props.Acheck.bind(this)}>
                  {
                    catList.map((item, index) => {
                      return (
                        <View className="shoop_item" key={index}>
                          <View className={item.value ? "check zhong" : "check"}>
                            <Checkbox value={index} className="shoop_check" checked={item.value}></Checkbox>
                          </View>
                          <View className="shoopInfor">
                            <View className="shoopImg">
                                <Image  mode="widthFix" className="shoop_imgzhu" src={item.proMianPhoto}/>
                            </View>
                            <View className="shoopText">
                              <View className="testInfor">{item.drugName}</View>
                              <View className="testInfor"> <Text>运费：</Text> <Text>包邮</Text></View>
                              <View > <Text>类别：</Text> <Text>{item.skuName}</Text></View>
                              <View className="unitPrice">￥{item.proPlatform}</View>
                            </View>
                          </View>
                          {/* 删除 */}
                          <View className="delatefor" onClick={this.props.delateShoop.bind(this,index)}>
                            <View className="delate" >

                            </View>
                          </View>
                          
                          <View className="operation">
                            <View className="minus" onClick={this.props.minusORadd.bind(this,index,0)}>-</View>
                            <View className="quantity">{item.num}</View>
                            <View className="add" onClick={this.props.minusORadd.bind(this,index,1)}>+</View>
                          </View>
                        </View>
                      )
                    })
                  }
                </CheckboxGroup>
                <View className="bottom">
                  <View className="checkGrop">
                    <CheckboxGroup onChange={this.props.Allcheck.bind(this)}>
                      <View className={checkAll ? "check zhong" : "check"}>
                        <Checkbox value="全选" checked={this.state.checkAll} className="shoop_check"></Checkbox>
                      </View>
                      <Label className="lable">全选</Label>
                    </CheckboxGroup>
                  </View>
                  <View className="total">
                    <Text>合计：</Text>
                    <Text>￥{total.toFixed(2)}</Text>
                  </View>
                  <View className="balance" onClick={this.props.goSettlement.bind(this)}>立即支付</View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
const mapStateTopProps = (state) => {
  return {
    //头部信息
    header:state.getIn(['shoppingCart','header']),
    //商品列表
    shoopList:state.getIn(['shoppingCart','shoopList']),
    //是否全选
    checkAll:state.getIn(['shoppingCart','checkAll']),
    //选中那个
    selectList:state.getIn(['shoppingCart','selectList']),
    //合计
    total:state.getIn(['shoppingCart','total'])
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    //查询购物车
    selectcartList(that){
      var url = 'cart/list'
      var prams = {

      }
      http.postRequest(url,prams,
        function(res){
            if(res.errcode===0){
              var data =  res.data
              for(var i = 0;i<data.length;i++){
                data[i].value = false;
              }
              //初始化重置数据
              var  shoopListAction = actionCreators.upateShoopList(data);
              var  shoopUpateTotal= actionCreators.upateTotal(0)
              var  upateCheckAllAction = actionCreators.upateCheckAll(false);
              var  upateSelectListAction = actionCreators.upateSelectList([]);
              dispatch(shoopListAction);
              dispatch(upateCheckAllAction);
              dispatch(upateSelectListAction);
              dispatch(shoopUpateTotal);
            }
        },
        function(err){
            
        }
      )
    },
    //勾选
    Acheck(e) {
      var check = e.target.value;
      var shoopList = this.props.shoopList;
      var list = shoopList.toJS();
      var checkAll = this.props.checkAll;
      var selectList = [];
      //初始化选中状态
      for (var i = 0; i < list.length; i++) {
        list[i].value = false;
      }
      //判断选中了那几个
      for (var i = 0; i < check.length; i++) {
        list[check[i]].value = true;
        selectList.push(list[check[i]])
      }
      //判断是否全部选中
      if (selectList.length == list.length) {
        checkAll = true
      } else {
        checkAll = false
      }
      var totalPrice=0.00;
      //计算总价格
      for(var i = 0;i<selectList.length;i++){
        totalPrice+=selectList[i].proPlatform*selectList[i].num
      }
      var total= totalPrice;
      var  shoopUpateTotal= actionCreators.upateTotal(total)
      var  shoopListAction = actionCreators.upateShoopList(list);
      var  upateCheckAllAction = actionCreators.upateCheckAll(checkAll);
      var  upateSelectListAction = actionCreators.upateSelectList(selectList);
      dispatch(shoopListAction);
      dispatch(upateCheckAllAction);
      dispatch(upateSelectListAction);
      dispatch(shoopUpateTotal);
    },
  //全选方法
    Allcheck(e) {
      var shoopList = this.props.shoopList;
      var list = shoopList.toJS();
      var checkAll = this.props.checkAll;
      var selectList = [];
      if (e.target.value[0] == '全选') {
        checkAll = true
        for (var i = 0; i < list.length; i++) {
          list[i].value = true;
          selectList.push(list[i])
        }
      } else {
        checkAll = false;
        selectList = []
        for (var i = 0; i < list.length; i++) {
          list[i].value = false;
        }
      }
      var totalPrice=0.00;
      //计算总价格
      for(var i = 0;i<selectList.length;i++){
        totalPrice+=selectList[i].proPlatform*selectList[i].num
      }
      var total= totalPrice;
      var  shoopUpateTotal= actionCreators.upateTotal(total)
      var  shoopListAction =actionCreators.upateShoopList(list);
      var  upateCheckAllAction =actionCreators.upateCheckAll(checkAll);
      var  upateSelectListAction =actionCreators.upateSelectList(selectList);
      dispatch(shoopListAction);
      dispatch(upateCheckAllAction);
      dispatch(upateSelectListAction);
      dispatch(shoopUpateTotal);
    },
    //加减数量
    minusORadd(index,type){
      var shoopList = this.props.shoopList;
      var list =shoopList.toJS();
      if(type===0){
        if(list[index].num>1){
          list[index].num= parseInt(list[index].num) - 1;
        }else{
          return
        }
      }else if(type===1){
        list[index].num = parseInt(list[index].num) + 1;
      }
      var url = 'cart/modify'
      var prams = {
        productId:list[index].productId,
        num:list[index].num,
        skuName:list[index].skuName
      }
      http.postRequest(url,prams,
        function(res){
            if(res.errcode===0){
               //判断是否为选中状态选中状态修改选中数据修改价格
              if(list[index].value===true){
                var selectList = [];
                for(var i = 0;i<list.length;i++){
                  if(list[i].value===true){
                    selectList.push(list[i]);
                  }
                }
                var totalPrice=0.00;
                //计算总价格
                for(var i = 0;i<selectList.length;i++){
                  totalPrice += selectList[i].proPlatform*selectList[i].num
                }
                var total= totalPrice;
                var  upateSelectListAction =actionCreators.upateSelectList(selectList);
                var  shoopUpateTotal = actionCreators.upateTotal(total)
                dispatch(shoopUpateTotal);
                dispatch(upateSelectListAction);
              }
              var  shoopListAction =actionCreators.upateShoopList(list);
              dispatch(shoopListAction);
            }
        },
        function(err){
            
        }
      )
     
    },
    //删除商品
    delateShoop(index){
      var shoopList = this.props.shoopList;
      var list =shoopList.toJS();
      var url = 'cart/delete'
      var ids = []
      ids.push({productId:list[index].productId,skuName:list[index].skuName})
      var prams = {
        ids:JSON.stringify(ids)
      }
      http.postRequest(url,prams,
        function(res){
            if(res.errcode===0){
              if(list[index].value===true){
                list.splice(index,1);
                var selectList = [];
                for(var i = 0;i<list.length;i++){
                  if(list[i].value===true){
                    selectList.push(list[i]);
                  }
                }
                var totalPrice=0.00;
                //计算总价格
                for(var i = 0;i<selectList.length;i++){
                  totalPrice += selectList[i].proPlatform*selectList[i].num
                }
                var total= totalPrice;
                var  upateSelectListAction =actionCreators.upateSelectList(selectList);
                var  shoopUpateTotal = actionCreators.upateTotal(total)
                dispatch(shoopUpateTotal);
                dispatch(upateSelectListAction);
              }else{
                list.splice(index,1);
              }
              var  shoopListAction =actionCreators.upateShoopList(list);
              dispatch(shoopListAction);
            }
        },
        function(err){
            
        }
      )
    },
    //去结算
    goSettlement(){
      var selectList= this.props.selectList;
      var list = selectList.toJS();
      if(list.length>0){
        var data = []
        for(var i = 0;i<list.length;i++){
          var obj = {}
          obj.product_id = list[i].productId;
          obj.goods_counts = list[i].num;
          obj.sku_name = list[i].skuName;
          obj.proPlatform =list[i].proPlatform;
          obj.drugName =list[i].drugName;
          obj.proMianPhoto= list[i].proMianPhoto;
          obj.proFreight=list[i].proFreight;
          data.push(obj);
        }
        var  settlementListAction = actionCreators.settlementList(data)
        var  setOrderedTypeAction = actionCreators.setOrderedType(2)
        dispatch(setOrderedTypeAction);
        dispatch(settlementListAction);
        Taro.navigateTo({
          url: '/pages/shoopstore/shoopPayBefore/SettlementOrder/SettlementOrder'　　
        })
      }else{
        Taro.showToast({
          title: '请先选择商品',
          icon: 'success',
          duration: 2000
        })
      }
        
    }
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(ShoppingCart)