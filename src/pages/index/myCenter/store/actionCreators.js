//导入类型判断
import {  userInfo } from './actionType';
import { fromJS } from 'immutable';
//处理导出数据
export const setUserInfo=(value)=>({
    type:userInfo,
    value:fromJS(value)
})