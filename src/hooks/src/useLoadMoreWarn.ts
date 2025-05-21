import { warnlistApi } from '@/apis'
import { IWarnInfos } from '@/types'
import {ref} from 'vue'
import {useWarnTypeStore} from '@/stores'
import { storeToRefs } from 'pinia'
import {rnd} from '@/utils'

export function useLoadMoreWarn() {
  const curWarnMenuActivedIdx = ref(0)
  const warnTypeStore = useWarnTypeStore()
  const {currenntChoosedWarnCode} = storeToRefs(warnTypeStore)
  const isloadingRequest = ref(false)
  const warnListArr = ref<IWarnInfos[]>()
  let currentPage = ref(1)
  const loadMoreWarn = async (loadMore?:boolean) => {
    isloadingRequest.value = true
    const totalPage = ref(1)
    const rowCount = ref(0)

    if (loadMore) {
      currentPage.value = 1
      warnListArr.value = []
    }

    const param = {
      pageIndex: currentPage.value,
      pageLength: 100000,
      type: currenntChoosedWarnCode.value
    }
    console.log(param, 'param')
    try {
      let res = await warnlistApi(param);
      console.log(res, 'warn000')
      warnListArr.value = res.data.data || []
      // currentPage.value = res.data.currentPage // 接口currentPage返回错误，此处没有用这个做分页逻辑
      totalPage.value = res.data.totalPage
      rowCount.value = res.data.rowCount
      currentPage.value++
      console.log(currentPage.value, 'currentPage.value')
      setTimeout(() => {
        isloadingRequest.value = false
      }, rnd(1,5) * 200)
      return currentPage.value < totalPage.value
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(() => {
        isloadingRequest.value = false
      }, rnd(1,5) * 200)
    }
  }
  const clickWraper = (typeCode:string, loadMore:boolean, idx:number) => {
    currenntChoosedWarnCode.value = typeCode
    curWarnMenuActivedIdx.value = idx
    // loadMore是否刷新操作[当前页重置为1]
    loadMoreWarn(loadMore)
  }
  
  return {
    warnListArr,
    isloadingRequest,
    curWarnMenuActivedIdx,
    clickWraper,
    loadMoreWarn
  }
}