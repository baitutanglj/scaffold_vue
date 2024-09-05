import axios from 'axios'
//配置请求的跟路径
// var baseURL = 'http://192.168.109.38:8082'
// var baseURL = 'http://192.168.108.188:8082'
var baseURL = 'http://192.168.108.209:8082'
const service = axios.create({
    baseURL: baseURL,
    timeout: 100000 // request timeout
})

service.interceptors.request.use(
    config => {

        return config
    },
    error => {
        // do something with request error
        // console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(

    response => {
        const res = response.data
        // console.log('resp:')
        // console.log(res)
        return res

        // if the custom code is not 200, it is judged as an error.
        //     if (res.code !== 200) {
        //         alert('!==200')
        //         return Promise.reject(res.message)
        //         // return Promise.reject(res.message || 'error')
        //     } else {
        //         return res.data
        //     }
    },
    error => {
        // console.log('err' + error) // for debug
        // let msg = error.message
        // console.log(msg);
        return Promise.reject(error)
    }
)

export default service
