import { docPriceList,urlType } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    docPriceList:[],
    urlType:0
})
export default (state = defaState,action)=>{
    if(action.type===docPriceList){
        return state.set('docPriceList',action.value);
    }
    if(action.type===urlType){
        return state.set('urlType',action.value);
    }
    
    return state
}