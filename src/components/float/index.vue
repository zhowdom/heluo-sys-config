<script setup lang="ts">
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-float-menu')
import {UeReportType, EnuMenusIds} from '@/types'
import {useUeConnect} from '@/hooks'
import { useRouter, useRoute } from 'vue-router'
import {watchEffect, ref} from 'vue'
import {useGlobalVisibleControllerStore} from '@/stores'
const router = useRouter()
const route = useRoute()
const {ueConnect} = useUeConnect()
const globalVisibleControllerStore = useGlobalVisibleControllerStore()
const curClickMenuid = ref(1)
const handleToHome = () => {
  curClickMenuid.value = 1
  router.push({
    name: 'home',
    query: {},
  })
  globalVisibleControllerStore.globalControlVisible({name: 'home_two_pannel', state: true})
  ueConnect(UeReportType.FLOAT_MENU_HOME, { opt: '首页' })
}
const isLayerPath = ref(false)
watchEffect(() => {
  isLayerPath.value = route.path.includes('/layer')
})
const handleManYou = () => {
  curClickMenuid.value = 3
}
const handleQuWei = () => {
  curClickMenuid.value = 2
  globalVisibleControllerStore.globalControlVisible({name: 'home_two_pannel', state: false})
}
</script>

<template>
   <div :class="[bem(), 'flex-center']">

    <div class="each">
      <img v-if="curClickMenuid === EnuMenusIds.HOME" src="@assets/usedimg/home-1.png" @click="handleToHome()" />
      <img v-else src="@assets/usedimg/home-0.png" @click="handleToHome()" />
      <div class="txt" :class="{'cur': curClickMenuid === EnuMenusIds.HOME}">首页</div>
    </div>

    <div class="each" v-if="isLayerPath">
      <img v-if="curClickMenuid === EnuMenusIds.MAN_YOU" src="@assets/usedimg/manyou-1.png" @click="handleManYou()" />
      <img v-else src="@assets/usedimg/manyou-0.png" @click="handleManYou()" />
      <div class="txt" :class="{'cur': curClickMenuid === EnuMenusIds.MAN_YOU}">漫游</div>
    </div>
    <div class="each" v-else>
      <img v-if="curClickMenuid === EnuMenusIds.QU_WEI" src="@assets/usedimg/quwei-1.png" @click="handleQuWei()" />
      <img v-else src="@assets/usedimg/quwei-0.png" @click="handleQuWei()" />
      <div class="txt" :class="{'cur': curClickMenuid === EnuMenusIds.QU_WEI}">区位</div>
    </div>

   </div>
</template>

<style scoped lang="less">
.heluo-sys-float-menu{
  width: 180px;
  height: 106px;
  position: absolute;
  bottom: 26px;
  margin-left: -90px;
  left: 50%;
  z-index: 200;
  .each{
    width: 72px;
    img{
      width: 72px;
      height: 84px;
    }
    .txt{
      font-size: 14px;
      text-align: center;
      &.cur{
        color: #5fc2a5;
      }
    }
  }

}
</style>
