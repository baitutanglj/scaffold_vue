module.exports = {
  publicPath: './',
  devServer: {
    port: 8002,
    open: true,
    proxy: {
      '/api': {//将'http://localhost:8082'印射为/apis
        // target: 'http://192.168.109.38:8082',// 要代理的API地址
        // target: 'http://192.168.108.188:8082',// 要代理的API地址
        target: 'http://192.168.108.209:8082',// 要代理的API地址
        ws: true,//是否允许跨域
        changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
        pathRewrite: {//這裡理解成用'/api'代替target裡面的地址，後面組件中我們掉接口時直接用api代替
          //比如我要調用'http://www.abc.com/user/add'，直接寫'/api/user/add'即可'
          '^/api': ''//重写路径--匹配 /api ，然后变为''
        }
      }
    }
  }
}

