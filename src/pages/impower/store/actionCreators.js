//导入类型判断
import { codeType } from './actionType';
// import axios from  'axios';
// 处理导出数据
export const codeInfo=(value)=>({
    type:codeType,
    value
})