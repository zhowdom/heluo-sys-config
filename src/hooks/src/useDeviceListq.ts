import { getDeviceTypeListApi, getSpaceListApi, getDeviceListApi } from '@/apis'
import {ref} from 'vue'
import {useUeConnect} from '@/hooks'
import {UeReportType} from '@/types'

export function useDeviceListInfos() {
  const comParams = {pageType: "ELE"}
  const allDeviceList = ref([])
  const allSpaceList = ref([])
  const queryResultList = ref([])

  const curTypeId = ref<number|string>('')
  const curSpaceId = ref<number|string>('')
  const searchKey = ref('')
  const {ueConnect} = useUeConnect()

  const getAllDeviceListData = async () => {
    try {
      // 先默认查询“全部设备”
      const res = await getDeviceTypeListApi(comParams)
      const _tem_allDeviceList = (res?.data?.data || [])
      _tem_allDeviceList.unshift({
        typeName: '全部设备',
        typeId: '',
      })
      allDeviceList.value = _tem_allDeviceList
      getAllSpaceListData()
      queryResultListData('', '')
    } catch(e) {
      console.log(e)
    }
  }

  const getAllSpaceListData = async () => {
    const res = await getSpaceListApi(Object.assign({}, {typeId: curTypeId.value}, comParams))
    const _tem_allSpaceList = (res?.data?.data || [])
    _tem_allSpaceList.unshift({
        spaceName: '全部空间',
        spaceId: '',
      })
    allSpaceList.value = _tem_allSpaceList
  }

  const queryResultListData = async (curTypeId, curSpaceId) => {
    const _params = {
      pageIndex: 0,
      pageLength: 100000,
      ...comParams,
      searchKey: searchKey.value,
      spaceId: curSpaceId,
      typeId: curTypeId
    }
    const res = await getDeviceListApi(_params)
    queryResultList.value = res?.data?.data || []
  }

  const handleTypeClick = async (id) => {
    curTypeId.value = id  
    curSpaceId.value = ''
    await getAllSpaceListData()
    queryResultListData(curTypeId.value, curSpaceId.value)
  }
  const handleSpaceClick = (id) => {
    curSpaceId.value = id
    queryResultListData(curTypeId.value, curSpaceId.value)
  }

  const handleLocation = (deviceCode:string) => {
    ueConnect(UeReportType.LOCATION, { opt: deviceCode })
  }
  
  return {
    allDeviceList,
    allSpaceList,
    queryResultList,
    getAllDeviceListData,
    getAllSpaceListData,
    queryResultListData,
    handleTypeClick,
    handleSpaceClick,
    handleLocation,
    curSpaceId,
    curTypeId,
    searchKey
  }
}