<template>
    <!--测试各个组件静态展示-->
    <!-- <beautyFoundation
    :infos="testdata"
    :topType="1"
     /> -->
     <!-- <heluoSwiper /> -->
     <!-- <warnlogCard /> -->
     <!-- <devicePureTxtpanel /> -->
     <!-- <comSubTitle /> -->
      <!-- <oppositeAngleA /> -->
       <!-- <heluoSwiperPressure /> -->
        <!-- <heluoSwiperEnvironment /> -->
         <!-- <heluoSwiperSys /> -->
          <!-- <heluoSwiperDevice /> -->
           <!-- <newDeviceItem /> -->
            <!-- <homeTop3Square /> -->
             <!-- <sysStatus /> -->
              <!-- <heluoSwiperLinkroom /> -->
               <!-- <heluoSwiperDianwei /> -->
                <!-- <deviceDetailsPanel /> -->

                 <!-- <verticalCharts /> -->
                  <!-- <twoYEcharts /> -->
                   <!-- <horizontalCharts /> -->
                    <!-- <curlyLineCharts /> -->
                     <!-- <swiperEcharts /> -->
                      <!-- <settimeout /> -->
                       <extendAttrs />
</template>
  
<script setup lang='ts'>
  import beautyFoundation from '@/components/beautyFoundation/index.vue'
  import heluoSwiper from '@/components/heluoSwiper/index.vue'
  import warnlogCard from '@/components/warnlogCard/index.vue'
  import devicePureTxtpanel from '@/components/devicePureTxtpanel/index.vue'
  import comSubTitle from '@/components/comSubTitle/index.vue'
  import oppositeAngleA from '@/components/oppositeAngleA/index.vue'
  import heluoSwiperPressure from '@/components/heluoSwiperPressure/index.vue'
  import heluoSwiperEnvironment from '@/components/heluoSwiperEnvironment/index.vue'
  import heluoSwiperSys from '@/components/heluoSwiperSys/index.vue'
  import heluoSwiperDevice from '@/components/heluoSwiperDevice/index.vue'
  import newDeviceItem from '@/components/newDeviceItem/index.vue'
  import homeTop3Square from '@/components/homeTop3Square/index.vue'
  import sysStatus from '@/components/sysStatus/index.vue'
  import heluoSwiperLinkroom from '@/components/heluoSwiperLinkroom/index.vue'
  import heluoSwiperDianwei from '@/components/heluoSwiperDianwei/index.vue'
  import deviceDetailsPanel from '@/components/deviceDetailsPanel/index.vue'
  import verticalCharts from '@/components/verticalCharts/index.vue'
  import twoYEcharts from '@/components/twoYEcharts/index.vue'
  import horizontalCharts from '@/components/horizontalCharts/index.vue'
  import curlyLineCharts from '@/components/curlyLineCharts/index.vue'
  import swiperEcharts from '@/components/swiperEcharts/index.vue'
  import settimeout from '@/components/settimeout/index.vue'

  import extendAttrs from '@/components/extendAttrs/index.vue'

  import {ref} from 'vue'
  const testdata = ref({
      value: 1,
      unit: '%RH',
      subDesc: '回风湿度'
    })
</script>
  
<style>
  
</style>