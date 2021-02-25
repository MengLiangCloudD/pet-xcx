import {  } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({

})
export default (state = defaState,action)=>{
    // if(action.type===cardList){
    //     return state.set('cardList',action.value);
    // }
    return state
}