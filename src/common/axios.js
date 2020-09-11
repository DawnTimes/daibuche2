/*
 * @Author: 廖亿晓
 * @Date: 2020-07-14 16:16:47
 * @LastEditTime: 2020-09-08 13:53:31
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\common\axios.js
 */
import Vue from 'vue'
import axios from 'axios'
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

const axiosDefaults = {
  // baseURL: 'http://192.166.87.126:8084',
  baseURL: '/api',
  // baseURL: '/api',
  // retry: 2,
  // retryDelay: 1000,
  // timeout: 10000,
};

axios.defaults = Object.assign(axios.defaults, axiosDefaults);

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
        .catch(err => {
          reject(err)
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
        .catch(err => {
          reject(err.data)
        })
    });
  }
}
