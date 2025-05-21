import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

export function useLogin() {
  const params = {
    password: 'Id8BGFJg',
    userName: 'appid-22009-001'
  }
  const router = useRouter()
  const doLogin = async () => {
    const userStore = useUserStore()
    console.log('s', userStore.userLogin)
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