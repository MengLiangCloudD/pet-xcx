import { examineList,examUrlType } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    examineList:[],
    examUrlType:0
})
export default (state = defaState,action)=>{
    if(action.type===examineList){
        return state.set('examineList',action.value);
    }
    if(action.type===examUrlType){
        return state.set('examUrlType',action.value);
    }
    
    return state
}