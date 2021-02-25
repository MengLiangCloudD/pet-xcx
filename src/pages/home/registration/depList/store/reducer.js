import { deptList } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    deptList:[]
})
export default (state = defaState,action)=>{
    if(action.type===deptList){
        return state.set('deptList',action.value);
    }
    return state
}