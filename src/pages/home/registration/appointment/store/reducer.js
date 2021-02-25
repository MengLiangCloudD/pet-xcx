import { navList,doctorList,deptId,deptName } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    navList:[],
    doctorList:[],
    dept_id:'',
    deptName:''
})
export default (state = defaState,action)=>{
    if(action.type===navList){
        return state.set('navList',action.value);
    }
    if(action.type===doctorList){
        return state.set('doctorList',action.value);
    }
    if(action.type===deptId){
        return state.set('dept_id',action.value);
    }
    if(action.type===deptName){
        return state.set('deptName',action.value);
    }
    
    return state
}