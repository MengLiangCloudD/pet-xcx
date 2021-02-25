//导入类型判断
import { vaccinOrderId } from './actionType';

export const setVaccinOrderId=(value)=>({
    type:vaccinOrderId,
    value:value
})