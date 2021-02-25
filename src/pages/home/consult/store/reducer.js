import { websocketState } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    websocketState:0
})
export default (state = defaState,action)=>{
    if(action.type===websocketState){
        return state.set('websocketState',action.value);
    }
    return state
}