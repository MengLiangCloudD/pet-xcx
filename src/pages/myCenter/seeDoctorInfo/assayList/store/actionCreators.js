//导入类型判断
import { assayList,assUrlType } from './actionType';
import { fromJS } from 'immutable';

export const setAssayList=(value)=>({
    type:assayList,
    value:fromJS(value)
})
export const setAssUrlType=(value)=>({
    type:assUrlType,
    value:value
})