<script setup lang="ts">
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-profession')
import {useProfession} from '@/hooks'
import cardtitle from '@/components/cardtitle/index.vue'
import switchbtn from '@/components/switchbtn/index.vue'
import {UeReportType, IProfession} from '@/types'
import {useUeConnect} from '@/hooks'
const {ueConnect} = useUeConnect()
const {professionList, alterProfessionList} = useProfession()
const clickWrap = (item:IProfession, idx:number) => {
  alterProfessionList(idx)
  ueConnect(UeReportType.PROFESSION, {
    opt: JSON.stringify({
      major: item.major,
      state: item.state
    })
  })
}
</script>

<template>
   <div :class="[bem(), 'card-bg-com']">
    <cardtitle name="专业" />
    <ul>
      <li v-for="(item, idx) in professionList" :key="idx" class="flex-between" @click="clickWrap(item, idx)">
        <span>{{item.major}}</span>
        <span :class="bem('opacity0')">{{item.state}}</span>
        <switchbtn :checked="item.state" :idx="idx" />
      </li>
    </ul>
   </div>
</template>

<style scoped lang="less">
.heluo-sys-profession{
  width: 170px;
  border-radius: 4px 4px 4px 4px;
  margin-right: 16px;
  ul{
    padding: 10px 16px;
    height:350px;
    display: flex; 
    flex-direction: column;
    li{
      flex: 1; 
      display: flex; 
      align-items: center;
      cursor: pointer;
      &:hover{
        font-weight: bold;
      }
      position: relative;
    }
  }
  &__opacity0{
    opacity: 0;
    position: absolute;
    top:10px;
    right:0;
    width: 60px;
    height: 30px;
    z-index: 20;
  }
}
</style>
