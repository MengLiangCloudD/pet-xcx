//导入类型判断
import { infoMap } from './actionType';
import { fromJS } from 'immutable';

export const setInfoMap=(value)=>({
    type:infoMap,
    value:fromJS(value)
})