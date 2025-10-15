<template>
  <div class="settimeout-box">
    <p class="label">{{attributes?.attributeName}}</p>
     <div class="btns flex-center">
      <div @click="handleBtns(idx, item)" v-for="(item, idx) in attributes?.options" :key="idx" :class="[idx === curIndexBtns ? 'cur' : '', 'btncom']">{{item?.optionName}}</div>
    </div>
  </div>
    
</template>
  
<script setup lang='ts'>
import {ref} from 'vue'
import {useSetAttribute} from './hook/useSetAttribute'
const props = defineProps(['attributes', 'attributeCode', 'deviceId', 'idx'])
const {save} = useSetAttribute()

const handleBtns = (idx, item) => {
  curIndexBtns.value = idx
  save({
      deviceId: props?.deviceId,
      attributeCode:props?.attributeCode,
      value: item?.optionValue
    })
}
const curIndexBtns = ref(props?.attributes?.options?.findIndex(v => v?.optionValue === props?.attributes?.realTimeValue?.value))
</script>
  
<style scoped lang="less">
.settimeout-box{
  color: #fff;
  font-size: 14px;
  padding: 0 13px;
  // height: 288px;
  box-sizing: border-box;
  p.label{
    padding-bottom: 10px;
    padding-left: 8px;
  }
  .btns{
    background: #1a2c2f;
    border-radius: 4px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-bottom: 10px;
    .btncom{
      flex: 1;
      cursor: pointer;
      &:hover{
        background: linear-gradient( 180deg, rgba(26,226,190,0.4) 0%, rgba(0,0,0,0.08) 49%, rgba(26,226,190,0.4) 100%);
        border-radius: 4px;
        border: 1px solid #1AE2BE;
        box-sizing: border-box;
      }
    }
    .cur{
      background: linear-gradient( 180deg, rgba(26,226,190,0.4) 0%, rgba(0,0,0,0.08) 49%, rgba(26,226,190,0.4) 100%);
      border-radius: 4px;
      border: 1px solid #1AE2BE;
    }
  }
  .btns4{
    background: #1a2c2f;
    border-radius: 4px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-bottom: 10px;
    .btncom4{
      flex: 1;
      cursor: pointer;
      &:hover{
        background: linear-gradient( 180deg, rgba(26,226,190,0.4) 0%, rgba(0,0,0,0.08) 49%, rgba(26,226,190,0.4) 100%);
      border-radius: 4px;
      border: 1px solid #1AE2BE;
      box-sizing: border-box;
      }
    }
    .cur{
      background: linear-gradient( 180deg, rgba(26,226,190,0.4) 0%, rgba(0,0,0,0.08) 49%, rgba(26,226,190,0.4) 100%);
      border-radius: 4px;
      border: 1px solid #1AE2BE;
    }
  }

}


.sub-title{
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: normal;
  font-size: 14px;
  color: #FFFFFF;
  line-height: 16px;
  margin-bottom: 10px;
  display: inline-block;
  padding-left: 8px;
}
.settimer{
  width: 368px;
  height: 30px;
  background: #1a2c2f;
  border-radius: 4px;
  line-height: 30px;
  text-align: center;
  margin: 0 auto;
  cursor: pointer;
  &:hover{
        background: linear-gradient( 180deg, rgba(26,226,190,0.4) 0%, rgba(0,0,0,0.08) 49%, rgba(26,226,190,0.4) 100%);
      border-radius: 4px;
      border: 1px solid #1AE2BE;
      box-sizing: border-box;
      }
}
</style>
<style>
/* 深度选择器，穿透scoped覆盖组件内部样式 */
.custom-modal .ant-modal-content {
  /* 背景色和透明度 */
  background-color: rgba(14, 40, 45, 0.8); /* #0e282d 透明度0.8 */
  
  /* 边框样式 */
  border: 1px solid #548e7e;
  
  /* 圆角 */
  border-radius: 5px;
}

/* 标题样式（可选，确保在深色背景上可见） */
.custom-modal .ant-modal-title {
  color: #fff; /* 白色文字与深色背景对比 */
}
.ant-modal .ant-modal-header {
  background: none; /* 白色文字与深色背景对比 */
}

/* 关闭按钮样式（可选） */
.custom-modal .ant-modal-close-icon{
  color: #fff; /* 白色关闭图标 */
}

/* 内容区域文字颜色（可选） */
.custom-modal .ant-modal-body {
  color: #fff;
}
.custom-modal .ant-modal .ant-modal-close, .custom-modal .ant-modal .ant-modal-close:hover{
  color: #fff;
}
</style>