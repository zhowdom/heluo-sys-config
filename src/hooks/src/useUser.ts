import {ref} from 'vue'
export function useUser() {

  const initialh = ref('35px')
  const visible = ref(false)
  const handleMouseEnter = () => {
    visible.value = true
    initialh.value = '115px'
  }
  const handleMouseLeave = () => {
    visible.value = false
    initialh.value = '35px'
  }

  return {
    handleMouseEnter,
    handleMouseLeave,
    visible,
    initialh
  }
}