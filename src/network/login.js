import request from './index'
export function getLogin({username , password}) {
    return request({
        method: 'post',
        url: '/login',
        data: {
            username,
            password
        }
    })
}