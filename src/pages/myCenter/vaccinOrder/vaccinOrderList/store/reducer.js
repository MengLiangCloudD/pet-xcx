import { vaccinOrderList } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    vaccinOrderList:[]
})
export default (state = defaState,action)=>{
    if(action.type===vaccinOrderList){
        return state.set('vaccinOrderList',action.value);
    }
    return state
}