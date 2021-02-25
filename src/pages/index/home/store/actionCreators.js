//导入类型判断
import { shoopList } from './actionType';
import { fromJS } from 'immutable';
//处理导出数据
export const setShoopList=(value)=>({
    type:shoopList,
    value:fromJS(value)
})