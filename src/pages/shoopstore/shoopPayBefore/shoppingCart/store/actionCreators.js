//导入类型判断
import { SHOOPlIST,checkAll,selectList,total,settlementListss,ordered_type } from './actionType';
import { fromJS } from 'immutable';
// import axios from  'axios';
//处理导出数据
export const upateShoopList=(value)=>({
    type:SHOOPlIST,
    value:fromJS(value)
})
export const upateCheckAll=(value)=>({
    type:checkAll,
    value
})
export const upateTotal=(value)=>({
    type:total,
    value
})
export const upateSelectList=(value)=>({
    type:selectList,
    value:fromJS(value)
})
//结算list
export const settlementList=(value)=>({
    type:settlementListss,
    value:fromJS(value)
})
export const setOrderedType=(value)=>({
    type:ordered_type,
    value:value
})

