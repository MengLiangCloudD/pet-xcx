import { orderList } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    orderList:[]
})
export default (state = defaState,action)=>{
    if(action.type===orderList){
        return state.set('orderList',action.value);
    }
    return state
}