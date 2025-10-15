import {IProfession} from '@/types'
import {ref} from 'vue'
export function useProfession() {
  // @ts-ignore
  const professionList = ref<IProfession[]>(GLOBAL.professionList)
  type ProfessionParams = typeof professionList.value[number]['param']
  type LayerState = {
    [key in ProfessionParams]: boolean
  }
  const LayerChoose = (state: LayerState) => {
    professionList.value = professionList.value.map(item => {
      return {
        ...item,
        state: state[item.param] !== undefined ? state[item.param] : item.state
      }
    });
  }

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