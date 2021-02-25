//导入类型判断
import { consultOrderList } from './actionType';
import { fromJS } from 'immutable';
// 订单号
export const setConsultOrderList=(value)=>({
    type:consultOrderList,
    value:fromJS(value)
})
