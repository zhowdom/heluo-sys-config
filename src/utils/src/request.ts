
import {useUserStore} from '@/stores'
import axios from 'axios';


// const baseURL = 'https://api.helotus.cn/'
// const baseURL = import.meta.env.VITE_API_BASE_URL
// @ts-ignore
const baseURL = GLOBAL.Host
export const service = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

service.interceptors.request.use(
  (config) => {
    const {userInfo} = useUserStore() // can not put [use fn] outter
    const token = userInfo.accesstoken
    if (token) {
      // set in body
      config.params = {
        ...config.params,
        // token // or named `access_token`
      }
      
      // set in headers
      config.headers.Authorization = `Bearer ${token.trim()}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export function get(url: string, params = {}) {
  return service.get(url, { params });
}

export function post(url: string, data = {}) {
  return service.post(url, data);
}

export function put(url: string, data = {}) {
  return service.put(url, data);
}

export function del(url: string) {
  return service.delete(url);
}
