import { defineStore } from "pinia";
import {ref} from 'vue'
import {IVisibleControllerOption, IVisiblePool} from '@/types'

export const useGlobalVisibleControllerStore = defineStore("globalVisibleController", () => {
  const globalVisiblePool = ref<IVisiblePool>({
    warn: { state: false },
    profession: { state: true }, // 预留整个专业面板的显隐[目前没用到]
    home_two_pannel: { state: true }, // 首页、机电、环境、安防等页面左右两侧显隐状态
    manyou_two_pannel: { state: true }, // 漫游页面左右两侧显隐状态
    office_dialog: { state: false },
    float_menu_state: { // 用来区分整个底部菜单按钮的激活选中状态
      state: 1
    }
  })
  
  // 通用型显隐面板、弹窗方法
  const globalControlVisible = (opt:IVisibleControllerOption) => {
    // 如果是空或者undefined, 就状态取反
    if (opt.state === '' || opt.state === undefined) {
      globalVisiblePool.value[opt.name].state = !globalVisiblePool.value[opt.name].state
    } else {
      // 传了具体的state值，就按外部传的状态来控制
      globalVisiblePool.value[opt.name].state = opt.state
    }
  }

  /**
   * 
   * @description 更改首页两侧数据面板的收起和展开--UE定义的函数名字，此处包装一下
   */
  const SwitchFoldOnlyTwoSide = (state:boolean) => {
    globalControlVisible({name: 'home_two_pannel', state})
  }

  return {
    globalVisiblePool,
    globalControlVisible,
    SwitchFoldOnlyTwoSide
  }
}
)
