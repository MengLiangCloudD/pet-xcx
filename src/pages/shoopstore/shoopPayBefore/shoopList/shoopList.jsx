import React, { Component } from 'react'
import { View, Text, Image,ScrollView,Input  } from '@tarojs/components'
import './shoopList.scss'
import Hearder from '../../../../commen/header/header';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import Taro from '@tarojs/taro'
import * as imager from './../../assager';
import http from './../../../../utils/http';
class ShoopList extends Component{
    constructor(props) {
        super(props)
        this.state = {
            header:'商品列表',
            pageSize:10,
            pageNum:1,
            stsop:0,
            allYear:0,
            navNumber:0,
            //全部分类
            proOfficial:0,
            proOfficialName:'全部分类',
            //品种
            proCommodity:0,
            proCommodityName:'品种',
            //品牌
            proPetStuff:0,
            proPetStuffName:'品牌',
            shoopValue:'',
            butRo:false
        }
    }
  componentWillMount() { 
      this.setState({
        shoopValue:this.props.shoopValue
      })
    this.props.getTypelist(this)
  }
  componentDidMount() { 
      
  }

  componentWillUnmount() {
      
    
   }
  //进入页面时判断是否需要授权
  componentDidShow() {
    if (wx.getStorageSync('token') == undefined || wx.getStorageSync('token') == '' || wx.getStorageSync('token') == null || wx.getStorageSync('avatar') == undefined || wx.getStorageSync('avatar') == '' || wx.getStorageSync('avatar') == null || wx.getStorageSync('nickname') == undefined || wx.getStorageSync('nickname') == '' || wx.getStorageSync('nickname') == null) {
      Taro.navigateTo({
        url: '/pages/impower/impower'
      })
    } else {

    }
  }
  componentDidHide() { 
    
  }
  getback(){
    Taro.switchTab({
        url: '/pages/index/shoop/shoopstore'　　
    })
  }
  //上划加载
  onScrolltoupper(e){
      var pageNum = this.state.pageNum;
      pageNum+=1
      if(pageNum < this.state.allYear){
        this.setState(()=>({
            pageNum:pageNum
          }),()=>{
            this.props.getShoopList(this,0)
          })
        
      }else{

      }
    
  }
  
