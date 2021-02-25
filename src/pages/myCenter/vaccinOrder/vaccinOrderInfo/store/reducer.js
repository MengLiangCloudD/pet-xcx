import { vaccinOrderId } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    vaccinOrder_id:''
})
export default (state = defaState,action)=>{
    if(action.type===vaccinOrderId){
        return state.set('vaccinOrder_id',action.value);
    }
    return state
}