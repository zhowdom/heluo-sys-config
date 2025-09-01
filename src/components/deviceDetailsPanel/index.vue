<template>
    <div :class="bem()">
      <div class="l">
        <img :src="infos?.imgUrl || 'https://gimg3.baidu.com/topone/src=https%3A%2F%2Fbkimg.cdn.bcebos.com%2Fsmart%2Fa686c9177f3e6709c93d56d9459f883df8dcd100ffc7-bkimg-process%2Cv_1%2Crw_1%2Crh_1%2Cmaxl_800%2Cpad_1%3Fx-bce-process%3Dimage%2Fresize%2Cm_pad%2Cw_348%2Ch_348%2Ccolor_ffffff&amp;refer=http%3A%2F%2Fwww.baidu.com&amp;app=2011&amp;size=w931&amp;n=0&amp;g=0n&amp;er=404&amp;q=75&amp;fmt=auto&amp;maxorilen2heic=2000000?sec=1755795600&amp;t=d1694394435fe82ac021f5f88807187d'" />
      </div>
      <div class="r">
        <p class="name">{{infos?.name}}</p>
        <p>编号： {{infos?.code}}</p>
      </div>
    </div>
</template>
  
<script setup lang='ts'>
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-deviceDetailsPanel')
const props = defineProps(['infos'])
</script>
  
<style scoped lang="less">
  .heluo-sys-deviceDetailsPanel{
    background: #233539;
    padding: 12px;
    width: 368px;
    height: 88px;
    display: flex;
    align-items: center;
    color: #b4bbbc;
    box-sizing: border-box;
    margin-left: 15px;
    border-radius: 3px;
    .l{
      height: 60px;
      width: 60px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .r{
      padding-left: 15px;
      .name{
        padding-bottom: 10px;
        color: #fff;
      }
    }
  }
</style>