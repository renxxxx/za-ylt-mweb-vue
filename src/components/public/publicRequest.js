import axios from 'axios'
import Vue from 'vue';
import qs from 'qs';
let vue = new Vue();
let request = {
    public_requests(type,url,data,header,doFunction,errFunction){
        return new Promise(()=>{
            this._request(type,url,data,header,doFunction,errFunction)
        })
    },
    _request(type,url,data,header,doFunction,errFunction){
        let _data = ''
        if(header == 'application/x-www-form-urlencoded'){
            qs.stringify(data)
        }else if(header == 'application/json'){
            JSON.stringify(data)
        }
        axios({
            method : type,
            url : url,
            data : _data,
            headers:{
                "content-type" : header
            }
        }).then(res => {
            if(res.data.codeMsg){
                vue.$toast(res.data.codeMsg);
            }
            if(res.data.code == 0){
                doFunction(res.data.data)
            }
        }).catch(err => {
            errFunction(err)
            console.log(err)
        })
    }
}

export default {
	request
};