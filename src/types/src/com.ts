export enum CardTypeEnum {
  airconditional = 'SAC',
  newwind = 'CombinedAir',
  ventilate = 'VTS',
  exhaust = 'EAF',
  remainwind = 'VTS',
}

 export enum CardTypeNames {
  introduction = '项目简介',
  devicetotal = '设备总数',
  devicelist = '设备列表',
  airconditional = '智能空调',
  newwind = '新风系统',
  ventilate = '通风系统',
  exhaust = '排风系统',
  remainwind = '实验室余风监测',
  devicesituation = '设备态势'
}

export interface ICardCommonInfos {
  all?: number
  fault?: number
  running?: number
  stopped?: number
  exceptionCount?: number
  runingCount?: number
  offlineCount?: number
  failureCount?: number
}

export interface IFloor {
  fullParentId: string
  parentId: string
  spaceCode: string
  spaceId: string
  spaceName: string
  spaceType: string
}
export interface IWarnType {
  count: number
  percent: number
  typeCode: string
  typeName: string
}
export interface IWarnInfos {
  alarmDesc: string
  alarmTime: string
  deviceIdName: string
  processTypeName: string
  processStatusName: string
  deviceIdSystemIdName: string
  spaceIdName: string
  spaceIdNumber: string
  id: string
}

export interface IWeatherData {
  air: string;
  air_level: string;
  air_pm25: string;
  air_tips: string;
  city: string;
  date: string;
  humidity: string;
  tem: number;
  update_time: string;
  wea: string;
  wea_img: string;
  week: string;
}

export interface IDeviceType {
  typeCode: string;
  typeCount: number;
  typeId: string;
  typeName: string;
}

export interface InfiniteScrollOptions {
  /**
   * 距离底部多少像素触发加载
   * @default 50
   */
  threshold?: number;
  
  /**
   * 是否立即检查是否需要加载
   * @default false
   */
  immediate?: boolean;
}

export enum UeReportType {
  
  FLOAT_DIRECTION = 'float_direction',
  
  FLOAT_MENU_HOME = 'float_menu_home',
  
  MAN_YOU = 'man_you',
  
  WEATHER = 'weather',
  
  WARN_ITEM = 'warn_item',
  
  DEVICE_TYPE = 'device_type',
  
  PROFESSION = 'profession',
  
  FLOOR = 'floor',
  
  LOCATION = 'location',
  
  OFFICE_FIRST_DEVICELIST = 'office_first_device_list',
  
  OFFICE_FIRST_CLOSE = 'office_first_close',
  
  OFFICE_NEXT_CLOSE = 'office_next_close',
  
  FLOAT_MENU_ENVIRONMENT = 'float_menu_environment',
  
  FLOAT_MENU_ELECTRICITY = 'float_menu_electricity',
}

export enum UeReportParams {

  float_direction = '点击角度',

  man_you = '漫游',

  float_menu_home = '点击菜单栏',

  weather = '天气控制',

  warn_item = '报警',

  device_type = '设备类型',

  profession = '设备显隐',

  floor = '楼层抽屉',

  location = '定位',
  office_next_close = '房间设备',
  office_first_close = '楼层房间',
  office_first_device_list = '房间设备列表',
  float_menu_environment = '环境',
  float_menu_electricity = '机电',
}

export interface IProfession {
  major: string;
  param: string;
  state: boolean;
}
export enum EnuMenusIds {
  HOME = 1,
  QU_WEI = 2,
  MAN_YOU = 3,
  ENVIRONMENT = 5,
  SECURITY = 6,
  ELECTRICITY = 7,
  LAYER = 4
}
export interface IBeautyFoundation {
  // 数值+单位时候，数值
  attributeValue?: number;
  // 数值+单位时候，单位
  unitName?: string;
  // 副描述
  attributeName: string;
}

export enum  SysType {
  SmartAirConditioner = 0,  // 智能空调
  FreshAirSystem = 1,  // 新风系统
  ExhaustSystem = 2,   // 排风系统
  VentilationTerminal = 3   // 通风系统
}
export enum  SwiperPropsType {
  ShiYanShi = 0,  // 实验室101、102、103
  ChuanGanQi = 1,   // 传感器1、2、3
  WarnType = 2,  // 全部报警、设备报警、能耗报警
  DeviceType = 3,   // 智能空调、通风柜、净化机组
  Floor = 4, // 1楼、2楼、3楼
}

