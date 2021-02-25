//导入类型判断
import { nation,nationLable,vaccineList,petMapInfo } from './actionType';
import { fromJS } from 'immutable';

export const setNation=(value)=>({
    type:nation,
    value
})
export const setNationLable=(value)=>({
    type:nationLable,
    value
})
export const setPetMapInfo=(value)=>({
    type:petMapInfo,
    value:fromJS(value)
})

export const setVaccineList=(value)=>({
    type:vaccineList,
    value:fromJS(value)
})
