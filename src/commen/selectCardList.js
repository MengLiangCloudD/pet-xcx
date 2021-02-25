import http from './../utils/http';
export default {
    getCardList(){
        return new Promise((resolve, reject) => {
            var url = 'card/queryCardsList';
            var prams= {
    
            }
            http.postRequest(url,prams,
                function(res){
                    if(res.errcode===0){
                        resolve(res.data);
                    }
                },
                function(err){
    
                }
            )
        })
    }
    
}