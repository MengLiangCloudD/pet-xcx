//导入类型判断
import { vaccinOrderList } from './actionType';
import { fromJS } from 'immutable';

export const setVaccinOrderList=(value)=>({
    type:vaccinOrderList,
    value:fromJS(value)
})