<template>
    <div class="box-wrap">
      <div class="top flex-between">
        <div class="l">
          <CaretDownOutlined />
          <CaretUpOutlined v-show="false" />
          <span class="state"></span>
          <span>101室内</span>
        </div>
        <div class="r flex-between">
          <switchbtn :checked="false" :idx="1" /><span class="label">送风阀开启</span>
        </div>
      </div>

      <div class="btm">
        <div class="each">
          <p>通风柜-TC001</p>
          <span class="status">正常运行</span>
        </div>
      </div>
    </div>
</template>
  
<script setup lang='ts'>
  import switchbtn from '../switchbtn/index.vue'
</script>
  
<style scoped lang="less">
  .box-wrap{
    .top{
      height: 46px;
      padding: 0 15px;
      background: rgba(66,100,105,0.2);
      margin-bottom: 20px;
    }
    .r{
      span.label{
        margin-left: 10px;
      }
    }
    .l{
      .state{
        height:10px;
        width: 10px;
        display: inline-block;
        background: #73e7a8;
        border-radius: 100%;
        margin: 0 10px;
      }
    }
    .btm{
      .each{
        width: 210px;
        height: 68px;
        padding: 12px;
        box-sizing: border-box;
        background: linear-gradient( 90deg, rgba(105,149,141,0.5) 0%, rgba(0,129,185,0.1) 100%);
        border-radius: 4px 4px 4px 4px;
        border: 1px solid;
        border-image: linear-gradient(42deg, rgba(126, 200, 253, 0.3), rgba(202, 240, 238, 1), rgba(126, 184, 253, 0.3)) 1 1;
        .status{
          width: 60px;
          height: 18px;
          background: rgba(50,234,162,0.2);
          border-radius: 2px 2px 2px 2px;
          display: inline-block;
          padding: 3px 6px;
          line-height: 18px;
        }
      }
    }
  }
</style>