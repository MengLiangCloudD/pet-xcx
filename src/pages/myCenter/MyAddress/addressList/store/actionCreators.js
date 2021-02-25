//导入类型判断
import { MysiteList,doORlook } from './actionType';
import { fromJS } from 'immutable';
// 处理导出数据
export const MysetSiteList=(value)=>({
    type:MysiteList,
    value:fromJS(value)
})
export const MydoORlook=(value)=>({
    type:doORlook,
    value
})