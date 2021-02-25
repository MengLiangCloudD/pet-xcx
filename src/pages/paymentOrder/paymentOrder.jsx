import React, { Component } from 'react'
import { View, Text,Image } from '@tarojs/components'
import './paymentOrder.scss'
import Hearder from './../../commen/header/header';
import { connect } from 'react-redux';
import { AtCountdown } from 'taro-ui'
import Taro from '@tarojs/taro'
import http from './../../utils/http';
import * as actionCreators from './store/actionCreators';
import * as actionCreatorsDialogueBox from './../home/consult/dialogueBox/store/actionCreators';
import * as imager from './assager';
import selectDefaultCard from './../../commen/selectDefaultCard';
import cardInfo from './../../commen/cardInfo';
class PaymentOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            header:'支付订单',
            background:true,
            //选择支付类型
            selectType:2,
            passworld:'',
            //键盘数据
            keyboard:[{
              key:1,
              value:'1'
            },{
              key:2,
              value:'2'
            },{
              key:3,
              value:'3'
            },{
              key:4,
              value:'4'
            },{
              key:5,
              value:'5'
            },{
              key:6,
              value:'6'
            },{
              key:7,
              value:'7'
            },{
              key:8,
              value:'8'
            },{
              key:9,
              value:'9'
            },{
              key:10,
              value:'10'
            },{
              key:0,
              value:'0'
            },{
              key:11,
              value:'11'
            },],
            payType:0,
            keyType:0,
            timer:0,
            cardInfo:{},
            payStart:true
        }
        
    }
  componentWillMount () {
    //进入页面调用查询时间的接口
    
    this.props.daojis(this);
  }

  componentDidMount () { 
    if(this.props.type===2){
      selectDefaultCard.getCard(this).then(res=>{
        this.setState({
          cardInfo:res
        })
      })
    }else{
      var cardNo = this.props.cardNumber;
      cardInfo.getCardInfo(this,cardNo).then(res=>{
        this.setState({
          cardInfo:res
        })
      })

    }
    
  }

  componentWillUnmount () { }
  //进入页面时判断是否需要授权
  componentDidShow () { 
    
  }
  componentDidHide () { }
  selectClick(index){
    this.setState({
      selectType:index
    })
  }
  onTimeUp () {
    // Taro.showToast({
    //   title: '时间到',
    //   icon: 'success',
    //   duration: 2000
    // })
  }
  //返回上一层
    getback(){
      Taro.navigateBack({
        delta: 1
      })
    }
    //结算封装
    getPayPrice(url){
      var that  = this;
      var card_no = '';
      var card_passwd = '';
      if(that.state.selectType === 1){
        card_no = that.state.cardInfo.cardNo;
        card_passwd = that.state.passworld;
      }
      var prams = {
        order_id:that.props.orderNo,
        payment:that.state.selectType,
        card_no,
        card_passwd,
      }
      http.postRequest(url,prams,
        function(res){
          if(res.errcode==0){
            if(that.state.selectType===2){
              that.props.payOrder(res,that);
            }else{
              that.props.requestSubscribeMessage(that);                                                                                                                                                              
            }
          }else{
            that.setState({
              payStart:true
            })
            Taro.showToast({
              title:res.errmsg,
               icon:'none',
               duration:1000
             })
          }
        },
        function(err){
          console.log(err)
        }
      )
    }
    //结算
    goPaymentOrder(){
      //this.props.type为1是咨询订单支付为2是商城订单支付3为挂号4为住院5为疫苗
      var that = this;
      if(that.props.type===1){
        var url = 'consult/consultPay';
        that.getPayPrice(url)
      }else if(that.props.type===2){
        var url = 'mallOrder/pay'
        that.getPayPrice(url)
      }else if(that.props.type===3){
        var url = 'register/registerPay'
        that.getPayPrice(url)
      }else if(that.props.type===4){
        var url = 'hospitalization/hospitalizationMoneyPay'
        that.getPayPrice(url)
      }else if(that.props.type===5){
        var url = 'vaccinesOrderPay'
        that.getPayPrice(url)
      }else if(that.props.type===6){
        var url = 'card/rechargeCardPay'
        that.getPayPrice(url)
      }else if(that.props.type===7){
        var url = 'department/departmentPay'
        that.getPayPrice(url)
      }
    }
    //点击判断选择的是那种支付方式
     clickPayselect(){
      if(this.state.selectType===1){
        var that = this;
        setTimeout(() => {
          that.setState({
            keyType:1
          })
        }, 100);
        that.setState({
          payType:1
        })
      }else{
        this.goPaymentOrder()
        this.setState({
          keyType:0,
          payType:0,
          passworld:''
        })
      }
     }
    //点击输入密码
    importPassworld(value){
      if(value===11){
        var passworld = this.state.passworld; 
        passworld=passworld.substr(0, passworld.length - 1);
        this.setState({
          passworld:passworld
        })
      }else if(value===10){

      }else {
        var passworld = this.state.passworld
        if(passworld.length<6){
         passworld = passworld + value;
        }
        this.setState(()=>({
          passworld:passworld
        }),()=>{
          if(this.state.passworld.length>=6&&this.state.payStart===true){
            this.setState(()=>({
              payStart:false
            }),()=>{
              this.goPaymentOrder();
            })
            
          }
        })
      }
        
    }
    //封装键盘
    getkeyboard(){
      return (
        <View className={ this.state.keyType===1?"keyboard_botom1":"keyboard_botom"}>
          <View className="keyboard_title">
            <Image  mode="widthFix" className="fanhui" src={imager.fanhui}/>
          </View>
          <View className="keyboard_key">
            {
              this.state.keyboard.map((item,index)=>{
                return (
                  item.key===11
                  ?<View className="key_id" key={index} onClick={this.importPassworld.bind(this,item.key)}>
                    <Image  mode="widthFix" className="qingchu" src={imager.qingchu}/>
                  </View>
                  :item.key===10
                  ?<View className="key_id" key={index} onClick={this.importPassworld.bind(this,item.key)}></View>
                  :<View className="key_id" key={index} onClick={this.importPassworld.bind(this,item.key)}>{item.value}</View>
                )
              })
            }
            
          </View>
        </View>
      )
    }
    //关闭键盘
    closekey(){
      this.setState({
        payType:0,
        keyType:0,
        passworld:''
      })
    }
  render () {
    const config = require('./../../utils/config');
    return (
      <View className='components-page'>
          <Hearder titleText={this.state.header} background={this.state.background} goback={true} toback={this.getback}></Hearder>
          <View className="paymentOrder">
            <View className="nav">
              <View className="nav_tatle">支付金额</View>
              {/* 判断如果type是7（诊疗缴费）并且支付方式是就诊卡支付，那么用cardPrice的金额支付 */}
              {
                this.props.type===7
                ?(this.state.selectType===1
                  ?<View className="nav_price">￥{this.props.cardPrice}<Text className="cardPrice">￥{this.props.price}</Text></View>
                  : <View className="nav_price">￥{this.props.price}</View>)
                :<View className="nav_price">￥{this.props.price}</View>
              }
              {
                this.props.type!==6
                ?<View className="Countdown">
                    <View className="nav_Countdown">
                      <Text>请在</Text> 
                      <AtCountdown
                          format={{hours: '小时', minutes: '分钟', seconds: '秒' }}
                          seconds={this.state.timer}
                          onTimeUp={this.onTimeUp.bind(this)}
                        />
                      <Text>内完成支付，超时订单自动取消</Text>
                    </View>
                </View>
                :''
              }
              
            </View>
            <View className="content">
              {
                this.props.type!==6
                ?<View className="item" onClick={this.selectClick.bind(this,1)} >
                  <View className="Images">
                    <Image  mode="widthFix" className="imager" src={config.imgUrl+'0192455612490039b2f6172f6bc10fa9%402x.png'}/>
                  </View>
                  <View className="item_content">
                    <View className="card_txt">
                      <Text className="test1">一卡通支付</Text>
                      <Text>余额 {this.state.cardInfo.balance}元</Text>
                    </View>
                    <View className="card_txt1">
                      <Text className="test1">一卡通卡号</Text>
                      <Text>{this.state.cardInfo.cardNo}</Text>
                    </View>
                  </View>
                  {/* {
                      this.props.type===7?
                        <View className="item_content1">
                        （{this.props.cardPrice}）
                      </View>:''
                  } */}
                  <View className={this.state.selectType===1?"item_select":"select"}>
                    <Image  mode="widthFix" className="imager" src={config.imgUrl+'duihao%402x.png'}/>
                  </View>
                </View>
                :''
              }
              <View className="item" onClick={this.selectClick.bind(this,2)}>
                <View className="Images2">
                  <Image  mode="widthFix" className="imager" src={config.imgUrl+'573189520728e%402x.png'}/>
                </View>
                <View className="item_content">
                  <Text>微信支付</Text>
                </View>
                  {/* {
                      this.props.type===7?
                        <View className="item_content1">
                        （{this.props.price}）
                      </View>:''
                  } */}
                <View className={this.state.selectType===2?"item_select":"select"}>
                  <Image  mode="widthFix" className="imager" src={config.imgUrl+'duihao%402x.png'}/>
                </View>
              </View>
            </View>
            <View className="bottom">
              <View className="btn" onClick={this.clickPayselect.bind(this)}>
                立即支付
              </View>
            </View>
          </View>
          <View className={ this.state.payType===1?"payMentBlock payMent":"payMent"}>
            <View className={ this.state.keyType===1?"model1":"model"}>
              <View className="title">
                <View className="close" onClick={this.closekey.bind(this)}>
                  <Image  mode="widthFix" className="delate" src={imager.delate}/>
                </View>
                <View className="title_txt">
                  请输入支付密码
                </View>
              </View>
              <View className="nav_model">
                向宠物医疗平台支付
              </View>
              {/* 判断如果type是7（诊疗缴费）并且支付方式是就诊卡支付，那么用cardPrice的金额支付 */}
              {
                this.props.type===7
                ?(this.state.selectType===1
                  ?<View className="price">
                    ￥{this.props.cardPrice}
                  </View>
                  :<View className="price">
                    ￥{this.props.price}
                  </View>)
                :<View className="price">
                  ￥{this.props.price}
                </View>
              }
              
              <View className="model_bottom">
                <View className='payMethod'>
                  <Text className="method">支付方式</Text>
                  <Text className="payValue">一卡通</Text>
                </View>
              </View>
              <View className="passwold_box">
                <View className="clild_box">
                  <View className={this.state.passworld.length>=1?"box_value":""}></View>
                </View>
                <View className="clild_box">
                  <View className={this.state.passworld.length>=2?"box_value":""}></View>
                </View>
                <View className="clild_box">
                  <View className={this.state.passworld.length>=3?"box_value":""}></View>
                </View>
                <View className="clild_box">
                  <View className={this.state.passworld.length>=4?"box_value":""}></View>
                </View>
                <View className="clild_box">
                  <View className={this.state.passworld.length>=5?"box_value":""}></View>
                </View>
                <View className="clild_box">
                  <View className={this.state.passworld.length>=6?"box_value":""}></View>
                </View>
              </View>
            </View>
            {this.getkeyboard()}
          </View>
            
      </View>
    )
  }
}
const mapStateTopProps = (state)=>{
    return {
      //订单号
      orderNo:state.getIn(['paymentOrder','orderNo']),
      //订单类型
      type:state.getIn(['paymentOrder','type']),
      //价格
      price:state.getIn(['paymentOrder','price']),
      cardPrice:state.getIn(['paymentOrder','cardPrice']),
      cardNumber:state.getIn(["paymentOrder","cardNumber"])
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    return {
      daojis(that){
        var url = 'consult/querySurplusPayTime'
        var prams = {
          order_id:that.props.orderNo
        }
        http.postRequest(url,prams,
          function(res){
            that.setState({
              timer:res.data
            })
          },
          function(err){
            console.log(err)
          }
        )
      },
      requestSubscribeMessage(that){
        Taro.requestSubscribeMessage({
          tmplIds: ['I3rUYDQH038uNAhn_XQ0af5N1dMWmvSdVBWh-3Tf2UY'],
          success (res) {
            Taro.redirectTo({
              url: '/pages/paycheck/paycheck'　　 
            }) 
          }
        })
      },
      
      // 支付跳转
      //支付方法
    payOrder(res,that){
      Taro.requestPayment({
        timeStamp:res.data.timeStamp,
        nonceStr:res.data.nonceStr,
        signType:'MD5',
        package:res.data.package,
        paySign:res.data.paySign,
        success(res){
          Taro.showToast({
            title:'支付成功',
             icon:'none',
             duration:1000
          })
          that.props.requestSubscribeMessage(that);
          
        },
        fail(res){
          Taro.showToast({
            title:'支付失败',
                icon:'none',
                duration:1000
          })
        }
      })
    }
    }
  }
export default connect(mapStateTopProps,mapDispatchToProps)(PaymentOrder)
