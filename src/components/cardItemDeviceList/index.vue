<script setup lang="ts">
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-card-device-list')
import { onMounted } from 'vue'
import {useDeviceListInfos} from '@/hooks'
const { allDeviceList, allSpaceList, queryResultList, getAllDeviceListData, getAllSpaceListData, queryResultListData, handleTypeClick, handleSpaceClick, curTypeId, curSpaceId, searchKey } = useDeviceListInfos()
onMounted(() => {
  getAllDeviceListData()

})
</script>

<template>
   <div :class="[bem()]">
    <div class="com-block">
      <div :class="{'cur': curTypeId === item.typeId}" @click="handleTypeClick(item.typeId)" v-for="(item, index) in allDeviceList" :key="index" class="each flex-center txtellipsis">{{item.typeName}}</div>
    </div>
    <div class="com-block bdrt" style="margin-top:10px">
      <div :class="{'cur': curSpaceId === item.spaceId}" @click="handleSpaceClick(item.spaceId)" v-for="item in allSpaceList" :key="item.spaceId" class="each flex-center txtellipsis">{{item.spaceName}}</div>
    </div>

    <div :class="bem('search')">
      <input v-model="searchKey" placeholder="请输入设备名称" class="input" />
      <div class="btn flex-center" @click="queryResultListData(curTypeId, curSpaceId)">搜索</div>
    </div>

    <div :class="bem('result')">
      <div class="header">
        <div class="comsetw flex-between bg-header">
          <div class="cel1 cel">序号</div>
          <div class="cel2 cel">设备名称</div>
          <div class="cel3 cel">所属系统</div>
          <div class="cel4 cel">位置</div>
          <div class="cel5 cel">状态</div>
          <div class="cel6 cel">定位</div>
        </div>
      </div>
      <div class="main">
        <div v-for="(item, index) in queryResultList" :key="item.spaceId + Math.random()" class="comsetw flex-between bg-main">
          <div class="cel1 cel txtellipsis">{{index+1}}</div>
          <div class="cel2 cel txtellipsis">{{item.deviceName}}</div>
          <div class="cel3 cel txtellipsis">{{item.systemName}}</div>
          <div class="cel4 cel txtellipsis">{{item.spaceName}}</div>
          <div class="cel5 cel" :class="[item.statusName === '离线' ? 'off' : 'on']">{{item.statusName}}</div>
          <div class="cel6 cel">
            <img src="@/assets/usedimg/dw.png" />
          </div>
        </div>
      </div>
    </div>
   </div>
</template>

<style scoped lang="less">
.heluo-sys-card-device-list{
  height: 100%;
  width: 100%;
  padding: 0 8px;
  .com-block{
    height: 20%; /*174/860*/
    width: 100%;
    overflow-y: scroll;
    .each {
      height: 21.8%; /*38/174*/
      width: 110px;
      border-radius: 5px;
      font-size: 14px;
      background-image: url('@assets/usedimg/h1-d.png');
      background-repeat: no-repeat;
      background-position: center bottom;
      background-size: cover;
      cursor: pointer;
      border: 1px solid rgba(255,255,255,.3);
      float: left;
      margin-left: 16px;
      margin-top: 16px;
      &:hover,&.cur{
        background-image: url('@assets/usedimg/h1-d-cur.png');
      }
    }
  }
  .bdrt{
    border-top:1px solid rgba(94, 105, 106, .8);
  }

  &__search{
    height: 4%;
    width: 100%;
    position: relative;
    margin: 2% 0;
    .input{
      background: #000000FF;
      border-radius: 4px 0 0 4px;
      opacity: 0.4;
      height: 100%;
      width: 88%;
      overflow: hidden;
      padding: 0;
      border:none;
      color: #fff;
      text-indent: 10px;
    }
    .btn{
      width: 16%;
      height: 100%;
      background: linear-gradient( 180deg, #297063 0%, rgba(70,255,221,1) 100%);
      border-radius: 4px;
      position: absolute;
      top:0;
      right: 0;
      cursor: pointer;
      z-index: 10;

      font-size: 14px;
      color: #FFFFFF;
      &:hover{
        color: #e5be6a;
      }
    }
  }

  &__result{
    height: calc(100% - 4% - 20% - 20% - 50px);
    width:100%;
    margin:0 auto;
    .header{
      height: 8%;
    }
    .comsetw{
      height: 100%;
    }
    .main .comsetw{
      height: 10%;
    }
    .cel{
      font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
      font-weight: normal;
      font-size: 13px;
      color: #FFFFFF;
      text-align: center;
      font-weight: bold;
    }
    .main{
      height: 90%;
      overflow-y: scroll;
      .cel{
        font-weight: normal;
      }
    }
    .bg-main{
      margin-top: 4px;
      background-image: url('@assets/usedimg/bg-device-list.png');
      background-repeat: no-repeat;
      background-position: right top;
      background-size: contain;
      cursor: pointer;
      border-radius: 4px;
    }
    .bg-main:hover{
      background: rgba(26,226,190,0.3);
    }
    .bg-header{
      background: url('@assets/usedimg/pm@2x.png') no-repeat center / cover;
    }
    .main .comsetw .cel5{
      position: relative;
      &:before{
        content: '';
        width:6px;
        height: 6px;
        border-radius: 100%;
        display: inline-block;
        position: absolute;
        top:50%;
        left: -2px;
        margin-top:-3px
      }
    }
    .main .comsetw .cel5.on:before{background: #79FFE6FF;}
    .main .comsetw .cel5.off:before{background: #FF6F6FFF;}
    
    .cel1{
      width: 10%;
    }
    .cel5{
      width: 12%;
    }
    .cel6{
      width: 8%;
    }
    .cel2,.cel3,.cel4{
      width: calc((100% - 30%)/3);
    }
    .cel6 img{
      width: 14px;
      height: 16px;
    }
  }
}
</style>
