import {setAttributeValApi} from '@/apis'

interface SetAttributeParams {
  deviceId: string;
  attributeCode: string;
  value: string;
}

export function useSetAttribute () {
  const save = async (params: SetAttributeParams) => {
    console.log(params, 'jsjsjjs0000')
    const res = await setAttributeValApi(params)
    console.log(res, 'ok')
  }
  return {
    save
  }
}