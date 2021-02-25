import { codeType } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    code:''
})
export default (state = defaState,action)=>{
    if(action.type===codeType){
        return state.set('code',action.value);
    }
    return state
}