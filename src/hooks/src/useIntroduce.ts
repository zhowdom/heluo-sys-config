import { introductionApi } from '@/apis'
import {ref} from 'vue'

export function useIntroduceInfos() {
  const introduceInfos = ref({
    image: '',
    introduction: ''
  })
  const getData = async () => {
    try {
      const res = await introductionApi()
      introduceInfos.value = {
        image: res?.data?.data?.[0]['image'],
        introduction: res?.data?.data?.[0]['introduction']
      }
    } catch(e) {
      console.log(e)
    }
  }
  
  return {
    introduceInfos,
    getData
  }
}