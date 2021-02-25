import { regOrderList } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    regOrderList:[]
})
export default (state = defaState,action)=>{
    if(action.type===regOrderList){
        return state.set('regOrderList',action.value);
    }
    return state
}