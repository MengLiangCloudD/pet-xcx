//导入类型判断
import { dayInfoList } from './actionType';
import { fromJS } from 'immutable';

export const setDayInfoList=(value)=>({
    type:dayInfoList,
    value:fromJS(value)
})