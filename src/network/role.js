import request from './index'
// 添加角色
export function addRole(info) {
    return request({
        method: 'post',
        url: '/addrole',
        data: {
            name: info.name,
            desc: info.desc
        }
    })
}
//获取所有角色信息
export function getRole() {
    return request({
        url: '/getrole'
    })
}
//编辑角色信息
export function editRole({name, desc,id}) {
    return request( {
        url: '/editrole',
        method: 'post',
        data: {
            name,
            desc,
            id
        }
    })
}
// 删除角色信息
export function deleteRole(id) {
    return request({
        url: '/deleterole',
        params: {
            id
        }
    })
}
// 获得所有权限列表
export function getPermissionTree() {
    return request({
        url: '/pertree'
    })
}
// 分配权限清单
export function editPermissionTree(id,treelist) {
    return request({
        url: '/editpertree',
        params: {
            id,
            treelist
        }
    })
}
