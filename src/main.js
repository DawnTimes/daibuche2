/*
 * @Author: 廖亿晓
 * @Date: 2020-07-14 16:16:48
 * @LastEditTime: 2020-08-10 15:32:45
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import './assets/css/global.css'
import './assets/css/index.scss';
import './assets/fonts/iconfont.css'
import store from './store'
import global_ from './common/media' //引用文件
import "babel-polyfill"
import Common from '@/common/index.js';

Vue.prototype.GLOBAL = global_ //挂载到Vue实例上面
Vue.config.productionTip = false
Vue.use(ElementUI)

//拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          router.replace({
            path: '/',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  })




/* axios.interceptors.request.use(
  config => {
    debugger
    // store.dispatch('showToast', config.baseURL + config.url)
    let token = store.state.token;
    if (token) {
      config.headers.common['Authorization'] = token;
    }
    return config
  }
) */

/* axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401: case 503: case 403:
          // 返回 401 清除token信息并跳转到登录页面
          router.replace({
            path: '/',
            // query: {redirect: router.currentRoute.fullPath}
          })
          store.commit('setUserInfo', null);
      }
    } else {
      store.dispatch('showToast', '系统异常，请稍后再试')
    }
    return Promise.reject(error)   // 返回接口返回的错误信息
  }
); */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  Common,
  components: {
    App
  },
  template: '<App/>'
})
