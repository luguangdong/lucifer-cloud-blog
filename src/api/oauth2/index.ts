import { base64Str } from '@/utils/pkce'
import {oauth2http} from "@/utils/http";

/**
 * 从认证服务获取AccessToken
 * @param data 获取token入参
 * @returns 返回AccessToken对象
 */
export const getToken = (data: any) => {
    const headers: any = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    if (data.client_secret) {
        // 设置客户端的basic认证
        headers.Authorization = `Basic ${base64Str(`${data.client_id}:${data.client_secret}`)}`
        // 移除入参中的key
        delete data.client_id
        delete data.client_secret
    }
    return oauth2http.request<any>(
        {
            url: '/oauth2/token',
            method: 'post',
            data,
            headers
        },
        {
            withToken: false,
        },
    )
}




