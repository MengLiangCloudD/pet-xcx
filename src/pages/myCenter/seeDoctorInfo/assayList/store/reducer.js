import { assayList,assUrlType } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    assayList:[],
    assUrlType:0
})
export default (state = defaState,action)=>{
    if(action.type===assayList){
        return state.set('assayList',action.value);
    }
    if(action.type===assUrlType){
        return state.set('assUrlType',action.value);
    }
    
    return state
}