//导入类型判断
import { collapsed } from './actionType';
// import axios from  'axios';
//处理导出数据
export const collapsedTrue=(value)=>({
    type:collapsed,
    value
})