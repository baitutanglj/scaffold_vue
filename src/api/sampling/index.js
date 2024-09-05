import request from '@/utils/request'
export function samListen(url,data) {
    //return了一个promise对象
    return request({
        url:url,
        method: 'get',
        params: data,
    })
}
