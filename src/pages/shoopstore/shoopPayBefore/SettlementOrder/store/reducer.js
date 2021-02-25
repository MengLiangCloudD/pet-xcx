import { addRess,setPid } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    //地址列表
    addRessInfo:{},
    Pid:''
})
export default (state = defaState,action)=>{
    if(action.type===addRess){
        return state.set('addRessInfo',action.value);
    }
    if(action.type===setPid){
        
        return state.set('Pid',action.value);
    }
    return state
}