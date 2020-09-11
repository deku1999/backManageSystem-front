import request from './index'
//获取商品
export function getGood({query, pagenum ,pagesize}) {
    return request({
        url: '/getgoods',
        params: {
            query,
            pagenum,
            pagesize
        }
    })
}
//删除商品
export function deleteGood(id) {
    return request({
        url: '/deletegoods',
        params: {
            id
        }
    })
}
//添加商品
export function addgood({name,price,weight,imgurl,time}) {
    return request({
        url: '/addgood',
        params: {
            name,
            price,
            weight,
            imgurl,
            time
        }
    })
}