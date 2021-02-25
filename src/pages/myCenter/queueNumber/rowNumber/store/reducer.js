import { Time,TodarRegisterList} from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    time:'',
    TodarRegisterList:{}
})
export default (state = defaState,action)=>{
    if(action.type===Time){
        return state.set('time',action.value);
    }
    if(action.type===TodarRegisterList){
        return state.set('TodarRegisterList',action.value);
    }
    return state
}