import {post, get} from '@/utils';

enum Api {
  login = 'api/account/loginapi', // 用户登录
  commoncard = 'api/bi/DeviceStatusOther', // 智能空调、新风系统、通风接口、排风接口、实验室余风接口
  devicesituation = 'api/bim/getCardData', // 设备态势接口
  floorlist = 'api/iot/devicetype/floorlist', // 楼层列表
  floorlisttodevice = 'api/iot/deviceType/list', // 对应楼层设备列表
  getweather = 'openapi/system/getLocalWeather', // 天气接口
  warntype = 'api/digital/getAlarmTypeCount', // 报警分类统计
  warnlist = 'api/digital/getAlarmList', // 分类对应报警信息

  introduction = 'api/iot/space/GetSpaceCategory', // 获取实验室图文介绍
  deviceStatistic = '/api/iot/device/statusCountList', // 设备统计
  getDeviceTypeList = 'api/bim/getDeviceTypeList', // 全部设备分类集合
  getSpaceList = 'api/bim/getSpaceList', // 全部空间集合
  getDeviceList = 'api/bim/getDeviceList', // 点击搜索查询

  // 首页右侧-安全态势
  home_safe_situation = 'api/bim/getCardData',
  // 环境
  getSpaceInfo  = 'api/digital/GetSpaceInfo', // 监测顶部的数据详情信息 --- ？貌似没用吗？
  // getSpaceInfo_new = 'api/iot/device/datainfo',
  getSpaceInfo_new = 'api/iot/space/environmentData',
  roomList = 'api/iot/space/roomList', // 实验室101、102、103
  sencedevice = 'api/iot/device/list', // 传感器1、2、3
  getAllEnvDataLog = 'api/ems/getAllEnvDataLog',  // 温度、湿度曲线数据
  getEnvironmentData = 'api/iot/space/environmentData' // 温度、湿度曲线数据
  
}


export const login = (data) => post(Api.login, data)
export const commoncardApi = (data) => post(Api.commoncard, data)
export const devicesituationApi = (data) => post(Api.devicesituation, data)
export const floorlistApi = () => post(Api.floorlist)
export const warnTypeApi = (data) => post(Api.warntype, data)
export const warnlistApi = (data) => post(Api.warnlist, data)
export const getweatherApi = () => get(Api.getweather)
export const floorlisttodeviceApi = (data) => post(Api.floorlisttodevice, data)

// period 2
export const introductionApi = () => post(Api.introduction)
export const deviceStatisticApi = () => post(Api.deviceStatistic)
export const getDeviceTypeListApi = (data) => post(Api.getDeviceTypeList, data)
export const getSpaceListApi = (data) => post(Api.getSpaceList, data)
export const getDeviceListApi = (data) => post(Api.getDeviceList, data)

// period 3
export const home_safe_situationApi = (data) => post(Api.home_safe_situation, data)
export const roomListApi = (data) => post(Api.roomList, data)
export const getSpaceInfoApi = (data) => post(Api.getSpaceInfo, data)
// export const getSpaceInfoApi_new = (data) => post(Api.getSpaceInfo_new, data)
export const getSpaceInfoApi_new = (data) => post(Api.getSpaceInfo_new, data)
export const sencedeviceApi = (data) => post(Api.sencedevice, data)
export const getAllEnvDataLogApi = (data) => post(Api.getAllEnvDataLog, data)
export const getEnvironmentDataApi = (data) => post(Api.getEnvironmentData, data)
