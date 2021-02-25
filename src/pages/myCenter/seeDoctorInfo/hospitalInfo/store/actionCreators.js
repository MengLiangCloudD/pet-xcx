//导入类型判断
import { HosInfo,VisitNo } from './actionType';
import { fromJS } from 'immutable';

export const setHosInfo=(value)=>({
    type:HosInfo,
    value:fromJS(value)
})
export const setVisitNo=(value)=>({
    type:VisitNo,
    value:value
})
