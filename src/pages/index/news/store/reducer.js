import { nesList } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    header:'消息',
    nesList:[]
})
export default (state = defaState,action)=>{
    if(action.type===nesList){
        return state.set('nesList',action.value);
    }
    return state
}