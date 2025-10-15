
import {useUserStore} from '@/stores'
import axios from 'axios';

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
    const {userInfo} = useUserStore()
    const token = userInfo.accesstoken
    if (token) {
      config.params = {
        ...config.params,
      }
      
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
