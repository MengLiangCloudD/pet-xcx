import http from './../utils/http';
export default {
    getCard(that){
        return new Promise((resolve, reject) => {
            var url = 'card/queryDefaultCard';
            var prams = {};
            http.postRequest(url,prams,
                function(res){
                    if(res.errcode===0&&res.data!==null){
                        var obj ={}
                        if(res.data.nation==='01'){
                            obj.petType="小狗"
                        }else if(res.data.nation==='02'){
                            obj.petType="小猫"
                        }else{
                            obj.petType="其他"
                        }
                        obj.id = res.data.pet_id;
                        obj.petName = res.data.name;
                        obj.cardNo = res.data.card_no;
                        if(res.data.balance===null){
                            obj.balance =0;
                        }else{
                            obj.balance = res.data.balance;
                        }

                        resolve(obj);
                    }else if(res.errcode===0&&res.data===null){
                        that.setState({
                            cardOpened:true
                        })
                    }
                },
                function(err){

                }
            )
        })
    }
    
}