import { shoopListInfo,typeList,ProductId,proOfficial,shoopValue } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    shoopListInfo:[],
    //
    typeList:{
        a:[{id: 999, typeName: "全部分类"}],
        b:[{id: 999, typeName: "品种"}],
        c:[{id: 999, typeName: "品牌"}]
    },
    productId:'',
    //分类id
    proOfficial:'',
    shoopValue:''
})
export default (state = defaState,action)=>{
    if(action.type===shoopListInfo){
        return state.set('shoopListInfo',action.value);
    }
    if(action.type===typeList){
        return state.set('typeList',action.value);
    }
    if(action.type===ProductId){
        return state.set('productId',action.value);
    }
    if(action.type===proOfficial){
        return state.set('proOfficial',action.value);
    }
    if(action.type===shoopValue){
        return state.set('shoopValue',action.value);
    }
    return state
}