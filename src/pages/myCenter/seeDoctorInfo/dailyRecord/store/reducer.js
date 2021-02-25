import { dayInfoList } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    dayInfoList:[]
})
export default (state = defaState,action)=>{
    if(action.type===dayInfoList){
        return state.set('dayInfoList',action.value);
    }
    return state
}