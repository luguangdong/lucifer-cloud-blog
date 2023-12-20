<script setup lang="ts">
import {router} from '@/router'
import {getToken} from '@/api/oauth2'
import {createDiscreteApi} from 'naive-ui'
import {generateCodeVerifier} from '@/utils/pkce'
import {getQueryString} from '@/utils/key'
import {useUserStoreWithOut} from '@/store/modules/user'
import {env} from "@/utils/env";

const userStore = useUserStoreWithOut()
const token = userStore.getToken
if (token) {
  router.push({path: '/'})
} else {
  const {message} = createDiscreteApi(['message'])

  // 生成state
  let state: string = generateCodeVerifier()

  // 获取地址栏授权码
  const code = getQueryString('code')

  if (code) {
    // 从缓存中获取 codeVerifier
    //const state = userStore.getState;
    const state = getQueryString('state')
    // 校验state，防止cors
    const urlState = getQueryString('state')
    if (urlState !== state) {
      message.warning('state校验失败.')
    } else {
      // 从缓存中获取 codeVerifier
      getToken({
        grant_type: 'authorization_code',
        client_id: env.VITE_APP_OAUTH_CLIENT_ID,
        client_secret: env.VITE_APP_OAUTH_CLIENT_SECRET,
        redirect_uri: env.VITE_APP_OAUTH_REDIRECT_URI,
        code,
        state
      })
          .then((res: any) => {
            userStore.setToken(JSON.stringify(res))
            router.push({ path: '/' })
          })
          .catch((e) => {
            message.warning(`请求token失败：${e}`)
          })
    }
  } else {
    // 缓存state
    userStore.setState(state)
    window.location.href = `${env.VITE_APP_OAUTH_ISSUER}/oauth2/authorize?client_id=${env.VITE_APP_OAUTH_CLIENT_ID}&response_type=code&scope=openid%20profile%20message.read%20message.write&redirect_uri=${env.VITE_APP_OAUTH_REDIRECT_URI}&state=${state}`
  }
}
</script>
