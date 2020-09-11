import request from './index'
//获取权限列表
export function getPermission() {
    return request({
        url: '/menus'
    })
}
//获取用户信息
export function getUserInfo({query,pagenum,pagesize}) {
    return request({
        url: '/users',
        params: {
            query,
            pagenum,    //当前页码
            pagesize    //每页显示条数
        }
    })
}
//修改用户状态
export function changeState(username,state) {
    return request({
        url: '/change',
        params: {
            name: username,
            state
        }
    })
}
//添加用户
export function addUser({name, password, email ,mobile, state='true',role='超级管理员'}) {
    return request({
        url: '/adduser',
        method: 'post',
        data: {
            name,
            password,
            email,
            mobile,
            state,
            role
        }
    })
}
//编辑用户
export function editUser({email, mobile,name}) {
    return request({
        url: '/edituser',
        method: 'post',
        data: {
            name,
            email,
            mobile
        }
    })
}
//删除用户
export function deleteUser(name) {
    return request({
        url: '/deleteuser',
        params: {
            name
        }
    })
}
//权限列表
export function permissionList({pagenum ,pagesize}) {
    return request({
        url: '/perlist',
        params: {
            pagenum,
            pagesize
        }
    })
}
// 分配新角色
export function allotRole(name, newRole) {
    return request({
        url: '/allotrole',
        params: {
            name,
            newRole
        }
    })
}
