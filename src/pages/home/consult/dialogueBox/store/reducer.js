import { chatList,inputValue,OrderNo,counts,OrderCode } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    //聊天记录
    chatList:[],
    //输入内容
    inputValue:'',
    // 订单号
    OrderNo:'',
    //剩余条数
    counts:0,
    OrderCode:'',
})
export default (state = defaState,action)=>{
    if(action.type===chatList){
        return state.set('chatList',action.value);
    }
    if(action.type===inputValue){
        return state.set('inputValue',action.value);
    }
    if(action.type===OrderNo){
        return state.set('OrderNo',action.value);
    }
    if(action.type===counts){
        return state.set('counts',action.value);
    }
    if(action.type===OrderCode){
        return state.set('OrderCode',action.value);
    }
    
    return state
}