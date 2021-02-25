//导入类型判断
import { assayInfoMap,assayMapId } from './actionType';
import { fromJS } from 'immutable';
// 处理导出数据
export const setAssayInfoMap=(value)=>({
    type:assayInfoMap,
    value:fromJS(value)
})
export const setAssayMapId=(value)=>({
    type:assayMapId,
    value:fromJS(value)
})