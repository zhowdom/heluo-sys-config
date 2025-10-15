import { defineStore } from "pinia";
import {ref} from 'vue'
import {IVisibleControllerOption, IVisiblePool} from '@/types'

export const useGlobalVisibleControllerStore = defineStore("globalVisibleController", () => {
  const globalVisiblePool = ref<IVisiblePool>({
    warn: { state: false },
    profession: { state: true },
    home_two_pannel: { state: true },
    manyou_two_pannel: { state: true },
    office_dialog: { state: false },
    float_menu_state: {
      state: 1
    }
  })
  
  const globalControlVisible = (opt:IVisibleControllerOption) => {
    if (opt.state === '' || opt.state === undefined) {
      globalVisiblePool.value[opt.name].state = !globalVisiblePool.value[opt.name].state
    } else {
      globalVisiblePool.value[opt.name].state = opt.state
    }
  }

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
