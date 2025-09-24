
import { ref, onMounted, computed } from 'vue';

// 定义属性数据类型
interface Attribute {
  label: string;
  code: string;
  type: 0 | 1;
  disabled?: boolean;
  checked?: boolean;
}

// API请求函数 - 实际项目中替换为真实接口调用
const fetchAttributesA = async (): Promise<Attribute[]> => {
  // 模拟接口A返回数据
  return [
    { label: '年龄', code: 'age', type: 0 },
    { label: '姓名', code: 'name', type: 0 },
    { label: '爱好', code: 'hobby', type: 1 },
    { label: '地址', code: 'address', type: 1 }
  ];
};

const fetchAttributesB = async (): Promise<Attribute[]> => {
  // 模拟接口B返回数据
  return [
    { label: '年龄', code: 'age', type: 0 },
    { label: '姓名', code: 'name', type: 0 },
    { label: '爱好', code: 'hobby', type: 1 },
    { label: '地址', code: 'address', type: 1 },
    { label: '身高', code: 'height', type: 1 },
    { label: '体重', code: 'weight', type: 1 },
    { label: '特长', code: 'goodat', type: 1 },
    { label: '专业', code: 'professional', type: 1 },
    { label: '区域', code: 'region', type: 1 },
    { label: '婚否', code: 'marray', type: 1 }
  ];
};

export const useAttributeManager = () => {
  // 页面已有的属性列表 (list_a)
  const listA = ref<Attribute[]>([]);
  // 所有可用的属性列表 (list_b)
  const listB = ref<Attribute[]>([]);
  // 弹窗中使用的属性列表（带勾选和禁用状态）
  const dialogAttributes = ref<Attribute[]>([]);
  // 弹窗可见性
  const dialogVisible = ref(false);
  // 加载状态
  const loading = ref(true);

  // 初始化页面数据
  const initPageData = async () => {
    try {
      loading.value = true;
      // 获取页面已有的属性
      listA.value = await fetchAttributesA();
    } catch (error) {
      console.error('Failed to fetch initial attributes:', error);
    } finally {
      loading.value = false;
    }
  };

  // 打开弹窗时初始化数据
  const handleOpenDialog = async () => {
    try {
      loading.value = true;
      // 获取所有可用属性
      listB.value = await fetchAttributesB();
      
      // 提取listA中已有的code，用于判断
      const existingCodes = listA.value.map(item => item.code);
      
      // 处理弹窗中的属性状态（关键修复部分）
      dialogAttributes.value = listB.value.map(attr => {
        // 检查是否已在listA中存在
        const isInListA = existingCodes.includes(attr.code);
        
        return {
          ...attr,
          // 状态判断逻辑：
          // 1. 内置属性(type=0)：始终禁用且勾选
          // 2. 已在listA中的属性：禁用且勾选
          // 3. 不在listA中的自定义属性：可编辑，默认不勾选
          disabled: attr.type === 0 || isInListA,
          checked: attr.type === 0 || isInListA
        };
      });
      
      // 显示弹窗
      dialogVisible.value = true;
    } catch (error) {
      console.error('Failed to fetch all attributes:', error);
    } finally {
      loading.value = false;
    }
  };

  // 处理checkbox状态变化
  const handleCheckboxChange = (code: string, checked: boolean) => {
    const attr = dialogAttributes.value.find(item => item.code === code);
    if (attr && !attr.disabled) {
      attr.checked = checked;
    }
  };

  // 确认添加属性
  const handleConfirm = () => {
    // 找出所有新勾选的自定义属性（不在listA中且被勾选的）
    const selectedNewAttrs = dialogAttributes.value.filter(attr => {
      const isNotInListA = !listA.value.some(item => item.code === attr.code);
      return attr.type === 1 && isNotInListA && attr.checked;
    });
    
    // 将新勾选的属性添加到listA中
    listA.value = [...listA.value, ...selectedNewAttrs];
    
    // 关闭弹窗
    dialogVisible.value = false;
  };

  // 删除属性
  const handleDelete = (code: string) => {
    listA.value = listA.value.filter(item => item.code !== code);
  };

  // 组件挂载时初始化数据
  onMounted(() => {
    initPageData();
  });

  return {
    listA,
    dialogVisible,
    dialogAttributes,
    loading,
    handleOpenDialog,
    handleCheckboxChange,
    handleConfirm,
    handleDelete
  };
};