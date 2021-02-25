//导入类型判断
import { websocketState } from './actionType';
// import axios from  'axios';
// 处理导出数据
export const setWebsocketState=(value)=>({
    type:websocketState,
    value
})