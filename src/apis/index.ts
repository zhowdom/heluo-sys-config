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
}


export const login = (data) => post(Api.login, data)
export const commoncardApi = (data) => post(Api.commoncard, data)
export const devicesituationApi = (data) => post(Api.devicesituation, data)
export const floorlistApi = () => post(Api.floorlist)
export const warnTypeApi = (data) => post(Api.warntype, data)
export const warnlistApi = (data) => post(Api.warnlist, data)
export const getweatherApi = () => get(Api.getweather)
export const floorlisttodeviceApi = (data) => post(Api.floorlisttodevice, data)