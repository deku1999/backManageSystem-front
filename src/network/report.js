import request from './index'
export function getReport() {
    return request({
        url: '/report'
    })
}