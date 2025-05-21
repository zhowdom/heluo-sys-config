import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const router = useRouter()
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
    router.push({
      name: 'home',
      query: {},
    })
  }
  return {
    doLogin
  }
}