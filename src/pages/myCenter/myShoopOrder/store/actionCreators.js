//导入类型判断
import { orderList } from './actionType';
import { fromJS } from 'immutable';
// 处理导出数据
export const setOrderList=(value)=>({
    type:orderList,
    value:fromJS(value)
})