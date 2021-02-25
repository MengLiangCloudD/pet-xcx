
import React, { Component, Fragment } from 'react'
import { View,Text,Image } from '@tarojs/components'
import './selactCard.scss'
import {connect} from 'react-redux';
import http from './../../utils/http';
class SelectCard extends Component {
    constructor(props){
        super(props);
        this.state={
            cardlist:[],
            cardinfo:{},
            zheStart:false
        }
    }
    componentDidMount(){
        const { cardList,thats,selectCard } = this.props;
        this.setState({
            cardlist:cardList,
            cardinfo:cardList[0]
        })
        selectCard(cardList[0].card_no,thats);
    }
    
    // getSelectCard(){
    //     const { cardList,thats } = this.props;
    //     var that =  this;
    //     var url = 'card/queryCardsList';
    //     var prams= {

    //     }
    //     http.postRequest(url,prams,
    //         function(res){
    //             if(res.errcode===0){
    //                 that.setState({
    //                     cardlist:res.data,
    //                     cardinfo:res.data[0]
    //                 })
    //                 selectCard(res.data[0].card_no,thats);
    //             }
    //         },
    //         function(err){

    //         }
    //     )
    // }
    //选择就诊卡
    selectCard(item){
        const { selectCard,thats } = this.props;
        this.setState(()=>({
            cardinfo:item,
            zheStart:false
        }),()=>{
            selectCard(this.state.cardinfo.card_no,thats)
        })
    }
    //打开遮罩层
    openZhe(){
        this.setState({
            zheStart:true
        })
    }
    //关闭遮罩层
    closeZhe(){
        this.setState({
            zheStart:false
        })
    }
    render(){
        const zheStlay = {
            height:'calc(100% -  40px - ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')',
            top:'calc(40px  + ' + (wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px') + ')'
        }
        return (
            <Fragment>
                   <View className="nav_card">
                    <View className="nav_text" onClick={this.openZhe.bind(this)}>
                            <Text>一卡通卡号：</Text>
                            <Text>{this.state.cardinfo.card_no}</Text>   
                        </View> 
                    </View> 
                
                {
                    this.state.zheStart
                    ?<View className="zhezhaos" style={zheStlay} onClick={this.closeZhe.bind(this)}>
                        <View className="select_addtype">
                            <Text>一卡通卡号：</Text>
                            <Text>{this.state.cardinfo.card_no}</Text>   
                        </View>
                        {
                            this.state.cardlist.map((item,index)=>{
                                return (
                                    <View className={item.card_no===this.state.cardinfo.card_no?"addtype addtype1":"addtype"} key={index} onClick={this.selectCard.bind(this,item)}>
                                        <Text>一卡通卡号：</Text>
                                        <Text>{item.card_no}</Text>   
                                    </View>
                                )
                            })
                        }
                    </View>
                    :''
                }

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
  export default connect(mapStateTopProps,mapDispatchToProps)(SelectCard)