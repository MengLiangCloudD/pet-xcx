import React, { Component } from 'react'
import { View, Text, Label, CheckboxGroup,Image,ScrollView  } from '@tarojs/components'
import './shoopInfo.scss'
import Hearder from '../../../../commen/header/header';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import * as actionCreatorsCat from './../shoppingCart/store/actionCreators';
import Taro, { addCard } from '@tarojs/taro'
import * as imager from './../../assager';
import http from './../../../../utils/http';
class ShoopInfo extends Component{
    constructor(props) {
        super(props)
        this.state = {
            header:'商品详情',
            modeType:0,
            //判断是否需要执行render
            isLoading:true,
            //当前选中的sku
            skuName:'',
            //所选商品信息
            selectSoop:{},
            //数量
            number:1
        }
    }
    componentWillMount () {
        this.setState(()=>({
            isLoading:true
          }),()=>{

          })
        this.props.getShoopInfor(this);
    }

    componentDidMount () { }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }
    getback(){
          Taro.navigateBack({
            delta: 1
          })
    }
    
    //加减数量
    minusORadd(type){
        var number = this.state.number;
        if(type===0){
            if(number>1){
                number-=1
            }else{
              
            }
          }else if(type===1){
            number+=1;
          }
          this.setState(()=>({
            number:number
          }),()=>{
    
          })
    }
    //弹出层
    getModel(){
        const { shoopInfo } = this.props;
        var InfoShoop = shoopInfo.toJS();
            return (
                <View className={this.state.modeType!==0?"modal1":"modal"}>
                    <View className="title">
                        <View className="imger">
                            <Image  mode="widthFix" className="shoop_imgzhu" src={InfoShoop.proMianPhoto}/>
                        </View>
                        <View className="info">
                            <View className="price">￥{InfoShoop.proPlatform}</View>
                            {/* <View className="kucun">库存456件</View> */}
                        </View>
                        <View className="delate" onClick={this.clickModel.bind(this,0)}>
                            <Image className="delate_img" src={imager.delate}/>
                        </View>
                    </View>
                    <View className="colorType">
                        {
                            
                            InfoShoop.sku.map((item, index) => {
                                return (
                                    <View className={item.type===0?'type_item':"item_type"} key={index} onClick={this.props.updateSku.bind(this,item)}>
                                        <View className="type_img">
                                             <Image  mode="widthFix" className="shoop_imgzhu" src={InfoShoop.proMianPhoto}/>
                                        </View>
                                        <View className="type_text">
                                            {item.skuName} 
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View className="shoopNumber">
                        <View className="Number">购买数量</View>
                        <View className="operation">
                            <View className="minus" onClick={this.minusORadd.bind(this,0)}>-</View>
                            <View className="quantity">{this.state.number}</View>
                            <View className="add" onClick={this.minusORadd.bind(this,1)}>+</View>
                          </View>
                    </View>
                    <View className="okBtn">
                        <View className="addBtn" onClick={this.props.addCat.bind(this)}>
                            确认
                        </View>
                    </View>
                </View>
            )
    }
    clickModel(type){
        this.setState(()=>({
            modeType:type
          }),()=>{

          })
    }
    //点击进入购物车
  goCatShoop(){
    Taro.navigateTo({
        url: '/pages/shoopstore/shoopPayBefore/shoppingCart/shoppingCart'
    })
  }
    render(){
        let {isLoading} = this.state
        //判断是否需要执行
        　if (isLoading) {
        　　　return ''
        　}
        const { shoopInfo } = this.props
        var InfoShoop = shoopInfo.toJS();
        const config = require('./../../../../utils/config');
        return (
            <View className='components-page'>
                <View className={this.state.modeType!==0?"zhe":""} onClick={this.clickModel.bind(this,0)}></View>
                <View className="titslse">
                    
                    <Hearder titleText={this.state.header} goback={true} toback={this.getback} background={true}></Hearder>
                </View>
                
                <View className="navImg">
                   <Image  mode="widthFix" className="shoop_imgzhu" src={InfoShoop.proMianPhoto}/>
                </View>
                <View className="shoop_jies">
                    <View className="price">
                        ￥{InfoShoop.proPlatform}
                    </View>
                    <View className="store_name">
                        {/* <Image className="store_img" src={config.imgUrl+'tianmaot%402x.png'}/>
                        <Text className="store">天猫新品</Text> */}
                    </View>
                    <View className="shoop_name">
                        {InfoShoop.drugName}
                    </View>
                    <View className="shoopinfo">
                        {InfoShoop.proDescription}
                    </View>
                    <View className="xiaoshou">
                        {/* 已售23966件 */}
                    </View>
                </View>
                <View className="info_dizhi">
                    <View className="yunfei">
                        <Text className="test1">运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费：</Text>
                        {
                            InfoShoop.proFreight>0?<Text className="test2">{InfoShoop.proFreight}元</Text>:<Text className="test2">包邮</Text>
                        }
                    </View>
                    <View className="pinpai">
                        <Text className="test1">品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：</Text>
                        <Text className="test2">{InfoShoop.typeName}</Text>
                    </View>
                    <View className="shiyong">
                        <Text className="test1">适用阶段：</Text>
                        <Text className="test2">{InfoShoop.proStage}</Text>
                    </View>
                    <View className="baozhi">
                        <Text className="test1">保&nbsp;&nbsp;质&nbsp;期：</Text>
                        <Text className="test2">{InfoShoop.proQuality}</Text>
                    </View>
                </View>
                <View className="content">
                    {
                       InfoShoop.proNoticeTypes.map((item,index)=>{
                           return (
                            <View className="navImgInfo" key={index}>
                                 <Image  mode="widthFix" className="shoop_imgzhu" src={item}/>
                            </View>
                           )
                       })
                    }
                    {/* <View className="navImg">

                    </View>
                    <View className="navImg">
                        
                    </View>
                    <View className="navImg">
                        
                    </View> */}
                </View>
                <View className="bottom">
                    <View className="gouwuche" onClick={this.goCatShoop.bind(this)}>
                        <Image className="gouwuche_img" src={imager.gouwuche2}/>
                        <View className="gouwuche_text">购物车</View>
                    </View>
                    <View className="kefu">
                        <Image className="kefu_img" src={imager.kefu}/>
                        <View className="kefu_text">客服</View>
                    </View>
                    <View className="shoucan">
                        <Image className="shoucan_img" src={imager.shoucan}/>
                        <View className="shoucan_text">收藏</View>
                    </View>
                    <View className="btn">
                        <View className="shoopCat_btn" onClick={this.clickModel.bind(this,1)}>
                            加入购物车
                        </View>
                        <View className="shoopPay_btn" onClick={this.clickModel.bind(this,2)}>
                            立即支付
                        </View>
                    </View>
                </View>
                {this.getModel()}
            </View>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        //商品详情
        shoopInfo:state.getIn(['shoopInfo','shoopInfo']),
        //选中那个
        selectList:state.getIn(['shoppingCart','selectList']),
        productId:state.getIn(['shoopList','productId'])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        //请求商品详情
        getShoopInfor(that){
            var url = 'product/itemWx';
            var prams = {
                productId:that.props.productId
            }
            http.postRequest(url,prams,
                function(res){
                    if(res.errcode===0){
                        for(var i = 0;i<res.data.sku.length;i++){
                            res.data.sku[i].type=0;
                        }
                        res.data.sku[0].type=1;
                        that.setState(()=>({
                            skuName:res.data.sku[0].skuName
                        }),()=>{
        
                        })
                        setTimeout(() => {
                            that.setState(()=>({
                                isLoading:false
                              }),()=>{
    
                              })
                        }, 300);
                        
                        
                        var action = actionCreators.setShoopInfo(res.data);
                        dispatch(action)
                    }
                },
                function(err){
                    
                }
            )
        },
        //修改选中颜色
        updateSku(item){
            var shoopInfo = this.props.shoopInfo.toJS()
            for(var i = 0;i<shoopInfo.sku.length;i++){
                if(shoopInfo.sku[i].skuName===item.skuName){
                    shoopInfo.sku[i].type=1
                }else{
                    shoopInfo.sku[i].type=0
                }
                this.setState(()=>({
                    skuName:item.skuName
                }),()=>{

                })
            }
            var action = actionCreators.setShoopInfo(shoopInfo);
                        dispatch(action)
        },
        //加入购物车
        addCat(){
            var type = this.state.modeType
            if(type===1){
                var url = 'cart/add';
                var goodsIds = []
                var obj = {}
                obj.productId=this.props.productId;
                obj.num = this.state.number;
                obj.skuName=this.state.skuName
                goodsIds.push(obj)
                var prams = {
                    goodsIds:JSON.stringify(goodsIds)
                }
                http.postRequest(url,prams,
                    function(res){
                        if(res.errcode===0){
                            Taro.showToast({
                                title: '加入成功',
                                icon: 'success',
                                duration: 2000
                              })
                        }
                    },
                    function(err){
                        
                    }
                )
            }else if(type===2){
                var selectList = [];
                var shoopInfo = this.props.shoopInfo.toJS()
                var selectSoop = this.state.selectSoop;
                selectSoop.product_id = this.props.productId,
                selectSoop.goods_counts = this.state.number;
                selectSoop.sku_name = this.state.skuName;
                selectSoop.proPlatform =shoopInfo.proPlatform;
                selectSoop.drugName =shoopInfo.drugName;
                selectSoop.proMianPhoto= shoopInfo.proMianPhoto;
                selectSoop.proFreight=shoopInfo.proFreight;
                selectList.push(selectSoop);
                var  upateSelectListAction = actionCreatorsCat.settlementList(selectList);
                var  setOrderedTypeAction = actionCreatorsCat.setOrderedType(1)
                dispatch(setOrderedTypeAction);
                dispatch(upateSelectListAction);
                Taro.navigateTo({
                    url: '/pages/shoopstore/shoopPayBefore/SettlementOrder/SettlementOrder'　　
                })
            }
            
        }
    }
}
export default connect(mapStateTopProps,mapDispatchToProps)(ShoopInfo)