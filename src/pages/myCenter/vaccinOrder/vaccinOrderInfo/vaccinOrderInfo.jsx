import React,{ Component,Fragment } from 'react';
import './vaccinOrderInfo.scss';
import { View, Text,Image } from '@tarojs/components';
import Hearder from './../../../../commen/header/header';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import http from './../../../../utils/http';
class VaccinOrderInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            header:"疫苗订单详情",
            QRcodeImg:''
        }
    }
    getback(){
        Taro.navigateBack({
            delta: 1
        })
    }
    componentDidMount(){
        this.selectQRcode(this)
    }
    //查询二维码
    selectQRcode(that){
        var url = 'queryQrCode';
        var prams = {
            order_id:that.props.vaccinOrder_id
        }
        http.postRequest(url, prams,
            function (res) {
                if (res.errcode == 0) {
                    that.setState({
                        QRcodeImg:res.data
                    })
                }
            },
            function (err) {
                console.log(err)
            }
        )
        
    }
    render(){
        return (
            <Fragment>
                <View className="title">
                    <Hearder titleText={this.state.header} goback={true} background={true} toback={this.getback}></Hearder>
                </View>
                <View className="content">
                    <View className="content_img">
                        <Image  mode="widthFix" className="imager" src={this.state.QRcodeImg}/>
                    </View>
                    <View className="img_txt">请届时到医院出示二维码给导诊台</View>
                </View>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        vaccinOrder_id:state.getIn(["vaccinOrderInfo","vaccinOrder_id"])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        
    }
}
export default connect(mapStateTopProps,mapDispatchToProps)(VaccinOrderInfo)