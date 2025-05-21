import { getweatherApi } from '@/apis'
import { IWeatherData } from '@/types'
import {ref} from 'vue'

export function useWeather() {
  const weatherInfos = ref<IWeatherData>()
  
  const getWeatherData = async () => {
    const res = await getweatherApi()
    weatherInfos.value = res?.data?.data
  }
  
  return {
    weatherInfos,
    getWeatherData
  }
}