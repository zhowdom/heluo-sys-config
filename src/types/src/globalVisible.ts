export interface IVisibleControllerOption {
  // 要显隐的模块名称
  name: string
  // 显隐
  state?: any
}

export enum VisiblePoolEnu {
  // 警告弹窗显隐
  WARN = 'warn',
  // 专业面板显隐
  PROFESSION = 'profession',
  // 首页左右两side面板显隐
  HOME_TWO_PANNEL = 'home_two_pannel',
  // 记录底部菜单按钮的选中激活状态区分
  FLOAT_MENU_STATE= 'float_menu_state'
}
export interface IVisibleItem {
  state: boolean|number
}
export type IVisiblePool = {
  [key in VisiblePoolEnu]: IVisibleItem;
}