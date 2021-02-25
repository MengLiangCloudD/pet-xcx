//导入类型判断
import { clinicItem,caseInfoMap } from './actionType';
import { fromJS } from 'immutable';

export const setClinicItem=(value)=>({
    type:clinicItem,
    value:fromJS(value)
})
export const setCaseInfoMap=(value)=>({
    type:caseInfoMap,
    value:fromJS(value)
})