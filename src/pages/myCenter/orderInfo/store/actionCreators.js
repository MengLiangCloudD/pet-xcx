//导入类型判断
import { orderInfo,orderId } from './actionType';
import { fromJS } from 'immutable';
// 订单详情
export const setorderInfo=(value)=>({
    type:orderInfo,
    value:fromJS(value)
})
export const getorderNo=(value)=>({
    type:orderId,
    value
})
