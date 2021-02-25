//导入类型判断
import { examineList,examUrlType } from './actionType';
import { fromJS } from 'immutable';

export const setExamineList=(value)=>({
    type:examineList,
    value:fromJS(value)
})
export const setExamUrlType=(value)=>({
    type:examUrlType,
    value:value
})