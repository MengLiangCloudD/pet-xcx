//导入类型判断
import { orderNo,orderType,Price,cardPrice,cardNumber } from './actionType';
// import axios from  'axios';
// 订单号
export const getorderNo=(value)=>({
    type:orderNo,
    value
})
//订单类型
export const getType=(value)=>({
    type:orderType,
    value
})
//订单价格
export const getPrice=(value)=>({
    type:Price,
    value
})
export const getCardPrice=(value)=>({
    type:cardPrice,
    value
})
//卡号
export const getCardNumber=(value)=>({
    type:cardNumber,
    value
})
