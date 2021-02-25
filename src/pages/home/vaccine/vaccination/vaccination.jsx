import React, { Component,Fragment } from 'react'
import { View, Text,ScrollView,Image,Picker } from '@tarojs/components'
import './vaccination.scss'
import { AtList, AtListItem } from 'taro-ui';
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import selectDefaultCard from './../../../../commen/selectDefaultCard';
import http from './../../../../utils/http';
import * as actionCreators from './store/actionCreators';
import * as actionCreatorsPay from './../../../paymentOrder/store/actionCreators';
import * as cardListActionCreators from './../../../myCenter/cardAdmin/cardList/store/actionCreators';
import * as imager from './../assager';

class vaccination extends Component{
    constructor(props){
        super(props);
        this.state={
            header:"疫苗接种",
            date_time:'',
            price:0,
            vaccine_id:'',
            drug_name:'',
            cardOpened:false,
            submitStart:true
        }
    }
    getback(){
        Taro.switchTab({
            url: '/pages/index/home/index',
        });
        this.props.delateInfo(this)
    }
    //出生时间
    onDateChange (e){
        this.setState({
            date_time: e.detail.value
        })
    }
    componentDidMount(){
        this.props.delateInfo(this)
    }
    cardCHandleCancel(){
        this.setState({cardOpened:false});
    }
    cardChandleConfirm(){
        this.setState({cardOpened:false});
        this.props.selectCard()
    }
    //进入页面时判断是否需要授权
    componentDidShow () {
        if(wx.getStorageSync('token')==undefined||wx.getStorageSync('token')==''||wx.getStorageSync('token')==null||wx.getStorageSync('avatar')==undefined||wx.getStorageSync('avatar')==''||wx.getStorageSync('avatar')==null||wx.getStorageSync('nickname')==undefined||wx.getStorageSync('nickname')==''||wx.getStorageSync('nickname')==null){
            Taro.navigateTo({
                url: '/pages/impower/impower'　　
            })
            
        }else{
            var  petMapInfo =  this.props.petMapInfo.toJS();
            if(JSON.stringify(petMapInfo)==='{}'){
                this.props.getPetInfo(this);
            }
        }
    }
    render(){
        const style = {
            height:'calc(100% -  40px - 22.66667rpx - 166rpx - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        const config = require('./../../../../utils/config');
        const nationList = this.props.nationList.toJS();
        const vaccineList = this.props.vaccineList.toJS();
        const petMapInfo =  this.props.petMapInfo.toJS();
        return (
            <Fragment>
                {
                    this.state.cardOpened?
                    <View className="zhezhao">
                        <View className="module">
                            <View className="consstent">
                                请先新建一张就诊卡！
                            </View>
                            <View className="botdtom">
                                <View className="btn_mod" onClick={this.cardCHandleCancel.bind(this)}>取消</View> <View className="btn_mod"  onClick={this.cardChandleConfirm.bind(this)}>确定</View>
                            </View>
                        </View>
                    </View>:''
                }
                <Hearder titleText={this.state.header} background={true} goback={true} toback={this.getback.bind(this)}></Hearder>
                <ScrollView className="wrop" style={style}
                scrollY
                scrollWithAnimation
                scrollTop={0}>
                    <View className="user_info" onClick={this.props.selectCard.bind(this)}>
                        <View className="info_item">
                            <Text>一卡通卡号：</Text>
                            <Text>{petMapInfo.cardNo}</Text>
                        </View>
                        <View className="info_item">
                            <Text>宠&nbsp;物&nbsp;昵&nbsp;称：</Text>
                            <Text>{petMapInfo.petName}</Text>
                        </View>
                        <View className="info_item">
                            <Text>宠&nbsp;物&nbsp;种&nbsp;类：</Text>
                            <Text>{petMapInfo.petType}</Text>
                        </View>
                        <Image  mode="widthFix" className="youjian" src={imager.youjian}/>
                    </View>
                    <View className="select_info">
                        <View className="select_item">
                            <Text className="select_item_child">选择接种日期</Text>
                            {
                                this.state.date_time !==''?<Text className="select_item_child2">{this.state.date_time}</Text>:<Text className="select_item_child1">请选择</Text>
                            }
                            
                            <Image  mode="widthFix" className="select_youjian" src={imager.youjian}/>
                            <Picker mode='date' onChange={this.onDateChange.bind(this)} className="selectQi">
                                <AtList>
                                    <AtListItem extraText={this.state.date_time} />
                                </AtList>
                            </Picker>
                        </View>
                        <View className="select_item">
                            <Text className="select_item_child">选择宠物</Text>
                             {
                                    this.props.nationLable!==''?<Text className="select_item_child2">{this.props.nationLable}</Text>:<Text className="select_item_child1">请选择</Text>
                                }
                            <Image  mode="widthFix" className="select_youjian" src={imager.youjian}/>
                            <Picker mode='selector'  range={nationList} rangeKey={"lable"} onChange={this.props.onnationChange.bind(this)} className="selectQi">
                                <AtList>
                                    <AtListItem extraText={this.props.nationLable} />
                                </AtList>
                            </Picker>
                        </View>
                    </View>
                    <View className="vaccine_info">
                        <View className="vaccine_info_title">
                            选择疫苗
                        </View>
                        {
                            this.props.nation ===""?
                            <View className="vaccine_info_content">
                                请先选择宠物
                            </View>
                            :vaccineList.length<=0
                            ?<View className="vaccine_info_content">
                                暂无疫苗
                            </View>
                            :<View className="vaccine_info_itemList">
                                {
                                    vaccineList.map((item,index)=>{    
                                        return (
                                            <View className={item.start === 0?'vaccine_info_item':'vaccine_info_item vaccine_info_item1'} key={index} onClick={this.props.clickUpdatevaccineList.bind(this,item)}>{item.drug_name}</View>
                                        )
                                    })
                                }
                                
                            </View>
                        }
                        
                    </View>
                    {
                        this.props.nation === "b25c41f580d14c08a7b24ff83ce33f3c"
                        ?<View className="vaccine_introduce">
                            <View className="title_img">
                                <Image  mode="widthFix" className="title_img" src={config.imgUrl + "dogTit.jpg"}/>
                            </View>
                            <View className="title_img">
                                <Image  mode="widthFix" className="title_img" src={config.imgUrl + "dogbot.jpg"}/>
                            </View>
                        </View>
                        :this.props.nation==="ddae28e56b8049b9b874ccbbb8d09718"
                        ?<View className="vaccine_introduce">
                            <View className="title_img">
                                <Image  mode="widthFix" className="title_img" src={config.imgUrl + "catTop.jpg"}/>
                            </View>
                            <View className="title_img">
                                <Image  mode="widthFix" className="title_img" src={config.imgUrl + "catBot.jpg"}/>
                            </View>
                        </View>
                        :''
                    }
                        
                </ScrollView>
                {
                    this.props.nation ===""
                    ?<View className="bottom_btn bottom_btn1"></View>
                    :<View className="bottom_btn">
                        <View className="bottom_txt">
                            <Text>疫苗接种费用：</Text>
                            <Text>￥{this.state.price}</Text>
                        </View>
                        <View className="button_pay" onClick={this.props.setOrder.bind(this)}>
                            立即支付
                        </View>
                    </View>
                }
                
            </Fragment>
        )
    }
}
const mapStateTopProps=(state)=>{
    return {
        //宠物分类列表
        nationList:state.getIn(["vaccination","nationList"]),
        nationLable:state.getIn(["vaccination","nationLable"]),
        nation:state.getIn(["vaccination","nation"]),
        //疫苗列表
        vaccineList:state.getIn(["vaccination","vaccineList"]),
        petMapInfo:state.getIn(["vaccination","petMapInfo"])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        //分类
        onnationChange(e){
            this.setState({
                price:0,
                vaccine_id:'',
                drug_name:''
            })
            var list  = this.props.nationList.toJS();
            var nation =  list[e.detail.value].value;
            var nationLable = list[e.detail.value].lable;
            var actionNation= actionCreators.setNation(nation);
            var actionNatiomLable = actionCreators.setNationLable(nationLable);
            dispatch(actionNation);
            dispatch(actionNatiomLable);
            this.props.selectVaccinList(this,list[e.detail.value].value);
        },
        //点击选择疫苗
        clickUpdatevaccineList(item){
            var list = this.props.vaccineList.toJS();
            for(var i = 0; i<list.length; i++){
                list[i].start=0;
                if(list[i].vaccine_id===item.vaccine_id){
                    list[i].start=1;
                    this.setState({
                        price:item.price,
                        vaccine_id:item.vaccine_id,
                        drug_name:item.drug_name
                    })
                }
            }
            var action = actionCreators.setVaccineList(list);
            dispatch(action);
        },
         //查询就诊信息
        getPetInfo(that){
            var obj ={}
            selectDefaultCard.getCard(that).then(res=>{
                obj=res;
                var action = actionCreators.setPetMapInfo(obj);
                dispatch(action);
            })
        },
        //选择就诊卡
        selectCard(){
            var action = cardListActionCreators.setSelectStart(2);
            dispatch(action);
             Taro.navigateTo({
                 url: '/pages/myCenter/cardAdmin/cardList/cardList'　　 
             })
             
         },
         // 查询疫苗列表
        selectVaccinList(that,id){
             var url = 'queryVaccinesList';
             var prams = {
                classify_id:id
            }
            http.postRequest(url, prams,
              function (res) {
                if (res.errcode == 0) {
                    var list = res.data;
                    for(var i = 0;i<list.length;i++){
                        list[i].start=0
                    }
                  var action = actionCreators.setVaccineList(list);
                  dispatch(action)
                }
              },
              function (err) {
                console.log(err)
              }
            )
        },
        //下单校验
        setOrder(){
            if(this.state.submitStart===true){
                this.setState(()=>({
                    submitStart:false
                  }),()=>{
                    this.props.submitOrder(this)
                  })
                
            }
        },
        //提交订单
        submitOrder(that){
            var url = 'generateVaccinesOrder';
            const petMapInfo =  that.props.petMapInfo.toJS();
            var card_no = petMapInfo.cardNo;
            var pet_id = petMapInfo.id;
            var vaccine_id = that.state.vaccine_id;
            var drug_name = that.state.drug_name;
            var num = 1;
            var app_date = that.state.date_time;
            var price = that.state.price;
            if(vaccine_id===''){
                that.setState({
                    submitStart:true
                })
                Taro.showToast({
                    title:'请先选择疫苗',
                     icon:'none',
                     duration:1000
                })
                return
            }
            if(app_date===''){
                that.setState({
                    submitStart:true
                })
                Taro.showToast({
                    title:'请先选择日期',
                     icon:'none',
                     duration:1000
                })
                return
            }
             var prams = {
                card_no,
                pet_id,
                vaccine_id,
                num,
                app_date,
                drug_name
            }
            http.postRequest(url, prams,
              function (res) {
                if(res.errcode===0){
                    var orderNoaction = actionCreatorsPay.getorderNo(res.data);
                    var cardNoAction = actionCreatorsPay.getCardNumber(card_no);
                    var orderTypeaction =  actionCreatorsPay.getType(5);
                    var priceAction = actionCreatorsPay.getPrice(price);
                    dispatch(cardNoAction);
                    dispatch(orderNoaction);
                    dispatch(orderTypeaction);
                    dispatch(priceAction);
                    Taro.navigateTo({
                        url: '/pages/paymentOrder/paymentOrder'　　
                    })
                    
                    // that.props.getPetInfo(that);
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
              function (err) {
                setTimeout(() => {
                    that.setState({
                        submitStart:true
                    })
                }, 1000);
                console.log(err)
              }
            )
        },
        //清除信息
        delateInfo(){
            var action1 = actionCreators.setNation('');
            var action2 = actionCreators.setNationLable('');
            var action3 = actionCreators.setVaccineList([]);
            dispatch(action1);
            dispatch(action2);
            dispatch(action3);
        }
    }
}
export default connect(mapStateTopProps,mapDispatchToProps)(vaccination);