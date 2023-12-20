import type {App} from 'vue'
import {createPinia} from 'pinia'
import piniaPluginPersis from 'pinia-plugin-persist'

const store = createPinia()
store.use(piniaPluginPersis)
// pinia 数据持久化
const setupStore = (app: App) => {
    app.use(store)
}

export {setupStore, store}
