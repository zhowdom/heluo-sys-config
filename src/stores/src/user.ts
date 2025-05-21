import { defineStore } from "pinia";
import { login } from '@/apis'
import {ref} from 'vue'

export const useUserStore = defineStore("user", () => {

  const userInfo = ref({
    userId: '',
    nickName: '',
    accesstoken: ''
  })

  const userLogin = async (params) => {
    const res = await login(params)
    const {accesstoken, nickName, userId} = res?.data?.data
    userInfo.value = {
      accesstoken,
      nickName,
      userId
    }
  }

  const clearUserInfo = () => {
    userInfo.value = {
      userId: '',
      nickName: '',
      accesstoken: ''
    }
  }

  return {
    userInfo,
    clearUserInfo,
    userLogin
  }
}, {
  persist: {
    // paths: ['userInfo'] // will build error
    pick: ['userInfo']
  }
}
)
