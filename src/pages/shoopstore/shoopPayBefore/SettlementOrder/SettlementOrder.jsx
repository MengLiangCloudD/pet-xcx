import React, { Component } from 'react'
import { View, Text,Image } from '@tarojs/components'
import './SettlementOrder.scss'
import Hearder from '../../../../commen/header/header';
import { connect } from 'react-redux';
import Taro from '@tarojs/taro'
import http from './../../../../utils/http';
//支付的redux
import * as actionCreatorsPay from './../../../paymentOrder/store/actionCreators';
// 地址的redux
import * as actionCreatorSite from './../../../myCenter/MyAddress/addressList/store/actionCreators';
//当前redux
import * as actionCreators from './store/actionCreators';
import * as imager from './../../assager';
class SettlementOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            header:'结算页',
            //结算金额
            shoopPrice:{},
            switch:0,
            submitStart:true
        }
        
    }
    componentWillMount () { 
        this.selectShoopPrice(this)
        if(this.props.doORlook===0){
            this.props.geAddress(this)
        }
    }

    componentDidMount () { }

    componentWillUnmount () { }
    //进入页面时判断是否需要授权
    componentDidShow () { 
        // if(wx.getStorageSync('token')==undefined||wx.getStorageSync('token')==''||wx.getStorageSync('token')==null||wx.getStorageSync('avatar')==undefined||wx.getStorageSync('avatar')==''||wx.getStorageSync('avatar')==null||wx.getStorageSync('nickname')==undefined||wx.getStorageSync('nickname')==''||wx.getStorageSync('nickname')==null){
        //   wx.navigateTo({
        //     url: '/pages/impower/impower'　　
        //   })
        // }else{
      
        // }
    }
    componentDidHide () { }
    //返回上一层
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
   
    //获取结算金额
    selectShoopPrice(that){
        var url  = 'mallOrder/dynamicCal';
        var prams = {
            integral:0,
            goods_json:JSON.stringify(that.props.settlementListss)      
        }
        http.postRequest(url,prams,
            function(res){
                if(res.errcode===0){
                  that.setState({
                        shoopPrice:res.data
                    })
                }
            },
            function(err){
                
            }
          )
    }
    updateSwitch(){
        var switchs=''
        if(this.state.switch===0){
            switchs=1
        }else{
            switchs=0
        }
        this.setState({
            switch:switchs
        })
    }
    //商品信息
    getShoopINn(){
        const {settlementListss} = this.props;
        var list = settlementListss.toJS();
        return (
            <View>
                {
                    list.map((item, index) => {
                        return (
                            <View className="shoop_content" key={index}>
                                <View className="shoop_icno">
                                    <Image  mode="widthFix" className="shoop_imgzhu" src={item.proMianPhoto}/>
                                </View>
                                <View className="shoop_infor">
                                    <View className="infor_text">{item.drugName}</View>
                                    <View className="infor_text">
                                        <Text>运费：</Text>
                                        <Text>包邮</Text>
                                    </View>
                                    <View className="infor_text">
                                        <Text>类别：</Text>
                                        <Text>{item.sku_name}</Text>
                                    </View>
                                    <View className="infor_number">
                                        <Text>购买数量</Text>
                                    </View>
                                </View>
                                <View className="shoop_guige">
                                    <View className="guige_price">
                                        ￥{item.proPlatform}
                                    </View>
                                    <View className="guige_danja">
                                        <Text>x1</Text>
                                    </View>
                                    <View className="guige_number">
                                        <Text>{item.goods_counts}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        )
        
        
        
    }
    
    render () {
        var {addRessInfo} = this.props;
        var address = addRessInfo.toJS()
        const config = require('./../../../../utils/config');
        return (
            <View className='components-page'>
                <Hearder titleText={this.state.header} goback={true} toback={this.getback.bind(this)}></Hearder>
                <View className="SettlementOrder">
                    {
                        JSON.stringify(address) === '{}'
                        ?<View className="site">
                            <View className="site_title" onClick={this.props.selectSite.bind(this)}>
                                <Image  mode="widthFix" className="imager" src={config.imgUrl+'dizhi%402x.png'}/>
                                <Text className="title_text">收货地址</Text>
                                <View className="genduo">
                                    <Image  mode="widthFix" className="imager2" src={config.imgUrl+'fanhui%402x.png'}/>
                                </View>
                                <View className="site_name">
                                    请添加收货地址
                                </View>
                            </View>
                        </View>
                        :<View className="site">
                        <View className="site_title" onClick={this.props.selectSite.bind(this)}>
                            <Image  mode="widthFix" className="imager" src={config.imgUrl+'dizhi%402x.png'}/>
                            <Text className="title_text">收货地址</Text>
                            <View className="genduo">
                                <Image  mode="widthFix" className="imager2" src={config.imgUrl+'fanhui%402x.png'}/>
                            </View>
                        </View>
                        <View className="site_name">
                            <Text className="name">{address.recipient}</Text>
                            <Text className="site_number">{address.mobile}</Text>
                        </View>
                        <View className="dizhi">
                            <Text>{address.address}</Text>
                        </View>
                        <View className="fuwu">
                            <Text>
                                收货不方便时，可以选择暂寄服务
                            </Text>
                        </View>
                    </View>
                    }
                    
                    <View className="shoop">
                        <View className="shoop_title">
                            <Image  mode="widthFix" className="shoop_imager" src={config.imgUrl+'tianmaot%402x.png'}/>
                            <Text className="shoop_text">商品</Text>
                        </View>
                        {this.getShoopINn()}
                        <View className="price_title">
                           <Image  mode="widthFix" className="price_imager" src={config.imgUrl+'dkw_jine%402x.png'}/>
                            <Text className="price_text">金额</Text>
                        </View>
                        <View className="price_content">
                            <View className="comtent_text">
                                <Text>商品金额：</Text>
                                <Text>￥{this.state.shoopPrice.pro_platform_sum}</Text>
                            </View>
                            <View className="comtent_text comtent_text1">
                                <Text>积分抵扣：</Text>
                                <Text>￥-{this.state.shoopPrice.integral}</Text>
                                {
                                    this.state.switch===0?<Image  mode="widthFix" className="switch" src={imager.kai} onClick={this.updateSwitch.bind(this)}/>:<Image  mode="widthFix" className="switch" src={imager.guan} onClick={this.updateSwitch.bind(this)}/>
                                }
                            </View>
                            <View className="comtent_text ">
                                <Text>运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费：</Text>
                                <Text>￥{this.state.shoopPrice.pro_freight_sum}</Text>
                               
                            </View>
                        </View>
                        <View className="shoop_bottom">
                            共计2件 小计：￥{this.state.shoopPrice.totle_sum}
                        </View>
                    </View>
                    <View className="bottom">
                        <View className="total">
                           <Text className="gong">共2件，</Text>
                           <Text>合计：</Text>
                           <Text>￥{this.state.shoopPrice.totle_sum}</Text>
                        </View>
                        <View className="balance" onClick={this.props.setOrder.bind(this)}>立即支付</View>
                    </View>
                </View>
            </View>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        settlementListss:state.getIn(['shoppingCart','settlementListss']),
        //判断从购物车进入还是详情页进入
        ordered_type:state.getIn(['shoppingCart','ordered_type']),
        //地址
        addRessInfo:state.getIn(['SettlementOrder','addRessInfo']),
        //地址状态
        doORlook:state.getIn(["addressList","doORlook"]),
        //pid
        Pid:state.getIn(['SettlementOrder','Pid']),   
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    return {
        //下单校验
        setOrder(){
            if(this.state.submitStart===true){
                this.setState(()=>({
                    submitStart:false
                  }),()=>{
                    this.props.getOrder(this)
                  })
                
            }
        },
        //下单
        getOrder(that){
            var address = that.props.addRessInfo.toJS();
            if(JSON.stringify(address) !== '{}'){
                var url  = 'mallOrder/ordered';
                var addRessInfo =that.props.addRessInfo.toJS();
                var integral
                var pid = ''
                if(that.state.switchs===0){
                    integral=that.state.shoopPrice.integral
                }else{
                    integral=0;
                }
                var ordered_type=''
                if(that.props.ordered_type===2){
                    ordered_type=2
                }else{
                    ordered_type=1
                }
                if(that.props.ordered_type===3){
                    pid = that.props.Pid
                }
                var prams = {
                    integral:integral,
                    goods_json:JSON.stringify(that.props.settlementListss),
                    ordered_type:ordered_type,
                    address_id:addRessInfo.addressId,
                    pid:pid
                }
                http.postRequest(url,prams,
                    function(res){
                        if(res.errcode===0){
                            var orderNoaction = actionCreatorsPay.getorderNo(res.data.order_id);
                            var orderTypeaction =  actionCreatorsPay.getType(2);
                            var priceAction = actionCreatorsPay.getPrice(that.state.shoopPrice.totle_sum);
                            var cardNoAction = actionCreatorsPay.getCardNumber('');
                            dispatch(cardNoAction);
                            dispatch(orderNoaction);
                            dispatch(orderTypeaction);
                            dispatch(priceAction);
                            Taro.navigateTo({
                                url: '/pages/paymentOrder/paymentOrder'　　
                            })
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
            }else{
                that.setState({
                    submitStart:true
                })
                Taro.showToast({
                    title: '请添加地址',
                    icon: 'success',
                    duration: 2000
                })
            }
        },
         //查询收货地址
        geAddress(){
            var url = 'address/getWXItem';
            var prams = {

            }
            http.postRequest(url,prams,
                function(res){
                    if(res.errcode===0){
                        var action = actionCreators.addRessInfo(res.data);
                        dispatch(action);
                    }
                    if(res.errcode===9003){
                        var action1 = actionCreators.addRessInfo({});
                        dispatch(action1);
                    }
                },
                function(err){
                    
                }
            )
        },
        // 选择地址
        selectSite(){
            Taro.navigateTo({
                url: '/pages/myCenter/MyAddress/addressList/addressList',
            });
            var action = actionCreatorSite.MydoORlook(1);
            dispatch(action)
        }
    }
  }
export default connect(mapStateTopProps,mapDispatchToProps)(SettlementOrder)