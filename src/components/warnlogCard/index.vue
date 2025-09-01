<template>
    <!--报警记录卡片组件-->
    <div :class="bem()">
      <div class="room">
        <p class="name txtellipsis">{{props?.infos?.spaceIdName}}<span class="desc">{{props.infos?.alarmDesc}}</span></p>
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
    background: #203236;
    border-radius: 2px;
    color: #fff;
    font-size: 14px;
    padding: 11px 16px;
    box-sizing: border-box;
    position: relative;
    border-radius: 5px;
    margin: 1vh auto 1vh auto;
    cursor: pointer;
    &:hover{
      background: linear-gradient( 180deg, rgba(45,240,231,0) 0%, rgba(45,240,231,0.3) 100%);
      border-bottom: 1px solid #29E3BF;
    }
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
      border-radius: 3px;
    }
    .name{
      text-indent: 20px;
      max-width: 295px;
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