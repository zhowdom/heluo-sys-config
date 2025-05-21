// useInfiniteScroll.ts
import { onMounted, onUnmounted, ref, Ref } from 'vue';
import {InfiniteScrollOptions} from '@/types'

export function useInfiniteScroll(
  loadMore: () => Promise<boolean> | boolean,
  options: InfiniteScrollOptions = {}
) {
  const { threshold = 50, immediate = false } = options;
  // 当滚动到底部时触发loading
  const isLoadingIfReachedBottom: Ref<boolean> = ref(false);
  // 是否加载完全部数据
  const isLoadedAllData: Ref<boolean> = ref(false);
  const containerRef: Ref<HTMLElement | null> = ref(null);

  const checkScroll = async () => {
    if (isLoadingIfReachedBottom.value || isLoadedAllData.value || !containerRef.value) return;
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.value;
    const isBottom = scrollTop + clientHeight >= scrollHeight - threshold;
    
    if (isBottom) {
      isLoadingIfReachedBottom.value = true;
      try {
        const hasMore = await loadMore();
        isLoadedAllData.value = !hasMore;
      } finally {
        isLoadingIfReachedBottom.value = false;
      }
    }
  };

  const handleScroll = () => {
    if (!isLoadingIfReachedBottom.value) {
      checkScroll();
    }
  };

  onMounted(() => {
    if (containerRef.value) {
      containerRef.value.addEventListener('scroll', handleScroll);
      if (immediate) {
        checkScroll();
      }
    }
  });

  onUnmounted(() => {
    if (containerRef.value) {
      containerRef.value.removeEventListener('scroll', handleScroll);
    }
  });

  return {
    containerRef,
    isLoadingIfReachedBottom,
    isLoadedAllData,
    reset: () => {
      isLoadedAllData.value = false;
    },
    refresh: () => {
      isLoadedAllData.value = false;
      checkScroll();
    }
  };
}