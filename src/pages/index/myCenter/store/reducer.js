import { userInfo} from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    header:'个人中心',
    //个人信息
    userInfo:{}
})
export default (state = defaState,action)=>{
    if(action.type===userInfo){
        return state.set('userInfo',action.value);
    }
    return state
}