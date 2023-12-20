import type {App} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import {constantRoutes} from './constanceRoutes'
import {createRouterGuards} from './routerGuards'

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
    strict: false,
})

const setupRoutes = (app: App) => {
    app.use(router)
    createRouterGuards(router)
}

export {
    router,
    setupRoutes,
}
