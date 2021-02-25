//导入类型判断
import { caseList } from './actionType';
import { fromJS } from 'immutable';

export const setCaseList=(value)=>({
    type:caseList,
    value:fromJS(value)
})