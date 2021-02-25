import { SHOOPlIST,checkAll,selectList,total,settlementListss,ordered_type} from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    //标题
    header:'购物车',
    //商品列表
    shoopList:[],
      // 选中的列表
      selectList: [],
      //是否全选
      checkAll: false,
      //合计
      total: 0.00,
      //结算商品集合
      settlementListss:[],
      //结算状态，购物车或者详情页购物车2详情页1
      ordered_type:2
})
export default (state = defaState,action)=>{
    if(action.type===SHOOPlIST){
        return state.set('shoopList',action.value);
    }
    if(action.type===checkAll){
        return state.set('checkAll',action.value);
    }
    if(action.type===selectList){
        return state.set('selectList',action.value);
    }
    if(action.type===total){
        return state.set('total',action.value);
    }
    if(action.type===settlementListss){
        return state.set('settlementListss',action.value);
    }
    if(action.type===ordered_type){
        return state.set('ordered_type',action.value);
    }
    
    return state
}