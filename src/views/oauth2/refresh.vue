<script setup lang="ts">
import {getToken} from '@/api/oauth2'
import { useUserStoreWithOut} from '@/store/modules/user'

const userStore = useUserStoreWithOut();
let token = null;
if(userStore.token){
  token = JSON.parse(userStore.token);
  console.log("access_token"+token.access_token)
}
getToken({
  grant_type: 'refresh_token',
  refresh_token: token.refresh_token,
  client_id: import.meta.env.VITE_APP_OAUTH_CLIENT_ID,
  client_secret: import.meta.env.VITE_APP_OAUTH_CLIENT_SECRET
})
    .then((res: any) => {
      userStore.setToken(JSON.stringify(res));
    })
    .catch((e) => {
    })
</script>
