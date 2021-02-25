import { consultOrderList } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    consultOrderList:[]
})
export default (state = defaState,action)=>{
    //订单编号
    if(action.type===consultOrderList){
        return state.set('consultOrderList',action.value);
    }
    return state
}