  //封装导航
  getNav(that){
      if(that.state.navNumber===0){
          return ''
      }
      var List =that.props.typeList
      var typeList
      if(that.state.navNumber===1){
        typeList = List.toJS().a;
        return (
            typeList.map((item, index) => {
                if(item.type===that.state.proOfficial){
                    return (
                        <View className="type type1" key={index}>
                            <Text>{item.typeName}</Text>
                            <Image className="dui_img" src={imager.duihao}/>
                        </View>
                    )
                }else{
                    return (
                        <View className="type" key={index} onClick={that.props.selectList.bind(that,item,1)}>
                            <Text>{item.typeName}</Text>
                        </View>
                    )
                }
                
            })
        )
      }
      if(that.state.navNumber===2){
        typeList = List.toJS().b;
        return (
            typeList.map((item, index) => {
                if(item.type===that.state.proCommodity){
                    return (
                        <View className="type type1" key={index}>
                            <Text>{item.typeName}</Text>
                            <Image className="dui_img" src={imager.duihao}/>
                        </View>
                    )
                }else{
                    return (
                        <View className="type" key={index} onClick={that.props.selectList.bind(that,item,2)}>
                            <Text>{item.typeName}</Text>
                        </View>
                    )
                }
                
            })
        )
      }
      if(that.state.navNumber===3){
        typeList = List.toJS().c;
        return (
            typeList.map((item, index) => {
                if(item.type===that.state.proPetStuff){
                    return (
                        <View className="type type1" key={index}>
                            <Text>{item.typeName}</Text>
                            <Image className="dui_img" src={imager.duihao}/>
                        </View>
                    )
                }else{
                    return (
                        <View className="type" key={index} onClick={that.props.selectList.bind(that,item,3)}>
                            <Text>{item.typeName}</Text>
                        </View>
                    )
                }
                
            })
        )
      }
  }
  //选择
  selectType(type){
      var navNumber = this.state.navNumber;
      if(type===1){
        if(navNumber===1){
            this.setState(()=>({
                navNumber:0
              }),()=>{
    
              })
          }else{
            this.setState(()=>({
                navNumber:1
              }),()=>{
    
              })
          }
      }
      if(type===2){
        if(navNumber===2){
            this.setState(()=>({
                navNumber:0
              }),()=>{
    
              })
          }else{
            this.setState(()=>({
                navNumber:2
              }),()=>{
    
              })
          }
      }
      if(type===3){
        if(navNumber===3){
            this.setState(()=>({
                navNumber:0
              }),()=>{
    
              })
          }else{
            this.setState(()=>({
                navNumber:3
              }),()=>{
    
              })
          }
      }
  }
  //点击进入购物车
  goCatShoop(){
    Taro.navigateTo({
        url: '/pages/shoopstore/shoopPayBefore/shoppingCart/shoppingCart'
    })
  }
  getshoopValue(e){
    var shoopValue = e.target.value;
    var butRo;
    if(shoopValue.length>0){
        butRo=true
    }else{
        butRo=false
    }
    this.setState({
        shoopValue:shoopValue,
        butRo:butRo
    })
    
  }
  render(){
      const { shoopListInfo,goShoopINfo}  = this.props
      const shoopLists = shoopListInfo.toJS();
      var style = {
        height:'calc(100% -  70px - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
      }
      return (
        <View className='components-page'>
            <View className="title">
                <View className={this.state.navNumber!==0?"zhe":""}></View>
                <Hearder titleText={this.state.header} goback={true} toback={this.getback} background={true}></Hearder>
                <View className="nav">
                    <View className="selectShoop Allshoop" onClick={this.selectType.bind(this,1)}>
                        <Text className={this.state.navNumber===1||this.state.proOfficial!=0?"text1":"text"}>{this.state.proOfficialName}</Text>
                        <Image  mode="widthFix" className="imager" src={this.state.navNumber===1?imager.shang:imager.xia}/>
                    </View>
                    <View className="type_list" >
                        {
                            this.getNav(this)
                        }
                    </View>
                    <View className="selectShoop selectShoop2"  onClick={this.selectType.bind(this,2)}>
                        <Text className={this.state.navNumber===2||this.state.proCommodity!=0?"text1":"text"}>{this.state.proCommodityName}</Text>
                        <Image  mode="widthFix" className="imager" src={this.state.navNumber===2?imager.shang:imager.xia}/>
                    </View>
                    <View className="selectShoop selectShoop1"  onClick={this.selectType.bind(this,3)}>
                        <Text className={this.state.navNumber===3||this.state.proPetStuff!=0?"text1":"text"}>{this.state.proPetStuffName}</Text>
                        <Image  mode="widthFix" className="imager" src={this.state.navNumber===3?imager.shang:imager.xia}/>
                    </View>
                </View>
                <View className="search">
                    <View className="search_img">
                    <Image  mode="widthFix" className="sousuo" src={imager.sousuo}/>
                    </View>
                    <Input type='text' onInput={this.getshoopValue.bind(this)} className="inputValue" value={this.state.shoopValue} placeholder='搜索商品...'/>
                    {
                    this.state.butRo?<View className="btn_sou" onClick={this.props.searchShoopList.bind(this)}>搜索</View>:''
                    }
                    
                </View>
            </View>
            <View className="contents" >
            <ScrollView className='content'
            scrollY
            scrollWithAnimation
            scrollTop={this.state.stsop}
            style={style}
            lowerThreshold="100"
            onScrolltolower ={this.onScrolltoupper.bind(this)}>
                <View className="shoopList" >
                    {
                        shoopLists.map((item, index) => {
                            return (
                                <View className="shoop_item"  key={index} onClick={goShoopINfo.bind(this,item)}>
                                    <View className="shoopImg">
                                        <Image  mode="widthFix" className="shoop_imgzhu" src={item.proMianPhoto}/>
                                    </View>
                                    <View className="shoopInfo">
                                        <View className="shoop_name">{item.drugName}</View>
                                        <View className="shoop_pinc">内外同区&nbsp;&nbsp;每日一粒&nbsp;&nbsp;法国进口</View>
                                        <View className="shoop_shiyong">7 ~ 15kg犬可用</View>
                                        <View className="shoop_price"><Text className="shishou">￥{item.proPlatform}</Text><Text className="yaunjia">￥{item.proPrice}</Text></View>
                                        <View className="xiaoliang"></View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
                </ScrollView>
            </View>
            <View className="gouwuche" onClick={this.goCatShoop.bind(this)}>
                <Image  mode="widthFix" className="wuche" src={imager.gouwuche}/>
            </View>
        </View>
      )
  }
}
const mapStateTopProps = (state) => {
  return {
    //商品列表
    shoopListInfo:state.getIn(['shoopList','shoopListInfo']),
    //类型列表
    typeList:state.getIn(['shoopList','typeList']),
    //类型id
    proOfficial:state.getIn(['shoopList','proOfficial']),
    shoopValue:state.getIn(['shoopList','shoopValue']),
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
        //查询商品列表
        getShoopList(that,type){
            var pageNum = that.state.pageNum;
            var pageSize = that.state.pageSize;
            var proOfficial = that.state.proOfficial;
            //数据翻了
            var proCommodity = that.state.proPetStuff;
            var proPetStuff = that.state.proCommodity;
            var drugName= that.props.shoopValue;
            var url = 'product/listWx';
            var prams = {
                pageSize,
                pageNum,
                proOfficial,
                proCommodity,
                proPetStuff,
                drugName
            }
            http.postRequest(url,prams,
                function(res){
                    console.log(res)
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
                        if(type===0){
                            var list = res.data.list;
                            var shoopListInfo = that.props.shoopListInfo.toJS();
                            for (var i = 0; i < list.length; i++) {
                                shoopListInfo.push(list[i]);
                            }
                        }else{
                            var shoopListInfo = res.data.list;
                        }
                        var shoopAction = actionCreators.setShoopList(shoopListInfo)
                        dispatch(shoopAction);
                    }
                },
                function(err){
                    console.log(err)
                }
            )
        },
        //查询类型列表
        getTypelist(that){
            var url = 'goodstype/list';
            var prams = {
                        
            }
            http.postRequest(url,prams,
                function(res){
                    console.log(res)
                    if(res.errcode===0){
                        var proOfficial='';
                        var proOfficialName=''
                        var obj = {type: 0, typeName: "全部分类"};
                        res.data.a.unshift(obj)
                        var obj1 = {type: 0, typeName: "品种"};
                        res.data.b.unshift(obj1);
                        var obj2 = {type: 0, typeName: "品牌"};
                        res.data.c.unshift(obj2);
                        proOfficial=res.data.a[0].type;
                        proOfficialName=res.data.a[0].typeName;
                        for(var i = 0;i<res.data.a.length;i++){
                            if(that.props.proOfficial===res.data.a[i].type){
                                proOfficial=res.data.a[i].type;
                                proOfficialName=res.data.a[i].typeName;
                            }
                        }
                        var offset = 1;
                        that.setState(() => ({
                            offset: offset,
                            proOfficialName:proOfficialName,
                            proOfficial:proOfficial,
                            proCommodity:res.data.b[0].type,
                            proPetStuff:res.data.c[0].type
                        }), () => {
                            that.props.getShoopList(that,proOfficial);
                        })
                        var typeAction = actionCreators.setTypeList(res.data)
                        dispatch(typeAction);
                    }
                },
                function(err){
                    console.log(err)
                }
            )
        },
        //点击进入详情页
        goShoopINfo(item){
            var action =  actionCreators.setProductId(item.productId)
            dispatch(action)
            Taro.navigateTo({
                url: '/pages/shoopstore/shoopPayBefore/shoopInfo/shoopInfo'
            })
           
        },
        //搜索
        searchShoopList(){
            var action = actionCreators.setShoopValue(this.state.shoopValue);
            dispatch(action);
            var actions = actionCreators.setProOfficial('');
                dispatch(actions);
            var shoopListInfo = actionCreators.setShoopList([]);
                dispatch(shoopListInfo);
                this.setState(()=>({
                     //全部分类
                    proOfficial:0,
                    proOfficialName:'全部分类',
                    //品种
                    proCommodity:0,
                    proCommodityName:'品种',
                    //品牌
                    proPetStuff:0,
                    proPetStuffName:'品牌',
                  }),()=>{
                    this.props.getShoopList(this)
                  })
            
        },
        //选择类型
        selectList(item,type){
            var action = actionCreators.setShoopValue('');
            dispatch(action);
            if(type===1){
                this.setState(()=>({
                    proOfficial:item.type,
                    navNumber:0,
                    proOfficialName:item.typeName,
                    shoopValue:''
                }),()=>{
                    this.props.getShoopList(this);
                })
            }
            if(type===2){
                this.setState(()=>({
                    proCommodity:item.type,
                    navNumber:0,
                    proCommodityName:item.typeName,
                    shoopValue:''
                }),()=>{
                    this.props.getShoopList(this);
                })
            }
            if(type===3){
                this.setState(()=>({
                    proPetStuff:item.type,
                    navNumber:0,
                    proPetStuffName:item.typeName,
                    shoopValue:''
                }),()=>{
                    this.props.getShoopList(this);
                })
            }
        }
    }
}
export default connect(mapStateTopProps, mapDispatchToProps)(ShoopList)