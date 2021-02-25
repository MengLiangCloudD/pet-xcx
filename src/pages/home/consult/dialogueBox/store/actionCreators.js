//导入类型判断
import { chatList,inputValue,OrderNo,counts,OrderCode } from './actionType';
import { fromJS } from 'immutable';
// 处理导出数据
export const chatListInfo=(value)=>({
    type:chatList,
    value:fromJS(value)
})
export const inputValueInfo=(value)=>({
    type:inputValue,
    value:value
})
export const setOrderNo=(value)=>({
    type:OrderNo,
    value:value
})
export const setCounts=(value)=>({
    type:counts,
    value:value
})
export const setOrderCode=(value)=>({
    type:OrderCode,
    value:value
})
