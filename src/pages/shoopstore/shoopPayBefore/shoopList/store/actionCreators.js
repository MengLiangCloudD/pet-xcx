//导入类型判断
import { shoopListInfo,typeList,ProductId,proOfficial,shoopValue } from './actionType';
import { fromJS } from 'immutable';
//处理导出数据
export const setShoopList=(value)=>({
    type:shoopListInfo,
    value:fromJS(value)
})
export const setTypeList=(value)=>({
    type:typeList,
    value:fromJS(value)
})
export const setProductId=(value)=>({
    type:ProductId,
    value:value
})
export const setProOfficial=(value)=>({
    type:proOfficial,
    value:value
})
export const setShoopValue=(value)=>({
    type:shoopValue,
    value:value
})
