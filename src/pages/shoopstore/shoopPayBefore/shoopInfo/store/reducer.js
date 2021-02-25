import { shoopInfo,ProductId } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    //商品详情
    shoopInfo:{
                drugName:'猫粮',
                proMianPhoto:'',
                proNoticeType:'',
                proDescription:'商品描述',
                proPreferential:[],//商品分类，,
                proPlatform:'125.00',//价格
                proFreight:'0',//运费
                productId:'0',//商品id
                sku:[{
                    skuName:'黑色'
                },{
                    skuName:'红色'
                },{
                    skuName:'白色'
                }]
    },
    // 选择商品 
    isLoading:true
})
export default (state = defaState,action)=>{
    if(action.type===shoopInfo){
        return state.set('shoopInfo',action.value);
    }
    
    return state
}