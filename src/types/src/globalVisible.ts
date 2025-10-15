export interface IVisibleControllerOption {
  name: string
  state?: any
}

export enum VisiblePoolEnu {
  WARN = 'warn',
  PROFESSION = 'profession',
  HOME_TWO_PANNEL = 'home_two_pannel',
  FLOAT_MENU_STATE= 'float_menu_state',
  MANYOU_TWO_PANNEL = 'manyou_two_pannel',
  OFFICE_DIALOG= 'office_dialog',
}
export interface IVisibleItem {
  state: boolean|number
}
export type IVisiblePool = {
  [key in VisiblePoolEnu]: IVisibleItem;
}