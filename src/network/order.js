import request from './index'
export function getOrders({query,pagenum, pagesize}) {
    return request({
        url: '/order',
        params: {
            query,
            pagenum,
            pagesize
        }
    })
}