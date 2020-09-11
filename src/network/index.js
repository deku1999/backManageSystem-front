import axios from 'axios'
import {Message} from 'element-ui'
import Nprogress from 'nprogress'
const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000
})
//请求axios拦截器，为请求附带上token
instance.interceptors.request.use(config => {
    Nprogress.start()
    config.headers['Authorization'] = 'Bearer '+window.sessionStorage.getItem('token')
    return config
},err => {
    console.log(err)
})
//响应拦截，统一处理获取失败的情况
instance.interceptors.response.use(res => {
    let {data} = res
    if(data.code===200) {
        Nprogress.done()
        return res
    }else {
        if(data.code===-1) {
            let token = window.sessionStorage.getItem('token')
            if(token) {
                window.sessionStorage.clear()
                Message({
                    type: 'error',
                    message: data.message
                })
            }
        }
        else{
            Message.error(data.message)
        }
    }
},err => {
    let message = err.message || '请求失败'
    Message({
        message,
        type:'error',
        duration: 3000
    })
})
export default instance