import { detailList } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    detailList:[]
})
export default (state = defaState,action)=>{
    if(action.type===detailList){
        return state.set('detailList',action.value);
    }
    return state
}