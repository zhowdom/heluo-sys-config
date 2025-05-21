<script setup lang="ts">
import { createNamespace, autoImg } from '@/utils'
const { bem } = createNamespace('heluo-sys-device')
import cardtitle from '@/components/cardtitle/index.vue'
// import Loading from '@/components/loading/index.vue'
import {IDeviceType} from '@/types'
defineProps<{
  floorToDeviceList: IDeviceType[];
  loading: Boolean
}>();
</script>

<template>
   <div :class="[bem(), 'card-bg-com']">
    <cardtitle name="设备" />
    <div :class="bem('main')">
      <!-- <Loading v-if="loading" /> -->
      <div v-for="(item, idx) in floorToDeviceList" :key="idx" :class="bem('each')">
        <img :src="autoImg(item.typeCode, 'device')" />
        <p>{{item.typeName}}</p>
        <span>{{item.typeCount}}</span>
      </div>
    </div>
   </div>
</template>

<style scoped lang="less">
.heluo-sys-device{
  width:280px;
  border-radius: 4px;
  &__main{
    padding: 10px 5px;
    overflow-y:scroll;
    height:350px;
  }
  &__each{
    display: flex;
    align-items: center;    
    width: 100%;           
    gap: 8px;
    cursor:pointer;
    padding:5px 0;
    &:hover{
      background: linear-gradient( 270deg, rgba(11,123,138,0.6) 0%, #13D6F0 100%);
      border-radius: 4px;
    }
    &:last-child{
      margin-bottom:0;
    }
    img{
      height:32px;
      width:32px;
      flex: 0 0 auto;        /* 不伸缩不收缩，保持固定尺寸 */
      object-fit: contain;   /* 保持图片比例 */
    }
    span{
      width: 50px;
      height: 32px;
      flex: 0 0 auto;        /* 固定尺寸 */
      display: flex;
      align-items: center;
      justify-content: center;
    }
    p{
      flex: 1 1 auto;        /* 占据剩余空间 */
      min-width: 0;          /* 允许内容截断 */
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 16px;
    }
  }
}
</style>
