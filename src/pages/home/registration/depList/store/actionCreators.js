//导入类型判断
import { deptList } from './actionType';
import { fromJS } from 'immutable';

export const setDeptList=(value)=>({
    type:deptList,
    value:fromJS(value)
})