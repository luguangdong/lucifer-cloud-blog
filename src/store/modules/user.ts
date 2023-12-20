import {store} from '@/store'
import {defineStore} from 'pinia'
import {User} from '@/api/user/type'
import {userInfo} from '@/api/user'

export interface UserState {
    state: string
    token: string
    info: User.Info
    detail: User.Detail
    opacity: number
}

const useUserStore = defineStore({
    id: 'app-user',
    state: (): UserState => {
        return {
            // 登录成功返回的用户信息
            state: '',
            token: '',
            // 用户详细信息
            info: {} as User.Info,
            detail: {} as User.Detail,
            opacity: 0.1,
        }
    },
    getters: {
        getToken: (userState: UserState): string => userState.token,
        getState: (userState: UserState): string => userState.state,
    },
    actions: {
        setToken(token: string) {
            this.token = token
        },
        setState(state: string) {
            this.state = state
        },
        async getInfoDetail() {
            let res = await userInfo()
            res.data.user_info.tel = String(res.data.user_info.tel)
            res.data.user_info.qq = String(res.data.user_info.qq)
            this.info = res.data.user_info
            this.detail = res.data.user_detail
        },
    },
    //开启持久化
    persist: {
        enabled: true,
    },
})

const useUserStoreWithOut = () => {
    // store.use(piniaPersist)
    return useUserStore(store)
}

export {useUserStore, useUserStoreWithOut}
