// let yun = 'http://192.166.80.9:8761'
//开发环境
let yun = 'http://192.166.87.124'
// let yun = 'http://192.166.80.9:8888'
//测试环境
// let yun = 'http://192.166.20.13'
//生产环境
// let yun = 'http://192.166.10.49'



module.exports = {
    proxy: {
        '/api': {
            target: yun,  // 接口域名
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/api' : '/'
            } 
        }
    }
  }