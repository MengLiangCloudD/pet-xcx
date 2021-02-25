//导入类型判断
import { docPriceList,urlType } from './actionType';
import { fromJS } from 'immutable';

export const setDocPriceList=(value)=>({
    type:docPriceList,
    value:fromJS(value)
})
export const seturlType=(value)=>({
    type:urlType,
    value:value
})