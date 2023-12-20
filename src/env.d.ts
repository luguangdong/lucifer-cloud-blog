/// <reference types="vite/client" />

declare module '*.vue' {
    import type {DefineComponent} from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}

interface ImportMetaEnv {
    // 更多环境变量...
    readonly VITE_ENV: string

    readonly VITE_APP_PORT: string
    readonly VITE_APP_BASE_URL: string
    readonly VITE_APP_API_URL: string
    readonly VITE_APP_IMG_URL: string
    readonly VITE_APP_IMG_UPLOAD_URL: string


    readonly VITE_APP_OAUTH_ISSUER: string

    readonly VITE_APP_PKCE_CLIENT_ID: string
    readonly VITE_APP_OAUTH_CLIENT_ID: string
    readonly VITE_APP_PKCE_REDIRECT_URI: string
    readonly VITE_APP_OAUTH_REDIRECT_URI: string
    readonly VITE_APP_OAUTH_CLIENT_SECRET: string
    readonly VITE_APP_ARTICLE_URL: string
    readonly VITE_APP_ARTICLE_OAUTH_REDIRECT_URI: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

interface CSSProperties {
    [key: `--${string}`]: string
}
