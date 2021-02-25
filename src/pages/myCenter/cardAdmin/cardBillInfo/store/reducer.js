import { BillInfoList } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    BillInfoList:[]
})
export default (state = defaState,action)=>{
    if(action.type===BillInfoList){
        return state.set('BillInfoList',action.value);
    }
    return state
}