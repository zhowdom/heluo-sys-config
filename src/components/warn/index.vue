<script setup lang="ts">
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-warn')
import {useLoadMoreWarn, useInfiniteScroll} from '@/hooks'
import WarnItem from '@/components/warnItem/index.vue'
import { storeToRefs } from 'pinia'
import {useWarnTypeStore, useGlobalVisibleControllerStore} from '@/stores'
import {onMounted} from 'vue'
import Loading from '@/components/loading/index.vue'
defineProps({
  name: {
    type: String,
    default: ''
  }
})
const {loadMoreWarn, warnListArr, clickWraper, isloadingRequest, curWarnMenuActivedIdx} = useLoadMoreWarn()
const warnTypeStore = useWarnTypeStore()
const {warnTypeArr, currenntChoosedWarnCode, } = storeToRefs(warnTypeStore)
const globalVisibleControllerStore = useGlobalVisibleControllerStore()
const {globalVisiblePool} = storeToRefs(globalVisibleControllerStore)
const { containerRef, isLoadedAllData } = useInfiniteScroll(loadMoreWarn);
onMounted(() => {
  clickWraper(currenntChoosedWarnCode.value, true, 0)
})
</script>

<template>
   <div :class="[bem(), 'animate__animated animate__faster', globalVisiblePool.warn.state ? 'animate__fadeInDown' : 'animate__fadeOutDown']">
    <div :class="bem('type-box')">
      <ul>
        <li v-for="(item, idx) in warnTypeArr" :class="[curWarnMenuActivedIdx === idx ? 'cur' : '']" :key="idx" @click="clickWraper(item.typeCode, true, idx)">{{item.typeName}}</li>
      </ul>
    </div>

    <div :class="bem('show-list')" ref="containerRef">
      <div :class="bem('show-item')" v-for="(item, index) in warnListArr" :key="index">
        <WarnItem :warnInfos="item" />
      </div>
      <div :class="[bem('loading-info-state'), 'flex-center']">
        <Loading v-if="isloadingRequest" />
        <p v-if="warnListArr?.length === 0 && !isloadingRequest">暂无数据～</p>
        <p v-else-if="isLoadedAllData && !isloadingRequest">已加载完全部~</p>
      </div>
    </div>
  </div>
  <div :class="bem('mask-layer')" @click="globalVisiblePool.warn.state = !globalVisiblePool.warn.state"></div>
</template>

<style scoped lang="less">
.heluo-sys-warn{
  height:860px;
  width:550px;
  background: rgba(31, 37, 42,.9);
  border-radius: 0px 0px 0px 0px;
  position: absolute;
  top:50px;
  right:20px;
  padding: 12px;
  z-index: 999;
  &__type-box{
    ul{
      display: flex;
      gap: 2px;
      justify-content: space-between;
      li{
        height: 36px;
        width:72px;
        color: #fff;
        line-height:36px;
        text-align:center;
        background: linear-gradient( 180deg, rgba(50,141,129,0.8) 26%, rgba(18,24,30,0) 100%);
        font-size: 14px;
        cursor:pointer;
        &.cur{
          background: linear-gradient( 180deg, #FFC85D 0%, rgba(254,201,98,0.3) 100%);
          font-weight: bold;
        }
      }
    }
  }
  &__show-list{
    overflow-y: scroll;
    margin-top: 12px;
    height: 810px;
  }
  &__loading-info-state{
    // height: inherit;
    margin-top:20px;
    color: #66c2ac;
    p{
      padding: 20px 0;
    }
  }
  &__mask-layer{
    position: fixed;
    top:0;
    left: 0;
    right:0;
    bottom: 0;
    z-index: 1;
    opacity: 0;
  }
}
</style>
