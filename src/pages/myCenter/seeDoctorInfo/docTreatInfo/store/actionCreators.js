//导入类型判断
import { docTreatInfoList,clinic_id } from './actionType';
import { fromJS } from 'immutable';

export const setDocTreatInfoList=(value)=>({
    type:docTreatInfoList,
    value:fromJS(value)
})

export const setClinicId=(value)=>({
    type:clinic_id,
    value:value
})