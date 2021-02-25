export default {
  pages: [
    //首页
    'pages/index/home/index',
    //商城
    'pages/index/shoop/shoopstore',
    //消息
    'pages/index/news/news',
    //我的
    'pages/index/myCenter/myCenter',
    //授权
    'pages/impower/impower',
    // //支付订单
    'pages/paymentOrder/paymentOrder',
    //支付审核
    'pages/paycheck/paycheck'
  ],
  "permission": {
    "scope.userLocation": {
    "desc": "你的位置信息将用于小程序位置接口的效果展示"
    }
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    backgroundColorTop: "#ccc",
    onReachBottomDistance: 50,
    navigationStyle:"custom"
  },
  tabBar: {  //用来配置底部导航栏
    color: "#000",
    selectedColor: "#1296db",
    backgroundColor: "#fff",
    borderStyle: "black",
    list: [  //配置页面路径以及icon图标及其选中，最少2个，最多5个
      {
        pagePath: "pages/index/home/index",
        text: "首页",
        iconPath: "./commen/imger/home.png",
        selectedIconPath: "./commen/imger/home1.png"
      },
      {
        pagePath: "pages/index/shoop/shoopstore",
        text: "商城",
        iconPath: "./commen/imger/shooping.png",
        selectedIconPath: "./commen/imger/shooping1.png"
      },
      {
        pagePath: "pages/index/news/news",
        text: "消息",
        iconPath: "./commen/imger/shoopcat.png",
        selectedIconPath: "./commen/imger/shoopcat1.png"
      },
      {
        pagePath: "pages/index/myCenter/myCenter",
        text: "我的",
        iconPath: "./commen/imger/my.png",
        selectedIconPath: "./commen/imger/my1.png"
      }
    ]
  },
  // 分包路径
    subPackages:[
      {
        //首页
        "root": "pages/home/",
        "pages": [
          /**咨询 */
          "consult/consultOrder/consultOrder",//咨询订单
          "consult/consultHome/consultHome",//咨询主页
          "consult/dialogueBox/dialogueBox",//聊天页
          /**挂号 */
          "registration/appointment/appointment",//挂号主页
          "registration/oKregistered/oKregistered",//确认挂号
          "registration/depList/depList",//科室列表
          /**疫苗 */
          "vaccine/vaccination/vaccination"
        ]
      },
      {
        //个人中心
        "root":"pages/myCenter/",
        "pages":[
          //关于本院
          "inRegards/contact/contact",//联系我们
          "inRegards/hospitaReferral/hospitaReferral",//医院介绍
          "inRegards/inRegardsHome/inRegardsHome",//关于本院
          //排号
          "queueNumber/rowNumber/rowNumber",//排号
          "queueNumber/rowList/rowList",//排号列表
          //我的挂号
          "registerOrder/registerList/registerList",
          //地址
          "MyAddress/addressList/addressList",//地址列表
          "MyAddress/addAddress/addAddress",//添加地址
          //商品订单
          "orderInfo/orderInfo",//订单详情
          "myShoopOrder/myShoopOrder",//订单列表
          //一卡通管理
          "cardAdmin/cardList/cardList",//一卡通管理
          "cardAdmin/petFile/petFile",//宠物档案
          "cardAdmin/addPet/addPet",//添加宠物
          "cardAdmin/petType/petType",//宠物类型
          "cardAdmin/addCarder/addCarder",//新建一卡通
          "cardAdmin/bindingCarder/bindingCarder",//绑定一卡通
          "cardAdmin/topupCarder/topupCarder",//一卡通充值
          "cardAdmin/cardBillInfo/cardBillInfo",//查看明细
          "cardAdmin/changePassword/changePassword",//修改密码
          
          //就诊信息
          "seeDoctorInfo/seeInfoHome/seeInfoHome",//就诊信息
          "seeDoctorInfo/residehospital/residehospital",//住院单
          "seeDoctorInfo/hospitalInfo/hospitalInfo",//住院详情
          "seeDoctorInfo/dateDetail/dateDetail",//住院明细
          "seeDoctorInfo/topupHos/topupHos",//充值
          "seeDoctorInfo/dailyRecord/dailyRecord",//每日记录
          "seeDoctorInfo/caseHistory/caseHistory",//病历
          "seeDoctorInfo/caseInfo/caseInfo",//病历详情
          "seeDoctorInfo/docTreatment/docTreatment",//治疗费
          "seeDoctorInfo/docTreatInfo/docTreatInfo",//治疗详情
          "seeDoctorInfo/selectReport/selectReport",//报告查询
          "seeDoctorInfo/assayList/assayList",//化验单
          "seeDoctorInfo/assayInfo/assayInfo",//化验详情
          "seeDoctorInfo/examine/examine",//检查单
          /**疫苗订单 */
          "vaccinOrder/vaccinOrderList/vaccinOrderList",//疫苗订单列表
          "vaccinOrder/vaccinOrderInfo/vaccinOrderInfo",//疫苗详情
        ]
      },
      {
        //商城
        "root":"pages/shoopstore/",
        "pages":[
           "shoopPayBefore/shoppingCart/shoppingCart",//购物车
           "shoopPayBefore/SettlementOrder/SettlementOrder",//结算页
           "shoopPayBefore/shoopList/shoopList",//商品列表
           "shoopPayBefore/shoopInfo/shoopInfo",//商品详情
        ]
      }
    ]
}
