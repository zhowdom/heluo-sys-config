import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

export function useLogin() {
  const params = {
    // @ts-ignore
    password: GLOBAL.password,
    // @ts-ignore
    userName: GLOBAL.userName
  }
  const doLogin = async () => {
    const userStore = useUserStore()
    userStore.userLogin(params)
    const router = useRouter()
    console.log(router, 'router')
    router.push({
      name: 'home',
      query: {},
    })
  }
  return {
    doLogin
  }
}