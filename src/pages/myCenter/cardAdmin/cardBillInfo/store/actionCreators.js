//导入类型判断
import { BillInfoList } from './actionType';
import { fromJS } from 'immutable';

export const setBillInfoList=(value)=>({
    type:BillInfoList,
    value:fromJS(value)
})