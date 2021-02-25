import { siteList,addORupdate,updateSite } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
//hearder数据
const defaState=fromJS({
    //地址列表
    siteList:[],
    //热门城市
    tagsCity:[{
        id: 1,
        areaid: "110000",
        parentid: "0",
        name: "北京市",
        province: "北京市",
        city: "",
        district: "",
        fullName: "北京市",
        level: 1
    },{
        id: 19,
        areaid: "120000",
        parentid: "0",
        name: "天津市",
        province: "天津市",
        city: "",
        district: "",
        fullName: "天津市",
        level: 1
    },{
        id: 37,
        areaid: "130000",
        parentid: "0",
        name: "河北省",
        province: "河北省",
        city: "",
        district: "",
        fullName: "河北省",
        level: 1
    },{
        id: 1,
        areaid: "110000",
        parentid: "0",
        name: "北京市",
        province: "北京市",
        city: "",
        district: "",
        fullName: "北京市",
        level: 1
    },{
        id: 19,
        areaid: "120000",
        parentid: "0",
        name: "天津市",
        province: "天津市",
        city: "",
        district: "",
        fullName: "天津市",
        level: 1
    },{
        id: 37,
        areaid: "130000",
        parentid: "0",
        name: "河北省",
        province: "河北省",
        city: "",
        district: "",
        fullName: "河北省",
        level: 1
    },{
        id: 19,
        areaid: "120000",
        parentid: "0",
        name: "天津市",
        province: "天津市",
        city: "",
        district: "",
        fullName: "天津市",
        level: 1
    }],
    //添加还是修改
    addORupdate:0,
    //修改的地址
    updateSite:{}
})
export default (state = defaState,action)=>{
    if(action.type===siteList){
        return state.set('siteList',action.value);
    }
    if(action.type===addORupdate){
        return state.set('addORupdate',action.value);
    }
    if(action.type===updateSite){
        return state.set('updateSite',action.value);
    }
    return state
}