import { floorlistApi, floorlisttodeviceApi } from '@/apis'
import {IFloor, IDeviceType} from '@/types'
import {ref, Ref} from 'vue'
import { useRouter } from 'vue-router'
import {rnd} from '@/utils'

export function useFloor(path:string, spaceId:string) {
  const floorData: Ref<IFloor[]> = ref<IFloor[]>([])
  const currentIndex = ref(0)

  const floorToDeviceList = ref<IDeviceType[]>()
  const router = useRouter()
  const getFloorlisttodeviceLoading = ref(false)

  const getFloorData = async (spaceId:string) => {
    const res = await floorlistApi()
    floorData.value = res?.data?.data || []
    path === 'layer' && getFloorlisttodevice(spaceId)
  }

  const formatFloor = (str:string) => str.replace(/F0?(\d{1,2})/, '$1F')

  const getFloorlisttodevice = async (spaceId) => {
    
    if (path === 'layer') {
      getFloorlisttodeviceLoading.value = true
      const param = {
        findCount: true,
        spaceId
      }
      try {
        const res = await floorlisttodeviceApi(param)
        floorToDeviceList.value = res?.data?.data || []
      } catch (e) {
        setTimeout(() => {
          getFloorlisttodeviceLoading.value = false
        }, rnd(1, 5) * 200)
        console.log(e)
      } finally {
        setTimeout(() => {
          getFloorlisttodeviceLoading.value = false
        }, rnd(1, 5) * 200)
      }
    } else {
      router.push({
        name: 'layer',
        params: {
          spaceId
        },
      })
    }
  }
  
  const initFloor = () => {
    const prevBtn = document.querySelector('.prev')
    const nextBtn = document.querySelector('.next')
    const floorList = document.querySelector('.scroll ul') as any
    const floorItems = floorList.querySelectorAll('.scroll li')
    // const itemHeight = 70 // 60px高度 + 10px间距
    const itemHeight = 50 // 40px高度 + 10px间距
    let currentIndex = 0
    const maxVisibleItems = Math.floor(340 / itemHeight) // 340px是滚动区域高度
    const maxIndex = floorItems.length - maxVisibleItems

    // choosed auto-matched item while init
    const floorActivatedIdx = floorData.value.findIndex(v => v.spaceId === spaceId)
    floorItems[floorActivatedIdx === -1 ? 0 : floorActivatedIdx].classList.add('cur');
    if (floorActivatedIdx >= 7 && path === 'layer') {
      scrollToIndex(1)
    }

    // update the btn state
    function updateButtonState() {
        prevBtn.classList.toggle('disabled', currentIndex <= 0);
        nextBtn.classList.toggle('disabled', currentIndex >= maxIndex);
    }

    function scrollToIndex(index) {
        if (index < 0) index = 0;
        if (index > maxIndex) index = maxIndex;
        
        floorList.style.transform = `translateY(-${index * itemHeight}px)`;
        currentIndex = index;
        updateButtonState();
    }

    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            scrollToIndex(currentIndex - 1);
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentIndex < maxIndex) {
            scrollToIndex(currentIndex + 1);
        }
    });

    // click the floor
    floorItems.forEach((item, index) => {
      item.addEventListener('click', function() {
        floorItems.forEach(li => li.classList.remove('cur'));
        this.classList.add('cur');
        let scrollIndex = currentIndex;
        
        // If the clicked floor lies ahead of the current viewport
        if (index < currentIndex) {
          scrollIndex = index;
        } 
        // If the clicked floor is after the current visible area
        else if (index >= currentIndex + maxVisibleItems) {
          scrollIndex = index - maxVisibleItems + 1;
        }
        
        scrollToIndex(scrollIndex);
      });
    });

  }

  return {
    floorData,
    currentIndex,
    floorToDeviceList,
    getFloorlisttodeviceLoading,
    formatFloor,
    getFloorData,
    initFloor,
    getFloorlisttodevice
  }
}