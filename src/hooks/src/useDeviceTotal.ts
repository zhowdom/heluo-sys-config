import { deviceStatisticApi } from '@/apis'
import {ref} from 'vue'

export function useDeviceTotalInfos() {
  const deviceTotalInfos = ref({
    totalCount: 0,
    runningRate: 0,
    onlineCount: 0,
    offlineCount: 0,
    failureCount: 0,
    wranCount: 0
  })
  const getData = async () => {
    try {
      const res = await deviceStatisticApi()
      deviceTotalInfos.value = {
        totalCount: res?.data?.data?.totalCount,
        runningRate: parseFloat(res?.data?.data?.exceptionRate?.match(/\d+\.?\d*/)[0]), //?
        onlineCount: res?.data?.data?.exceptionCount, //?
        offlineCount: res?.data?.data?.offlineCount,
        failureCount: res?.data?.data?.failureCount,
        wranCount: res?.data?.data?.exceptionCount, //?
      }
    } catch(e) {
      console.log(e)
    }
  }
  
  return {
    deviceTotalInfos,
    getData
  }
}