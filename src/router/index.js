import VueRouter from 'vue-router'
import Vue from 'vue'
const login = () => import('views/login/login')
const Home = () => import('views/home/home')
const Error = () => import('components/404/error')
const User = () => import('views/home/components/user')
const Roles = () => import('views/home/components/roles')
const Rights = () => import('views/home/components/rights')
const Welcome = () => import('views/home/components/welcome')
const goodList = () => import('views/goods/goodList')
const order = () => import('views/orders/order')
const report = () => import('views/reports/report')
const addGoods = () => import('views/goods/addGoods')
//解决路由重复点击问题
const originalPush = VueRouter.prototype.push		
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: login,
        meta: {
            title: '电商后台管理系统'
        }
    },
    {
        path: '/home',
        component: Home,
        meta: {
            title: '首页'
        },
        children: [
            {
                path: 'users',
                component: User,
                meta: {
                    title: '用户管理'
                }
            },
            {
                path: 'roles',
                component: Roles,
                meta: {
                    title: '角色列表'
                }
            },
            {
                path: 'rights',
                component: Rights,
                meta: {
                    title: '权限列表'
                }
            },
            {   
                path: 'welcome',
                component: Welcome,
                meta: {
                    title: '首页'
                }
            },
            {
                path: 'goods',
                component: goodList,
                meta: {
                    title: '商品列表'
                },
            },
            {
                path: 'goods/add',
                component: addGoods,
                meta: {
                    title: '添加商品'
                }
            },
            {
                path: 'orders',
                component: order,
                meta: {
                    title: '订单列表'
                }
            },
            {
                path: 'reports',
                component: report,
                meta: {
                    title: '数据报表'
                }
            },
            {
                path: '/',
                redirect: 'welcome'
            }
        ]
    },
    {
        path: '*',
        component: Error,
        meta: {
            title: '404界面'
        }
    }
]
const router = new VueRouter({
    routes,
    mode: 'history'
})
router.beforeEach((to,from,next) => {
    window.document.title = to.meta.title
    var token = window.sessionStorage.getItem('token')
    if(to.path==='/login') {
        if(token) {
            next('/home')
        }else {
            next()
        }
    }else {
        if(to.path==='/home/welcome') {
            if(token) {
                window.sessionStorage.removeItem('path')
                next()
            }else{
                next('/login')
            }
        }
        else {
            if(token){
                next()
            }
            else {
            next('/login')
            }
        }
    }
})
export default router