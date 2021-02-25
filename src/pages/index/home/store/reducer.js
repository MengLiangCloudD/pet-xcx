import {shoopList } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    header:'首页',
    //商品列表
    shoopList:[]
})
export default (state = defaState,action)=>{
    if(action.type===shoopList){
        return state.set('shoopList',action.value);
    }
    return state
}