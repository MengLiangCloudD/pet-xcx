//导入类型判断
import { regOrderList } from './actionType';
import { fromJS } from 'immutable';

export const setRegOrderList=(value)=>({
    type:regOrderList,
    value:fromJS(value)
})