//导入类型判断
import { detailList } from './actionType';
import { fromJS } from 'immutable';

export const setDetailList=(value)=>({
    type:detailList,
    value:fromJS(value)
})