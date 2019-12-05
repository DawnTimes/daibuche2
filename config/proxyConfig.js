// let yun = 'http://192.166.80.9:8761'
let yun = 'http://192.166.87.124'
// let yun = 'http://192.166.88.2:8888'



module.exports = {
    proxy: {
        '/api': {
            target: yun,  // 接口域名
            changeOrigin: true,  //是否跨域
/*             pathRewrite: {
                '^/api' : '/'
            } */
        }
    }
  }