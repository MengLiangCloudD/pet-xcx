import { orderInfo,orderId } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    orderInfo:{
        created_at:'',
        order_id:'12345688',
        order_code:10,
        full_name:'北京市朝阳区',
        address:'望京SOHO',
        recipient:'张三',
        mobile:'17611502298',
        subOrderList:[],
        pro_platform_sum:'888.00',
        integral:'-200.00',
        pro_freight_sum:'100.00',
        totle_sum:'788.00'
    },
    order_id:''
})
export default (state = defaState,action)=>{
    //订单详情
    if(action.type===orderInfo){
        return state.set('orderInfo',action.value);
    }
    if(action.type===orderId){
        return state.set('order_id',action.value);
    }
    return state
}