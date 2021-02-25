import http from '../utils/http';
export default {
    getCardInfo(that,cardNo){
        return new Promise((resolve, reject) => {
            var url = 'card/queryCardInfo';
            var prams = {
                cardNo
            };
            http.postRequest(url,prams,
                function(res){
                    if(res.errcode===0&&res.data!==null){
                        var obj ={}
                        obj.petName = res.data.name;
                        obj.cardNo = res.data.card_no;
                        if(res.data.balance===null){
                            obj.balance =0;
                        }else{
                            obj.balance = res.data.balance;
                        }
                        
                        resolve(obj);
                    }else if(res.errcode===0&&res.data===null){

                    }
                },
                function(err){

                }
            )
        })
    }
    
}