import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import ModifyPassword from '@/views/common/ModifyPassword';
import OidcCallback from '@/views/oidc/callback.vue';
import OidcCallbackError from '@/views/oidc/callbackError.vue';
import SilentRenew from '@/views/oidc/silentRenew.vue';
import Logout from '@/views/common/Logout.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            redirect:"/missionlist",
            meta: {
                requiresAuth: true,
                role:["管理员", "编辑"]
            },
            children: [
                {
                    name: "missionlist",
                    path: "/missionlist",
                    component: () => import('@/views/mission/index'),
                    meta: {
                        requiresAuth: true,
                        role:["管理员", "编辑"]
                    },
                },
                {
                    name: "accountlist",
                    path: "/accountlist",
                    component: () => import('@/views/account/index'),
                    meta: {
                        requiresAuth: true,
                        role:["管理员"]
                    },
                },
                // 新增任务详情页
                {
                    name: "detail",
                    path: "/detail/:id",
                    props: true,
                    component: () => import('@/views/detail/index'),
                    meta: {
                        requiresAuth: true,
                        role:["管理员"]
                    },
                },
            ]
        },
        {
            path: '/suppliers',
            name: 'suppliers',
            component: Home,
            meta: {
                requiresAuth: true,
                role:["管理员", "编辑"]
            },
            children: [
                {
                    name: "suppliersList",
                    path: "",
                    component: () => import('@/views/suppliers/index'),
                    meta: {
                        requiresAuth: true,
                        role:["管理员", "编辑"]
                    },
                },
                {
                    name: "supplierWriters",
                    path: "/suppliers/:supplierId/writers",
                    component: () => import('@/views/suppliers/writers'),
                    meta: {
                        requiresAuth: true,
                        role:["管理员", "编辑"]
                    },
                },
                       // 业务统计
                       {
                        name: "achivement", 
                        path: "/suppliers/achivement",
                        component: () => import('@/views/suppliers/achivement'),
                        meta: {
                            requiresAuth: true,
                            role:["管理员"]
                        },
                    },
            ]
        },
        {
            path: '/callback',
            name: 'oidcCallback',
            component: OidcCallback,
            meta: {
                isPublic: true,
                role:["管理员", "编辑", "写手"]
            }
        },
        {
            path: '/callback-error',
            name: 'oidcCallbackError',
            component: OidcCallbackError,
            meta: {
                isPublic: true,
                role:["管理员",  "编辑", "写手"]
            }
        },
        {
            path: '/silent-renew',
            name: 'silentRenew',
            component: SilentRenew,
            meta: {
                isPublic: true,
                role:["管理员",  "编辑", "写手"]
            }
        },
        {
            path: '/logout',
            name: 'logout',
            component: Logout,
            meta: {
                isPublic: true,
                role:["管理员",  "编辑", "写手"]
            }
        },
        {
            name: 'modifypassword',
            path: '/mpassword',
            component: ModifyPassword,
            meta: {
                isPublic: true,
                role:["管理员",  "编辑", "写手"]
            }
        },
        { path: '*', redirect: '/' }

    ]
})
