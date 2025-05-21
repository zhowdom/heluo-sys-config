import { defineStore } from "pinia";
import {ref} from 'vue'
import {IVisibleControllerOption, IVisiblePool} from '@/types'

export const useGlobalVisibleControllerStore = defineStore("globalVisibleController", () => {
  const globalVisiblePool = ref<IVisiblePool>({
    warn: { state: false },
    profession: { state: true },
    home_two_pannel: { state: true }
  })

  // 通用型显隐面板、弹窗方法
  const globalControlVisible = (opt:IVisibleControllerOption) => {
    console.log(opt, '通用型显隐面板、弹窗方法')
    // 如果是空或者undefined, 就状态取反
    if (opt.state === '' || opt.state === undefined) {
      globalVisiblePool.value[opt.name].state = !globalVisiblePool.value[opt.name].state
    } else {
      // 传了具体的state值，就按外部传的状态来控制
      globalVisiblePool.value[opt.name].state = opt.state
    }
  }

  // 更改首页两侧数据面板的收起和展开
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
