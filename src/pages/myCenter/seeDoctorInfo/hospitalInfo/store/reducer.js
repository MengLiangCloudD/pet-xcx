import { HosInfo,VisitNo } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    HosInfo:{},
    VisitNo:''
})
export default (state = defaState,action)=>{
    if(action.type===HosInfo){
        return state.set('HosInfo',action.value);
    }
    if(action.type===VisitNo){
        return state.set('VisitNo',action.value);
    }
    return state
}