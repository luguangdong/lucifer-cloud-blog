import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios'
import {AxiosOptions, RequestOptions, Result} from './types'
import {useUserStoreWithOut} from "@/store/modules/user";
import {router} from "@/router";

class Http {
    private axiosInstance: AxiosInstance
    private readonly options: AxiosOptions

    constructor(options: AxiosOptions) {
        this.options = options
        this.axiosInstance = axios.create(options)
    }

    public request<T = any>(axiosRequestConfig: AxiosRequestConfig, opt?: RequestOptions): Promise<Result<T>> {
        // transform before request
        const {
            transform,
            requestOptions,
        } = this.options

        const {
            beforeRequestHook,
            transformRequestData,
            requestCatch,
        } = transform

        const options: RequestOptions = {...requestOptions, ...opt}

        if (beforeRequestHook) {
            axiosRequestConfig = beforeRequestHook(axiosRequestConfig, options)
        }

        return new Promise((resolve, reject) => {
            // ------------------------前置拦截操作--------------------------------
            const userStore = useUserStoreWithOut()
            const token = JSON.parse(userStore.token);
            //console.log("access_token="+token.access_token)
            this.axiosInstance.interceptors.request.use(
                (config: InternalAxiosRequestConfig) => {
                    //全局请求拦截里面加token，当存在token而且url不是认证地址需要添加请求头,否则跳转认证服务器
                    if (token && config.url !== '/oauth2/token') {
                        config.headers!.Authorization = `${token.token_type} ${token.access_token}`;
                    }
                    return config;
                },
                (err: any) => {
                    // 请求错误，这里可以用全局提示框进行提示
                    return Promise.reject(err);
                }
            );

            // ------------------------request请求操作--------------------------------
            this.axiosInstance
                .request<any, AxiosResponse<Result>>(axiosRequestConfig)
                .then(
                    (res: AxiosResponse<Result>) => {
                        if (transformRequestData) {
                            res = transformRequestData(res, options)
                        }

                        if (res.data.code === 1) {
                            reject(res.data.msg)
                        }

                        if (res.data.code === 0) {
                            resolve(res.data as unknown as Promise<Result<T>>)
                        }
                    },
                )
                .catch((err) => {
                    if (requestCatch) {
                        err = requestCatch(err, options)
                    }

                    reject(err)
                });

            // ------------------------后置返回拦截操作--------------------------------
            this.axiosInstance.interceptors.response.use(
                (res: AxiosResponse<Result>) => {
                    return res;
                },
                (err: any) => {
                    if (err.code === 'ERR_NETWORK') {
                        return Promise.reject(err);
                    }
                    let messageText = "";
                    switch (err.response.status) {
                        case 400:
                            messageText = "请求参数错误(400)";
                            break;
                        case 401:
                            messageText = "未授权，请重新登录(401)";
                            // 这里可以做清空storage并跳转到登录页的操作
                            router.push({
                                path: '/oauth2',
                                query: {
                                    grant_type: 'refresh_token'
                                },
                            })
                            break;
                        case 403:
                            messageText = "拒绝访问(403)";
                            break;
                        case 404:
                            messageText = "请求路径出错(404)";
                            break;
                        case 408:
                            messageText = "请求超时(408)";
                            break;
                        case 500:
                            messageText = "服务器错误(500)";
                            break;
                        case 501:
                            messageText = "服务未实现(501)";
                            break;
                        case 502:
                            messageText = "网络错误(502)";
                            break;
                        case 503:
                            messageText = "服务不可用(503)";
                            break;
                        case 504:
                            messageText = "网络超时(504)";
                            break;
                        case 505:
                            messageText = "HTTP版本不受支持(505)";
                            break;
                        default:
                            messageText = `连接出错(${err.response.status})!`;
                    }
                    err.response.statusText = messageText
                    return Promise.reject(err.response);
                }
            );
        })
    }
}

export {
    Http,
}