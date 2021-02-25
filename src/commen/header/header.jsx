
import React, { Component } from 'react'
import { View,Text,Image } from '@tarojs/components'
import './header.scss'
import {connect} from 'react-redux';
class Navbar extends Component {
  //构造函数第一个执行
  constructor(props){
      super(props);
      this.getback = this.getback.bind(this);
  }
  componentDidMount(){
    
  }
  //子组件与父组件通信 子组件要调用父组件传递过来的方法
  getback(){
    const { toback } = this.props;
    toback()
  }
  render () {
      var style= {
          paddingTop:  wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px',
       }
       var style2= {
        top:  wx.getMenuButtonBoundingClientRect().top+ wx.getMenuButtonBoundingClientRect().height / 2 - 10 + 'px',
     }
     const config = require('./../../utils/config');
    return (
      <View className='components-page'>
        <View className={this.props.background?"nav-wrap nav-wrap12":"nav-wrap"} style={style}>
          <Text>{this.props.titleText}</Text>
          <View className={this.props.goback?"nav-icon":"icon"} style={style2} onClick={this.getback}>
            <Image  mode="widthFix" className="imager" src={config.imgUrl+'fanhui%402x-1.png'}/>
          </View>
        </View>
      </View>
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
export default connect(mapStateTopProps,mapDispatchToProps)(Navbar)