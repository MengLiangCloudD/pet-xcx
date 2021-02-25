import { assayInfoMap,assayMapId } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    assayInfoMap:[],
    assayMapId:{}
})
export default (state = defaState,action)=>{
    if(action.type===assayInfoMap){
        return state.set('assayInfoMap',action.value);
    }
    if(action.type===assayMapId){
        return state.set('assayMapId',action.value);
    }
    
    return state
}