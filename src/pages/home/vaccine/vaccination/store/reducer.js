import { nation,nationLable,vaccineList,petMapInfo } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    //宠物种类
    nation:'',
    nationLable:'',
    nationList:[{lable:"小狗",value:'b25c41f580d14c08a7b24ff83ce33f3c'},{lable:"小猫",value:'ddae28e56b8049b9b874ccbbb8d09718'}],
    //疫苗种类
    vaccineList:[{start:0,vaccineName:'小二联',id:0},{start:0,vaccineName:'犬六联',id:1},{start:0,vaccineName:'小二联',id:2},{start:0,vaccineName:'狂犬疫苗',id:3},],
    //宠物信息
    petMapInfo:{}
})
export default (state = defaState,action)=>{
    if(action.type===nation){
        return state.set('nation',action.value);
    }
    if(action.type===nationLable){
        return state.set('nationLable',action.value);
    }
    if(action.type===vaccineList){
        return state.set('vaccineList',action.value);
    }
    if(action.type===petMapInfo){
        return state.set('petMapInfo',action.value);
    }
    return state
}