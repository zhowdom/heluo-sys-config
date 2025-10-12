var GLOBAL = {
  /* 项目自定义配置在这里 */
  userName: 'Appid-25009-001', // [北方：Appid-25009-001|Abc123@#] | [测试（设备控制无数据, 房间有数据）：Appid-20025-009|Abc123@#] / [？（设备控制有数据）：appid-2024-sdhk|ukZburTc@]/
  password: 'Abc123@#',
  Host: 'https://api.helotus.cn/',
  sysName: '科研建筑智慧运营平台',
  imgURL: 'https://api.helotus.cn/api/object/getimage/?name=',
  sysList: [
    {
      name: '新⻛系统',
      code: 'IAS'
    },
    {
      name: '排⻛系统',
      code: 'EAF'
    },
    {
      name: '通⻛系统',
      code: 'ExhaustFan'
    },
    {
      name: '智能空调',
      code: 'AirConditioner'
    },
  ],
  professionList: [
    {
      major: '建筑',
      param: 'jianzhu',
      state: true
    },
    {
      major: '家具',
      param: 'jiaju',
      state: true
    },
    {
      major: '新风',
      param: 'xinfeng',
      state: true
    },
    {
      major: '排风',
      param: 'paifeng',
      state: true
    },
    {
      major: '给排水',
      param: 'jipaishui',
      state: true
    },
    {
      major: '仪器',
      param: 'yiqi',
      state: true
    },
    {
      major: '物联',
      param: 'wulian',
      state: true
    }
  ]
}