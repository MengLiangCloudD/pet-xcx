import { docTreatInfoList,clinic_id } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    docTreatInfoList:[],
    clinic_id:''
})
export default (state = defaState,action)=>{
    if(action.type===docTreatInfoList){
        return state.set('docTreatInfoList',action.value);
    }
    if(action.type===clinic_id){
        return state.set('clinic_id',action.value);
    }
    return state
}