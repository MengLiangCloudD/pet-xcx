import React, { Component,Fragment } from 'react'
import { View, Text,ScrollView,Image,Input,Picker  } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
import './petType.scss'
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import http from './../../../../utils/http';
import * as actionCreators from './store/actionCreators';
import * as imager from './../assager'
class PetType extends Component{
    constructor(props){
        super(props);
        this.state = {
            header:"宠物分类选择"
        }
    }
    render(){
        return (
            <Fragment>
                <View className="title">
                    <Hearder titleText={this.state.header} goback={true} background={true} toback={this.getback}></Hearder>
                    <View className="search">
                        <View className="search_img">
                            <Image  mode="widthFix" className="sousuo" src={imager.sousuo}/>
                        </View>
                            <Input type='text' className="inputValue" placeholder='请输入狗狗/猫咪种类'/>
                    </View>
                    <View className="nav">
                        
                    </View>
                </View>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {

    }
}
const mapDispatchToProps=(dispatch)=>{
    return {

    }
}
export default connect(mapStateTopProps,mapDispatchToProps)(PetType)