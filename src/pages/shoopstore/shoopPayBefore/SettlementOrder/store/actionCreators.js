import { addRess,setPid } from './actionType';
import { fromJS } from 'immutable';
// 处理导出数据
export const addRessInfo=(value)=>({
    type:addRess,
    value:fromJS(value)
})
export const setPides=(value)=>({
    type:setPid,
    value
})
