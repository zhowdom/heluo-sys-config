<template>
    <!--报警记录卡片组件-->
    <div :class="bem()">
      <div class="room">
        <p class="name">{{props?.infos?.spaceIdName}}<span class="desc">{{props.infos?.alarmDesc}}</span></p>
      </div>
      <div class="date">
        <span class="year">{{dayjs(props.infos?.alarmTime).format('YYYY/MM/DD')}}</span>
        <span class="hours">{{dayjs(props.infos?.alarmTime).format('HH:mm:ss')}}</span>
      </div>
      <span class="status">{{props?.infos?.processStatusName}}</span>
    </div>
</template>
  
<script setup lang='ts'>
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-warnlogcard')
import {defineProps} from 'vue'
import dayjs from 'dayjs';

const props = defineProps(['infos'])
</script>
  
<style scoped lang="less">
  .heluo-sys-warnlogcard{
    width: calc(100% - 30px);
    height: 72px;
    background: linear-gradient( 180deg, rgba(101,124,137,0.05) 0%, rgba(66,100,105,0.3) 100%);
    border-radius: 2px;
    color: #fff;
    font-size: 14px;
    padding: 11px 16px;
    box-sizing: border-box;
    position: relative;
    border-radius: 5px;
    margin: 0 auto;
    margin-bottom: 1vh;
    &::before{
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 100%;
      background: #FF6B57FF;
      display: inline-block;
      position: absolute;
      top:18px;
      left: 20px;
    }
    .desc{
      background: rgba(255,107,87,0.2);
      padding: 3px 5px;
      font-size: 12px;
      margin-left: 10px;
    }
    .name{
      text-indent: 20px;
    }
    .status{
      position: absolute;
      top:10px;
      right: 10px;
      color: #FF6B57FF;
      font-size: 15px;
      font-weight: 400;
    }
    .date{
      padding-top: 10px;
      .hours{
        padding-left: 10px;
      }
    }
  }
</style>