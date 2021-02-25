import { caseList } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    caseList:[]
})
export default (state = defaState,action)=>{
    if(action.type===caseList){
        return state.set('caseList',action.value);
    }
    return state
}