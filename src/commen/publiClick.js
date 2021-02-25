function clickPublic(url){
    if(url==='pages/impower/impower'||url==='pages/home/index/index'){
        return true
    }else{
        if(wx.getStorageSync('token')==undefined||wx.getStorageSync('token')==''||wx.getStorageSync('token')==null||wx.getStorageSync('avatar')==undefined||wx.getStorageSync('avatar')==''||wx.getStorageSync('avatar')==null||wx.getStorageSync('nickname')==undefined||wx.getStorageSync('nickname')==''||wx.getStorageSync('nickname')==null){
            return false
        }else{
            return true
        } 
    }
}
 // 1.通过module.exports方式提供给外部调用
 module.exports = {
    clickPublic: clickPublic,
  }