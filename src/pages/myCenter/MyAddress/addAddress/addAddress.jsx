import React, { Component } from 'react'
import { View, Text, Input,Image,Textarea } from '@tarojs/components'
import './addAddress.scss'
import Hearder from './../../../../commen/header/header';
import { connect } from 'react-redux';
import Taro from '@tarojs/taro';
import http from './../../../../utils/http';
import * as imager from './../assager';
import * as actionCreators from './store/actionCreators';
class AddAddress extends Component{
    constructor(props){
        super(props);
        this.state={
            header:'添加收货地址',
            //是否有选中地址
            ifselect:false,
            // 选中的省
            province:{},
            //选中的市
            city:{},
            //选中的区
            district:{},
            //收货人姓名
            userName:'',
            //手机号
            phoneNumber:'',
            // 详细地址
            detailed:'',
            rank:0,
            model:false,
            //是否设为默认
            isDefault:0,
            //修改地址的id
            addressId:''
        }
    }
    //返回上一层
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    componentDidMount() {
        if(this.props.addORupdate===0){
            this.props.getSiteList(this,0);
        }else if(this.props.addORupdate===1){
            var {updateSite} =  this.props;
            var obj = updateSite.toJS();
            var userName = obj.recipient;
            var phoneNumber = obj.mobile;
            var detailed = obj.address;
            var province = {
                name:obj.province,
                areaid:obj.provinceId
            }
            var city ={
                name:obj.city,
                areaid:obj.cityId
            }
            var district ={
                name:obj.name,
                areaid:obj.districtId
            }
            var header = '修改收货地址'
            var addressId = obj.addressId;
            var isDefault = obj.isDefault;
            this.setState({
                userName,
                phoneNumber,
                detailed,
                province,
                city,
                district,
                rank:2,
                ifselect:true,
                header,
                addressId,
                isDefault
            })
            this.props.getSiteList(this,obj.cityId);
        }
    }
    //地址列表
    getSiteValue(that){
        var {siteList} = this.props;
        var list = siteList.toJS();
        return (
            list.map((item,index)=>{
                return (
                    <View className="select_city_item" key={index} onClick={this.props.clickSite.bind(that,item)}>
                        {
                            item.value===1?<Image mode="widthFix" className="duihao" src={imager.duihao} />:''
                        }
                        {item.name}
                    </View>
                )
            })
        )
    }
    //弹出层
    clickRegions(){
        this.setState({
            model:true
        })
    }
    //弹出层
    delateClick(){
        this.setState({
            model:false
        })
    }
    //选择默认
    updateIsDefault(){
        var isDefault
        if(this.state.isDefault===0){
            isDefault=1
        }else if(this.state.isDefault===1){
            isDefault=0
        }
        this.setState({
            isDefault:isDefault
        })
    }
    //输入框内容
    inputValue(type,e){
        if(type===0){
            this.setState({
                userName:e.target.value
            })
        }
        if(type===1){
            this.setState({
                phoneNumber:e.target.value
            })
        }
        if(type===2){
            this.setState({
                detailed:e.target.value
            })
        }
    }
    //提交添加
    subButten(){
        if(this.state.userName==''||this.state.phoneNumber==''||this.state.province.areaid==undefined||this.state.city.areaid==undefined||this.state.district.areaid==undefined||this.state.detailed==''){
            Taro.showToast({
                title:'请将信息填写完整',
                icon:'none',
                duration:1000
            })
        }else{
            var recipient = this.state.userName;
            var mobile = this.state.phoneNumber;
            var provinceId=this.state.province.areaid;
            var cityId=this.state.city.areaid;
            var districtId=this.state.district.areaid;
            
            var isDefault = this.state.isDefault;
            if(this.props.addORupdate===0){
                var address = this.state.district.fullName + this.state.detailed; 
                var url = 'address/add';
                var prams = {
                    recipient,
                    mobile,
                    provinceId,
                    cityId,
                    districtId,
                    address,
                    isDefault
                }
            }else if(this.props.addORupdate===1){
                var address = this.state.detailed; 
                var url = 'address/update';
                var addressId = this.state.addressId;
                var prams = {
                    recipient,
                    mobile,
                    provinceId,
                    cityId,
                    districtId,
                    address,
                    isDefault,
                    addressId
                }
            }
            http.postRequest(url, prams,
                function (res) {
                    if (res.errcode == 0) {
                        Taro.showToast({
                            title:res.errmsg,
                             icon:'none',
                             duration:1000
                        })
                        Taro.navigateBack({
                            delta: 1
                        })
                    }
                },
                function (err) {
                    Taro.showToast({
                        title:err.errmsg,
                         icon:'none',
                         duration:1000
                    })
                    console.log(err)
                }
            )
        }
            
    }
    //删除地址
    delateButten(){
        var url =  'address/delete';
        var prams = {
            addressId:this.state.addressId
        }
        http.postRequest(url, prams,
            function (res) {
                if (res.errcode == 0) {
                    Taro.showToast({
                        title:'删除成功',
                         icon:'none',
                         duration:1000
                    })
                    Taro.navigateTo({
                        url: '/pages/myCenter/MyAddress/addressList/addressList',
                    });
                      
                }
            },
            function (err) {
                console.log(err)
            }
        )
    
    }
    render(){
        var style = {
            height:'calc(100% -  40px - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        var {tagsCity} = this.props;
        var list = tagsCity.toJS()
        return (
            <View className="components-page" >
                <Hearder titleText={this.state.header}  goback={true} background={true} toback={this.getback}></Hearder>
                <View className="content" style={style}>
                    <View className="item_content">
                        <View className="userName">
                            <View className="biaoti">收货人：</View>
                            <View className="neirong">
                                <Input className="inpVlue" type='text' value={this.state.userName} placeholder='' focus = {false} onInput={this.inputValue.bind(this,0)}/> 
                            </View>
                        </View>
                        <View className="phone_number">
                            <View className="biaoti">手机号码：</View>
                            <View className="neirong">
                                <Input className="inpVlue" type='number' value={this.state.phoneNumber} placeholder='' focus = {false} onInput={this.inputValue.bind(this,1)}/> 
                            </View>
                        </View>
                        <View className="regions" onClick={this.clickRegions.bind(this)}>
                            <View className="biaoti">所在地区：</View>
                            <View className="neirong">
                                <Text className="regions_text">{this.state.province.name}</Text>
                                <Text className="regions_text">{this.state.city.name}</Text>
                                <Text className="regions_text">{this.state.district.name}</Text>
                            </View>
                            <View className="icno">
                                <Image mode="widthFix" className="huiYou" src={imager.huiYou} />
                            </View>
                        </View>
                        <View className="site_info">
                            <Textarea className="site_value" autoHeight value={this.state.detailed} placeholder='详细地址：如道路、小区、楼栋号、单元室等。' onInput={this.inputValue.bind(this,2)}/>
                        </View>
                    </View>
                    <View className="operation">
                        <View className="operation_text">
                            设为默认地址
                        </View>
                        <View className="select" onClick={this.updateIsDefault.bind(this)}>
                            {
                                this.state.isDefault===1?<View className="select_value"></View>:''
                            }
                        </View>
                    </View>
                    <View className="bottom">
                        <View className="addbtn" onClick={this.subButten.bind(this)}>
                           {
                               this.props.addORupdate===0?'保存':'修改'
                           } 
                        </View>
                        {
                            this.props.addORupdate===1
                            ?<View className="dlateBtn" onClick={this.delateButten.bind(this)}>
                                删除
                            </View>
                            :""
                        }
                    </View>
                </View>
                 {/* 弹出层 */}
                <View className={this.state.model?"modelBox1":"modelBox"}>
                     <View className="modalBox_title">
                         请选择
                        <View className="img_delate" onClick={this.delateClick.bind(this)}>
                            <Image mode="widthFix" className="delate" src={imager.delate} />
                        </View>
                     </View>
                     <View className="modalBox_content">
                         {
                             //判断是否选中地址显示不同界面
                            !this.state.ifselect
                            ?<View className="content_nav">
                                <View className="nav_title">
                                    热门城市
                                </View>
                                <View className="nav_content">
                                    {
                                        list.map((item,index)=>{
                                            return (
                                                <View className="nav_item" key={index} onClick={this.props.clickSite.bind(this,item)}>
                                                    {item.name}
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                            :<View className="progress">
                                <View className="progress_nav">
                                    <View className="number_one"></View>
                                    <View className="xian"></View>
                                    <View className={this.state.rank>=1&&this.state.city.name!=undefined?"number_one":"numbe"}></View>
                                    <View className="xian"></View>
                                    <View className={this.state.rank>=2&&this.state.district.name!=undefined?"number_one":"numbe"}></View>
                                </View>
                                <View className="progress_item">
                                    <View className="one_text one_text1" onClick={this.props.clickRollback.bind(this,0,{areaid:0})}>{this.state.province.name}</View>
                                    {
                                        this.state.rank>=1&&this.state.city.name!=undefined
                                        ?<View className="one_text one_text2" onClick={this.props.clickRollback.bind(this,1,this.state.province)}>{this.state.city.name}</View>
                                        :<View className="one_text one_text2 tixer">请选择市</View>
                                    }
                                    {
                                        this.state.rank>=2&&this.state.district.name!=undefined
                                        ?<View className="one_text one_text3" onClick={this.props.clickRollback.bind(this,2,this.state.city)}>{this.state.district.name}</View>
                                        :this.state.rank<=1
                                        ?<View className="one_text one_text3"></View>
                                        :<View className="one_text one_text3 tixer">请选择县</View>
                                    }
                                </View>
                            </View>
                         }
                         <View className={!this.state.ifselect?"select_city":"select_city1"}>
                             <View className={!this.state.ifselect?"select_city_title":"select_city_title1"}>
                                 {
                                    this.state.rank===0
                                    ?<Text>选择省份/地区</Text>
                                    :this.state.rank===1
                                    ?<Text>选择市</Text>
                                    :<Text>选择区/县</Text>
                                 }
                             </View>
                             <View className="select_city_content">
                                { this.getSiteValue(this)}
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
        //地址列表
        siteList:state.getIn(['addAddress', 'siteList']),
        //热门城市
        tagsCity:state.getIn(['addAddress', 'tagsCity']),
        //添加还是修改
        addORupdate:state.getIn(['addAddress', 'addORupdate']),
        //修改的地址
        updateSite:state.getIn(['addAddress', 'updateSite'])
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {
        //获取地址列表
        getSiteList(that,areaid){
            var url = 'area/list';
            var prams = {
                parentId:areaid
            }
            http.postRequest(url, prams,
                function (res) {
                    if (res.errcode == 0) {
                        var list = res.data;
                        for(var i = 0; i<list.length; i++){
                            list[i].value = 0;
                            if(that.state.rank===0){
                                if(list[i].areaid===that.state.province.areaid){
                                    list[i].value=1
                                }
                            }
                            if(that.state.rank===1){
                                if(list[i].areaid===that.state.city.areaid){
                                    list[i].value=1
                                }
                            }
                            if(that.state.rank===2){
                                if(list[i].areaid===that.state.district.areaid){
                                    list[i].value=1
                                }
                            }
                        }
                        var action = actionCreators.setSiteList(list);
                        dispatch(action)
                    }

                },
                function (err) {
                    console.log(err)
                }
            )
        },
        //点击地址
        clickSite(item){
            var {siteList,getSiteList} = this.props;
            var list = siteList.toJS();
            for(var i = 0; i<list.length; i++){
                list[i].value=0;
                if(list[i].areaid===item.areaid){
                    list[i].value=1;
                }
            }
            var action = actionCreators.setSiteList(list);
            dispatch(action);
            if(this.state.rank<2){
                //查看下级列表
                getSiteList(this,item.areaid);
            }
            //点击选择地址改变数据
            if( this.state.rank===0){
                //点击省时
                var rank = this.state.rank + 1;
                var ifselect = true;
                this.setState(() => ({
                    ifselect: ifselect,
                    province:item,
                    rank:rank
                }), () => {
    
                })
            }else if(this.state.rank===1){
                // 选择市时
                var rank = this.state.rank + 1;
                var ifselect = true;
                this.setState(() => ({
                    ifselect: ifselect,
                    city:item,
                    rank:rank
                }), () => {
    
                })
            }else if(this.state.rank===2){
                //选择区
                var ifselect = true;
                this.setState(() => ({
                    ifselect: ifselect,
                    district:item,
                    model:false
                }), () => {
    
                })
            }
        },
        //点击回退
        clickRollback(rank,item){
            var {getSiteList} = this.props;
            getSiteList(this,item.areaid);
            if(rank==0){
                var city = {}
                var district = {};
            }
            if(rank==1){
                var city = this.state.city
                var district = {};
            }
            if(rank==2){
                var city = this.state.city
                var district = this.state.district
            }
            this.setState(() => ({
                rank:rank,
                district:district,
                city:city
            }), () => {

            })
            
        }
    }
}
export default connect(mapStateTopProps, mapDispatchToProps)(AddAddress)