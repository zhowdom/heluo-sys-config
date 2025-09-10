import {IProfession} from '@/types'
import {ref} from 'vue'
export function useProfession() {
  // 专业面板数据
  // @ts-ignore
  const professionList = ref<IProfession[]>(GLOBAL.professionList)
  type ProfessionParams = typeof professionList.value[number]['param']
  type LayerState = {
    [key in ProfessionParams]: boolean
  }
  // 批量更改每一项专业按钮的开启、关闭状态
  const LayerChoose = (state: LayerState) => {
    professionList.value = professionList.value.map(item => {
      // 如果state中存在当前项的param作为key，则更新state，否则保持原state
      return {
        ...item,
        state: state[item.param] !== undefined ? state[item.param] : item.state
      }
    });
  }

  // 批量让所有专业按钮开启、关闭[目前只会是全部开启]
  const LayerHide = (state:boolean) => {
    professionList.value.forEach(item => item.state = state)
  }

  const alterProfessionList = (idx:number) => {
    professionList.value[idx]['state'] = !professionList.value[idx]['state']
  }
  
  return {
    professionList,
    alterProfessionList,
    LayerChoose,
    LayerHide
  }
}