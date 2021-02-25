//导入类型判断
import { fileList,userInfo } from './actionType';
import { fromJS } from 'immutable';
// 处理导出数据
export const setFileList=(value)=>({
    type:fileList,
    value:fromJS(value)
})
export const setUserInfo=(value)=>({
    type:userInfo,
    value:fromJS(value)
})