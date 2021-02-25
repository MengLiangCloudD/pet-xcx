import { infoMap } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    infoMap:{}
})
export default (state = defaState,action)=>{
    if(action.type===infoMap){
        return state.set('infoMap',action.value);
    }
    return state
}