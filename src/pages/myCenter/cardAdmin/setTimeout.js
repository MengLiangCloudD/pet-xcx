
function send(that) {
    if(!that.state.codeStart){
        that.setState(()=>({
            codeStart:true,
        }),()=>{
            var interval = setInterval(function() {
                if (that.state.time<= 0) {
                    that.setState({
                        time:60,
                        codeStart:false
                    })
                    clearTimeout(interval);
                }else{
                    var time = that.state.time - 1;
                    that.setState({
                        time:time
                    })
                }
            }, 1000);
        })
    }
}
function getCode(phone,that,http){
    var url = 'card/sendCode'
        var prams = {
          phone:phone
        }
        http.postRequest(url,prams,
          function(res){
            if(res.errcode===0){
                send(that)
            }
          }, 
          function(err){

          }
        )
}
module.exports = {
    getCode:getCode
  }
  