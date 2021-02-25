import { hospitalizationList } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    hospitalizationList:[]
})
export default (state = defaState,action)=>{
    if(action.type===hospitalizationList){
        return state.set('hospitalizationList',action.value);
    }
    return state
}