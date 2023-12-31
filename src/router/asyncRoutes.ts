import {RouteRecordRaw} from 'vue-router'

const asyncRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: '首页',
        },
        redirect: '/homePage',
        component: () => import('@/views/home/index.vue'),
        children: [
            {
                path: 'homePage',
                name: 'HomePage',
                component: () => import('@/views/home/components/home/index.vue'),
            },
            // 图片展示
            {
                path: 'images',
                name: 'Images',
                meta: {
                    title: '图片',
                    // roles: ['admin'],
                },
                component: () => import('@/views/images/index.vue'),
            },
            {
                path: 'article',
                name: 'Article',
                meta: {
                    title: '文章',
                },
                component: () => import('@/views/article/index.vue'),
            },
            // 用户
            {
                path: 'user',
                name: 'User',
                meta: {
                    title: '用户',
                    // roles: ['admin'],
                },
                component: () => import('@/views/user/index.vue'),
            },
            {
                path: 'timeAxis',
                name: 'TimeAxis',
                meta: {
                    title: '时间轴',
                },
                component: () => import('@/views/timeAxis/index.vue'),
            },
        ],
    },
    {
        path: '/admin',
        name: 'Admin',
        meta: {
            title: '管理后台',
            roles: ['admin'],
        },
        component: () => import('@/views/admin/index.vue'),
    },
    {
        path: '/editor',
        name: 'Editor',
        meta: {
            title: '富文本编辑',
            // roles: ['admin'],
        },
        component: () => import('@/views/editor/index.vue'),
    },
    {
        path: '/blog',
        name: 'Blog',
        meta: {
            title: '博客',
            // roles: ['admin'],
        },
        component: () => import('@/views/blog/index.vue'),
    },
    {
        path: '/upload',
        name: 'Upload',
        meta: {
            title: '图片上传',
            // roles: ['admin'],
        },
        component: () => import('@/views/upload/index.vue'),
    },
    // 发布作品
    {
        path: '/publish',
        name: 'Publish',
        meta: {
            title: '发布作品',
            // roles: ['admin'],
        },
        component: () => import('@/views/publish/index.vue'),
    },
    {
        path: '/detail',
        name: 'Detail',
        meta: {
            title: '图片详情',
            // roles: ['admin'],
        },
        component: () => import('@/views/imagesDetail/index.vue'),
    },
    {
        path: '/articleDetail',
        name: 'ArticleDetail',
        meta: {
            title: '文章详情',
            // roles: ['admin'],
        },
        component: () => import('@/views/articleDetail/index.vue'),
    },
    {
        path: '/userDetail',
        name: 'UserDetail',
        meta: {
            title: '用户详情，',
        },
        component: () => import('@/views/userDetail/index.vue'),
    },
]

export {asyncRoutes}
