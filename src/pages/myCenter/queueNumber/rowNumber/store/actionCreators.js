//导入类型判断
import {  Time,TodarRegisterList } from './actionType';
import { fromJS } from 'immutable';
//处理导出数据
export const setTime=(value)=>({
    type:Time,
    value:value
})
export const setTodarRegisterList=(value)=>({
    type:TodarRegisterList,
    value:fromJS(value)
})