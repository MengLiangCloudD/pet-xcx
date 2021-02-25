import { timeList,petInfo,doctorInfo,timerser } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    timeList:[{
        value:"2",
        start:0,
        time:'上午（08:00-12:00）',
        disabled:false
    },{
        value:"3",
        start:0,
        time:'下午（14:00-18:00）',
        disabled:false
        
    },{
        value:"4",
        start:0,
        time:'夜间（18:00-21:00）',
        disabled:false
    }],
    //用户宠物信息
    petInfo:{},
    //医生信息
    doctorInfo:{},
    //挂号时间
    timer:{}
})
export default (state = defaState,action)=>{
    if(action.type===timeList){
        return state.set('timeList',action.value);
    }
    if(action.type===petInfo){
        return state.set('petInfo',action.value);
    }
    if(action.type===doctorInfo){
        return state.set('doctorInfo',action.value);
    }
    if(action.type===timerser){
        
        return state.set('timer',action.value);
    }
    
    return state
}