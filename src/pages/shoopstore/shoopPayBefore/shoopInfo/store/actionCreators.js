//导入类型判断
import { shoopInfo,ProductId } from './actionType';
import { fromJS } from 'immutable';
//处理导出数据
export const setShoopInfo=(value)=>({
    type:shoopInfo,
    value:fromJS(value)
})

