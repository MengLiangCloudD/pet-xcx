import { } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    header:'首页'
})
export default (state = defaState,action)=>{

    return state
}