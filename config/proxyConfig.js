/*
 * @Author: 廖亿晓
 * @Date: 2020-07-14 17:04:44
 * @LastEditTime: 2020-10-29 18:50:15
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\config\proxyConfig.js
 */
// let yun = 'http://192.166.80.9:8761'
//开发环境
// let yun = 'http://192.166.87.124'
// let yun = 'http://192.166.80.9:8888'
//测试环境
// let yun = 'http://192.166.20.13'
//生产环境
// let yun = 'http://192.166.10.49'
// 
// let yun = 'http://192.166.87.121:8888'; // 通过网关访问 开发
let yun = 'http://192.166.87.131:8083'; // 开发环境
// let yun = 'http://192.166.14.125:8888'; // 通过网关访问 测试
// let yun = 'http://192.166.80.2:8083'; // 
// let yun = 'http://192.166.88.5:8083'; // 

module.exports = {
  proxy: {
    '/api': {
      target: yun, // 接口域名
      changeOrigin: true, //是否跨域
      pathRewrite: {
        '^/api': '/'
      }
    }
  }
}
