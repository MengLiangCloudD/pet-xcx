//导入类型判断
import { cardList,selectStart } from './actionType';
import { fromJS } from 'immutable';
// 一卡通列表
export const setCardList=(value)=>({
    type:cardList,
    value:fromJS(value)
})
//状态
export const setSelectStart=(value)=>({
    type:selectStart,
    value:value
})