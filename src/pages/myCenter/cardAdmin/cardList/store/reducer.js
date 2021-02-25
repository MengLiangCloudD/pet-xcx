import { cardList,selectStart } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    cardList:[],
    selectStart:0
})
export default (state = defaState,action)=>{
    if(action.type===cardList){
        return state.set('cardList',action.value);
    }
    if(action.type===selectStart){
        return state.set('selectStart',action.value);
    }
    return state
}