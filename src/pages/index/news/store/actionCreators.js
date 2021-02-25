//导入类型判断
import { nesList } from './actionType';
import { fromJS } from 'immutable';
//处理导出数据
export const setNesList=(value)=>({
    type:nesList,
    value:fromJS(value)
})