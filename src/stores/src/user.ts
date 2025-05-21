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
    // @ts-ignore
    console.log(GLOBAL, 'GLOBAL---这里就可以读取全局配置化文件信息了, 但是这是最简单的方式。config.js配置文件和index.html同级目录')
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
