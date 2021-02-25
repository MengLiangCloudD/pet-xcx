import { MysiteList,doORlook } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    //地址列表
    MysiteList:[],
    //是选择地址或者是查看地址
    doORlook:0
})
export default (state = defaState,action)=>{
    if(action.type===MysiteList){
        return state.set('MysiteList',action.value);
    }
    if(action.type===doORlook){
        return state.set('doORlook',action.value);
    }
    return state
}