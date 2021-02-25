//导入类型判断
import { List } from './actionType';
import { fromJS } from 'immutable';
//处理导出数据
export const setList=(value)=>({
    type:List,
    value:fromJS(value)
})