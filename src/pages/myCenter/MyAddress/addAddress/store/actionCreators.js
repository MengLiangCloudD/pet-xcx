//导入类型判断
import { siteList,addORupdate,updateSite } from './actionType';
import { fromJS } from 'immutable';
// 处理导出数据
export const setSiteList=(value)=>({
    type:siteList,
    value:fromJS(value)
})
//
export const setAddORupdate=(value)=>({
    type:addORupdate,
    value:value
})
//
export const setUpdateSite=(value)=>({
    type:updateSite,
    value:fromJS(value)
})