import { defineStore } from "pinia";
import { warnTypeApi } from '@/apis'
import { IWarnType } from '@/types'
import {ref} from 'vue'

export const useWarnTypeStore = defineStore("warnType", () => {

  const warnTypeArr = ref<IWarnType[]>([{
    count: 0,
    percent: 0,
    typeCode: '',
    typeName: ''
  }])
  const allWarnCount = ref(0)
  const currenntChoosedWarnCode = ref('')

  const getWarnType = async () => {
    let res = await warnTypeApi({processStatus: 2});
    (res.data.data.list || []).unshift({
      count: res.data.data.totalCount,
      percent: 0,
      typeCode: '',
      typeName: '全部预警'
    })
    warnTypeArr.value = res.data.data.list
    allWarnCount.value = res.data.data.totalCount
    currenntChoosedWarnCode.value = res.data.data.list[0]['typeCode']
  }

  return {
    warnTypeArr,
    allWarnCount,
    currenntChoosedWarnCode,
    getWarnType
  }
}, {
  persist: {
    pick: ['warnTypeArr', 'allWarnCount', 'currenntChoosedWarnCode']
  }
}
)
