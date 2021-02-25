import { fileList,userInfo } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    fileList:[],
    userInfo:{}
})
export default (state = defaState,action)=>{
    if(action.type===fileList){
        return state.set('fileList',action.value);
    }
    if(action.type===userInfo){
        return state.set('userInfo',action.value);
    }
    return state
}