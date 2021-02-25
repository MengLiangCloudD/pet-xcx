import { orderNo,orderType,Price,cardPrice,cardNumber } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    // 订单编号
    orderNo:'',
    // 订单类型 1咨询 2商城 3挂号 4疫苗
    type:1,
    //订单价格
    price:0,
    cardPrice:0,
    cardNumber:''
})
export default (state = defaState,action)=>{
    //订单编号
    if(action.type===orderNo){
        return state.set('orderNo',action.value);
    }
    //订单类型
    if(action.type===orderType){
        return state.set('type',action.value);
    }
    //支付金额
    if(action.type===Price){
        return state.set('price',action.value);
    }
    //就诊卡支付金额
    if(action.type===cardPrice){
        return state.set('cardPrice',action.value);
    }
    if(action.type===cardNumber){
        return state.set('cardNumber',action.value);
    }
    
    return state
}