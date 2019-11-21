import Vue from 'vue'
import axios from 'axios'
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

export default {
    /**
     * get方法，对应get请求
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     */
    get(url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    delete(url, params) {
        return new Promise((resolve, reject) => {
            axios.delete(url, {
                params: params
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    /** 
     * post方法，对应post请求 
     * @param {String} url [请求的url地址] 
     * @param {Object} params [请求时携带的参数] 
     */
    post(url, params) {
        return new Promise((resolve, reject) => {
            // axios.post(url, QS.stringify(params))
            axios.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err =>{
                reject(err.data)
            })
        });
    },    
    put(url, params) {
        return new Promise((resolve, reject) => {
            // axios.post(url, QS.stringify(params))
            axios.put(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err =>{
                reject(err.data)
            })
        });
    }    
}