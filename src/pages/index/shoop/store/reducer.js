import { List} from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    header:'商城',
    shoopList:[]
})
export default (state = defaState,action)=>{
    if(action.type===List){
        return state.set('shoopList',action.value);
    }
    return state
}