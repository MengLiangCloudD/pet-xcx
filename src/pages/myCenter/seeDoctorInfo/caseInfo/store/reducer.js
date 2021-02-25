import { clinicItem,caseInfoMap } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    clinicItem:{},
    caseInfoMap:{}
})
export default (state = defaState,action)=>{
    if(action.type===clinicItem){
        return state.set('clinicItem',action.value);
    }
    if(action.type===caseInfoMap){
        return state.set('caseInfoMap',action.value);
    }
    return state
}