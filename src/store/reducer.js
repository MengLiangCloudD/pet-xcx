//整合
import { combineReducers } from 'redux-immutable';
//授权页
import {reducer as impower} from './../pages/impower/store/index';
//公共头部
import {reducer as header} from './../commen/header/store/index';
//首页主页
import {reducer as homeIndex} from '../pages/index/home/store/index';
//商城主页
import {reducer as shoopStore} from '../pages/index/shoop/store/index';
//消息主页
import {reducer as news} from './../pages/index/news/store/index';
//我的主页
import {reducer as myCenter} from '../pages/index/myCenter/store/index';
//g购物车
import {reducer as shoppingCart} from '../pages/shoopstore/shoopPayBefore/shoppingCart/store/index';
//支付订单
import {reducer as paymentOrder} from './../pages/paymentOrder/store/index';
//聊天
import {reducer as dialogueBox} from './../pages/home/consult/dialogueBox/store/index';
//商品列表
import {reducer as shoopList} from './../pages/shoopstore/shoopPayBefore/shoopList/store/index';
//商品详情
import {reducer as shoopInfo} from './../pages/shoopstore/shoopPayBefore/shoopInfo/store/index';
//商城订单
import {reducer as myShoopOrder} from './../pages/myCenter/myShoopOrder/store/index';
//商品订单详情
import {reducer as orderInfo} from './../pages/myCenter/orderInfo/store/index';
//咨询订单
import  {reducer as consultOrder}  from './../pages/home/consult/consultOrder/store/index';
//公共websocket链接状态
import {reducer as websocketState} from './../pages/home/consult/store/index';
//添加地址
import {reducer as addAddress} from './../pages/myCenter/MyAddress/addAddress/store/index';
//我的地址列表
import {reducer as addressList} from './../pages/myCenter/MyAddress/addressList/store/index';
// 确认订单
import {reducer as SettlementOrder} from './../pages/shoopstore/shoopPayBefore/SettlementOrder/store/index';
//排号
import {reducer as rowNumber} from './../pages/myCenter/queueNumber/rowNumber/store/index';

/**===============================================挂号 ====================================================================*/
//挂号
import {reducer as appointment} from './../pages/home/registration/appointment/store/index';
//挂号列表
import {reducer as registerList} from './../pages/myCenter/registerOrder/registerList/store/index';
//科室列表
import {reducer as depList} from './../pages/home/registration/depList/store/index';
//确认挂号
import {reducer as oKregistered} from './../pages/home/registration/oKregistered/store/index';

/**=============================================== 疫苗 ====================================================================*/
import {reducer as vaccination} from './../pages/home/vaccine/vaccination/store/index';

/**=============================================== 就诊卡管理 ============================================================ */
//一卡通管理
import {reducer as cardList} from './../pages/myCenter/cardAdmin/cardList/store/index';
//宠物档案
import {reducer as petFile} from './../pages/myCenter/cardAdmin/petFile/store/index';
//添加宠物
import {reducer as addPet} from './../pages/myCenter/cardAdmin/addPet/store/index';
//宠物分类
import {reducer as petType} from './../pages/myCenter/cardAdmin/petType/store/index';
//一卡通充值
import {reducer as topupCarder} from './../pages/myCenter/cardAdmin/topupCarder/store/index';
//消费明细
import {reducer as cardBillInfo} from './../pages/myCenter/cardAdmin/cardBillInfo/store/index';


/**================================================ 就诊信息 ============================================================= */
//住院
import {reducer as residehospital} from './../pages/myCenter/seeDoctorInfo/residehospital/store/index';
//住院详情
import {reducer as hospitalInfo} from './../pages/myCenter/seeDoctorInfo/hospitalInfo/store/index';
//住院明细
import {reducer as dateDetail} from './../pages/myCenter/seeDoctorInfo/dateDetail/store/index';
//住院缴费
import {reducer as topupHos} from './../pages/myCenter/seeDoctorInfo/topupHos/store/index';
//每日记录
import {reducer as dailyRecord} from './../pages/myCenter/seeDoctorInfo/dailyRecord/store/index';
//病历单
import {reducer as caseHistory} from './../pages/myCenter/seeDoctorInfo/caseHistory/store/index';
//病历详情
import {reducer as caseInfo} from './../pages/myCenter/seeDoctorInfo/caseInfo/store/index';
//医疗费
import {reducer as docTreatment} from './../pages/myCenter/seeDoctorInfo/docTreatment/store/index';
//医疗费详情
import {reducer as docTreatInfo} from './../pages/myCenter/seeDoctorInfo/docTreatInfo/store/index';
//化验
import {reducer as assayList} from './../pages/myCenter/seeDoctorInfo/assayList/store/index';
//化验详情
import {reducer as assayInfo} from './../pages/myCenter/seeDoctorInfo/assayInfo/store/index';
//检查单
import {reducer as examine} from './../pages/myCenter/seeDoctorInfo/examine/store/index';

/**================================================ 疫苗订单 ============================================================= */
import {reducer as vaccinOrderList} from './../pages/myCenter/vaccinOrder/vaccinOrderList/store/index';
import {reducer as vaccinOrderInfo} from './../pages/myCenter/vaccinOrder/vaccinOrderInfo/store/index';
//redux-immutable
const reducer= combineReducers({
    header:header,
    homeIndex:homeIndex,
    impower:impower,
    shoopStore:shoopStore,
    news:news,
    myCenter:myCenter,
    shoppingCart:shoppingCart,
    paymentOrder:paymentOrder,
    dialogueBox:dialogueBox,
    shoopList:shoopList,
    shoopInfo:shoopInfo,
    myShoopOrder:myShoopOrder,
    orderInfo:orderInfo,
    consultOrder:consultOrder,
    websocketState:websocketState,
    addAddress:addAddress,
    addressList:addressList,
    SettlementOrder:SettlementOrder,
    rowNumber:rowNumber,
    appointment:appointment,
    oKregistered:oKregistered,
    cardList:cardList,
    petFile:petFile,
    addPet:addPet,
    petType:petType,
    topupCarder:topupCarder,
    cardBillInfo:cardBillInfo,
    depList:depList,
    registerList:registerList,
    residehospital:residehospital,
    hospitalInfo:hospitalInfo,
    dateDetail:dateDetail,
    caseHistory:caseHistory,
    caseInfo:caseInfo,
    docTreatment:docTreatment,
    docTreatInfo:docTreatInfo,
    assayList:assayList,
    assayInfo:assayInfo,
    examine:examine,
    topupHos:topupHos,
    dailyRecord:dailyRecord,
    vaccination:vaccination,
    vaccinOrderList:vaccinOrderList,
    vaccinOrderInfo:vaccinOrderInfo
})
export default reducer