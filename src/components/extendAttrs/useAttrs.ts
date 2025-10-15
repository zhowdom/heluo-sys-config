
import { ref, onMounted, computed } from 'vue';
interface Attribute {
  label: string;
  code: string;
  type: 0 | 1;
  disabled?: boolean;
  checked?: boolean;
}

const fetchAttributesA = async (): Promise<Attribute[]> => {
  return [
    { label: '年龄', code: 'age', type: 0 },
    { label: '姓名', code: 'name', type: 0 },
    { label: '爱好', code: 'hobby', type: 1 },
    { label: '地址', code: 'address', type: 1 }
  ];
};

const fetchAttributesB = async (): Promise<Attribute[]> => {
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
  const listA = ref<Attribute[]>([]);
  const listB = ref<Attribute[]>([]);
  const dialogAttributes = ref<Attribute[]>([]);
  const dialogVisible = ref(false);
  const loading = ref(true);

  const initPageData = async () => {
    try {
      loading.value = true;
      listA.value = await fetchAttributesA();
    } catch (error) {
      console.error('Failed to fetch initial attributes:', error);
    } finally {
      loading.value = false;
    }
  };

  const handleOpenDialog = async () => {
    try {
      loading.value = true;
      listB.value = await fetchAttributesB();
      
      const existingCodes = listA.value.map(item => item.code);
      
      dialogAttributes.value = listB.value.map(attr => {
        const isInListA = existingCodes.includes(attr.code);
        
        return {
          ...attr,
          disabled: attr.type === 0 || isInListA,
          checked: attr.type === 0 || isInListA
        };
      });
      
      dialogVisible.value = true;
    } catch (error) {
      console.error('Failed to fetch all attributes:', error);
    } finally {
      loading.value = false;
    }
  };

  const handleCheckboxChange = (code: string, checked: boolean) => {
    const attr = dialogAttributes.value.find(item => item.code === code);
    if (attr && !attr.disabled) {
      attr.checked = checked;
    }
  };

  const handleConfirm = () => {
    const selectedNewAttrs = dialogAttributes.value.filter(attr => {
      const isNotInListA = !listA.value.some(item => item.code === attr.code);
      return attr.type === 1 && isNotInListA && attr.checked;
    });
    
    listA.value = [...listA.value, ...selectedNewAttrs];
    
    dialogVisible.value = false;
  };

  const handleDelete = (code: string) => {
    listA.value = listA.value.filter(item => item.code !== code);
  };

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