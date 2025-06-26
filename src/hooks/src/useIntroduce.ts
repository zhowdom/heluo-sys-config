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
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = res?.data?.data?.[0]['introduction']
      introduceInfos.value = {
        image: res?.data?.data?.[0]['image'],
        introduction: tempDiv.textContent || tempDiv.innerText,
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