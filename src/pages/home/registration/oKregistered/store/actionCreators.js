//导入类型判断
import { timeList,petInfo,doctorInfo,timerser } from './actionType';
import { fromJS } from 'immutable';
// 处理导出数据
export const setTimeList=(value)=>({
    type:timeList,
    value:fromJS(value)
})
export const setPetInfo=(value)=>({
    type:petInfo,
    value:fromJS(value)
})
export const setDoctorInfo=(value)=>({
    type:doctorInfo,
    value:fromJS(value)
})
export const setTimer=(value)=>({
    type:timerser,
    value:fromJS(value)
})
