//导入类型判断
import { navList,doctorList,deptId,deptName } from './actionType';
import { fromJS } from 'immutable';
// import axios from  'axios';
// 处理导出数据
export const setNavList=(value)=>({
    type:navList,
    value:fromJS(value)
})

//医师列表
export const setDoctorList=(value)=>({
    type:doctorList,
    value:fromJS(value)
})
export const setDeptId=(value)=>({
    type:deptId,
    value:value
})
export const setDeptName=(value)=>({
    type:deptName,
    value:value
})
