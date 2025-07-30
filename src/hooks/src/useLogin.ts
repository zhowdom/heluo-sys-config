import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import md5 from 'js-md5';

export function useLogin() {
  const params = {
    // @ts-ignore
    password: md5(GLOBAL.password),
    // @ts-ignore
    userName: GLOBAL.userName
  }
  const doLogin = async () => {
    const userStore = useUserStore()
    userStore.userLogin(params)
    const router = useRouter()
    router.push({
      name: 'home',
      query: {},
    })
  }
  return {
    doLogin
  }
}