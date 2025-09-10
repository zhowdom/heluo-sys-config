import {setAttributeValApi} from '@/apis'

interface SetAttributeParams {
  deviceId: string;
  attributeCode: string;
  value: string;
}

export function useSetAttribute () {
  const save = async (params: SetAttributeParams) => {
    await setAttributeValApi(params)
  }
  return {
    save
  }
}