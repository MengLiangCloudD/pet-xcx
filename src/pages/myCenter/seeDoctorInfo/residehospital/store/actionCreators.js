//导入类型判断
import { hospitalizationList } from './actionType';
import { fromJS } from 'immutable';

export const setHospitalizationList=(value)=>({
    type:hospitalizationList,
    value:fromJS(value)
})