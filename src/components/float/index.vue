<script setup lang="ts">
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-float-menu')
import {UeReportType, EnuMenusIds} from '@/types'
import {useUeConnect} from '@/hooks'
import { useRouter, useRoute } from 'vue-router'
import {watchEffect, ref, computed} from 'vue'
import {useGlobalVisibleControllerStore} from '@/stores'
const router = useRouter()
const route = useRoute()
const {ueConnect} = useUeConnect()
const globalVisibleControllerStore = useGlobalVisibleControllerStore()
const handleToHome = () => {
  globalVisibleControllerStore.globalControlVisible({name: 'float_menu_state', state: 1})
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
  globalVisibleControllerStore.globalControlVisible({name: 'float_menu_state', state: 3})
  ueConnect(UeReportType.MAN_YOU)
}
const handleQuWei = () => {
  globalVisibleControllerStore.globalControlVisible({name: 'float_menu_state', state: 2})
  globalVisibleControllerStore.globalControlVisible({name: 'home_two_pannel', state: false})
  ueConnect(UeReportType.FLOAT_MENU_HOME, { opt: '区位' })
}
const curMenuActivedState = computed(() => globalVisibleControllerStore.globalVisiblePool.float_menu_state.state)
</script>

<template>
   <div :class="[bem(), 'flex-center']">
    <div class="each">
      <img v-if="curMenuActivedState === EnuMenusIds.HOME" src="@assets/usedimg/home-1.png" @click="handleToHome()" />
      <img v-else src="@assets/usedimg/home-0.png" @click="handleToHome()" />
      <div class="txt" :class="{'cur': curMenuActivedState === EnuMenusIds.HOME}">首页</div>
    </div>

    <div class="each" v-if="isLayerPath">
      <img v-if="curMenuActivedState === EnuMenusIds.MAN_YOU" src="@assets/usedimg/manyou-1.png" @click="handleManYou()" />
      <img v-else src="@assets/usedimg/manyou-0.png" @click="handleManYou()" />
      <div class="txt" :class="{'cur': curMenuActivedState === EnuMenusIds.MAN_YOU}">漫游</div>
    </div>
    <div class="each" v-else>
      <img v-if="curMenuActivedState === EnuMenusIds.QU_WEI" src="@assets/usedimg/quwei-1.png" @click="handleQuWei()" />
      <img v-else src="@assets/usedimg/quwei-0.png" @click="handleQuWei()" />
      <div class="txt" :class="{'cur': curMenuActivedState === EnuMenusIds.QU_WEI}">区位</div>
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
      cursor: pointer;
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
