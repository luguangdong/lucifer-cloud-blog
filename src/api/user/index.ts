import {http} from '@/utils/http'
import {User} from './type'

export const updateUserInfo = (data: User.UpdateUserInfo) => {
    return http.request(
        {
            url: '/users/update',
            method: 'POST',
            data,
        },
        {
            serializeParams: false,
        },
    )
}

export const userInfo = (params?: { uid?: number }) => {
    return http.request<User.UserInfo>(
        {
            url: '/users/info',
            method: 'GET',
            params,
        },
        {
            isShowSuccessMessage: false,
        },
    )
}

export const updatePassword = (params?: { password: string }) => {
    return http.request(
        {
            url: '/users/update/password',
            method: 'GET',
            params,
        },
    )
}

export const userDetail = (params?: { uid: number, page: number, limit: number }) => {
    return http.request<User.UserDetail>(
        {
            url: '/users/detail',
            method: 'GET',
            params,
        },
        {
            isShowSuccessMessage: false
        }
    )
}