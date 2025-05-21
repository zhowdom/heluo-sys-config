import { commoncardApi, devicesituationApi } from '@/apis'
import { CardTypeEnum,ICardCommonInfos } from '@/types'
import {ref} from 'vue'

export function useCard(name:string) {
  const cardInfos = ref<ICardCommonInfos>({
    all: 0,
    running: 0,
    stopped: 0,
    fault: 0,
    exceptionCount: 0,
    runingCount: 0,
    offlineCount: 0,
    failureCount: 0
  })
  let params = {}
  let curApi = null
  if (name === 'devicesituation') {
    params = {
      cardCode: 'equipment_situation'
    }
    curApi = devicesituationApi
  } else {
    params = {
      spaceId: '',
      systemCode: CardTypeEnum[name],
      typeCode: CardTypeEnum[name],
    }
    if (name === 'newwind' || name === 'exhaust') {
      Reflect.deleteProperty(params, 'systemCode')
    } else {
      Reflect.deleteProperty(params, 'typeCode')
    }
    curApi = commoncardApi
  }
  const getCardData = async () => {
    try {
      const res = await curApi(params)
      cardInfos.value = res.data.data
    } catch(e) {
      console.log(e)
    }
  }
  
  return {
    cardInfos,
    getCardData
  }
}