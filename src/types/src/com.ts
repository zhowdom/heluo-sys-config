export enum CardTypeEnum {
  /**
   * 智能空调
   */
  airconditional = 'SAC',
  /**
   * 新风系统
   */
  newwind = 'CombinedAir',
  /**
   * 通风系统
   */
  ventilate = 'VTS',
  /**
   * 排风系统
   */
  exhaust = 'EAF',
  /**
   * 实验室余风监测
   */
  remainwind = 'VOC',
}

 export enum CardTypeNames {
  /**
   * 智能空调
   */
  airconditional = '智能空调',
  /**
   * 新风系统
   */
  newwind = '新风系统',
  /**
   * 通风系统
   */
  ventilate = '通风系统',
  /**
   * 排风系统
   */
  exhaust = '排风系统',
  /**
   * 实验室余风监测
   */
  remainwind = '实验室余风监测',
  /**
   * 设备态势
   */
  devicesituation = '设备态势'
}

export interface ICardCommonInfos {
  // 通用卡片的信息展示字段
  // 总数
  all?: number
  // 报警
  fault?: number
  // 运行
  running?: number
  // 停止
  stopped?: number

  // 设备态势的信息展示字段
  // 接入设备
  exceptionCount?: number
  // 运行设备
  runingCount?: number
  // 故障设备
  offlineCount?: number
  // 警告设备
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

// 报警分类
export interface IWarnType {
  count: number
  percent: number
  typeCode: string
  typeName: string
}
// 具体报警信息
export interface IWarnInfos {
  // 报警主要描述
  alarmDesc: string
  // 报警时间
  alarmTime: string
  // 报警设备
  deviceIdName: string
  // 报警点位
  processTypeName: string
  // 报警状态
  processStatusName: string
  // 所属系统
  deviceIdSystemIdName: string
  // 所属位置
  spaceIdName: string
  // 设备编码
  spaceIdNumber: string
  // 报警ID
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
// UE与前端交互的触发事件列别
export enum UeReportType {
  /**
   * 悬浮菜单角度
   */
  FLOAT_DIRECTION = 'float_direction',
  /**
   * 悬浮菜单首页Home
   */
  FLOAT_MENU_HOME = 'float_menu_home',
  /**
   * 天气[无需参数]
   */
  WEATHER = 'weather',
  /**
   * 报警列表每一项
   */
  WARN_ITEM = 'warn_item',
  /**
   * 设备列表[定位-暂时不需要]
   */
  DEVICE_ITEM = 'device_item',
  /**
   * 专业面板每一项
   */
  PROFESSION = 'profession',
  /**
   * 楼层
   */
  FLOOR = 'floor',
}
// UE与店端通讯传递的对应类别参数名
export enum UeReportParams {
  /**
   * 悬浮菜单角度
   */
  float_direction = '点击角度',
  /**
   * 悬浮菜单首页Home
   */
  float_menu_home = '点击菜单栏',
  /**
   * 天气
   */
  weather = '天气控制',
  /**
   * 报警列表每一项
   */
  warn_item = '报警',
  /**
   * 设备列表
   */
  device_item = '定位',
  /**
   * 专业面板每一项
   */
  profession = '设备显隐',
  /**
   * 楼层
   */
  floor = '楼层抽屉',
}

export interface IProfession {
  /**
   * 专业面板每一项major的中文字符
   */ 
  major: string;
  /**
   * 专业面板更改专业勾选state状态参数
   */
  param: string;
  /**
   * 专业面板每一项开启状态
   */
  state: boolean;
}