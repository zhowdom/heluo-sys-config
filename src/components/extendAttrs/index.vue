<template>
  <div class="attribute-page">
    <div class="page-header">
      <h2>属性管理</h2>
      <a-button type="primary" @click="handleOpenDialog">
        <template #icon><plus-outlined /></template>
        添加属性
      </a-button>
    </div>
    
      <div class="attribute-list">
        <a-list bordered :data-source="listA">
          <template #renderItem="{item}">
            <a-list-item class="attribute-item">
              <div class="attribute-info">
                <span class="attribute-label">{{ item.label }}</span>
                <span class="attribute-code">{{ item.code }}</span>
                <span class="attribute-type">
                  {{ item.type === 0 ? '内置属性' : '自定义属性' }}
                </span>
              </div>
              
              <!-- 删除按钮：只有自定义属性可以删除 -->
              <a-popconfirm
                v-if="item.type === 1"
                title="确定要删除这个属性吗？"
                @confirm="handleDelete(item.code)"
              >
                <template #icon><exclamation-circle-outlined style="color: #faad14;" /></template>
                <a-button danger size="small" type="text">删除</a-button>
              </a-popconfirm>
            </a-list-item>
          </template>
        </a-list>
      </div>

    <a-modal
      title="添加属性"
      v-model:visible="dialogVisible"
      width="70%"
      @cancel="dialogVisible = false"
      @ok="handleConfirm"
    >
      <div class="dialog-content">
        {{checkedCodes}}@
        <a-checkbox-group 
          :value="checkedCodes"
          @change="handleGroupChange"
        >
          <a-checkbox
            v-for="attr in dialogAttributes"
            :key="attr.code"
            :value="attr.code"
            :disabled="attr.disabled"
          >
            <span>
              {{ attr.label }}
              <span class="attribute-type-tag">
                {{ attr.type === 0 ? '内置' : '自定义' }}
              </span>
            </span>
          </a-checkbox>
        </a-checkbox-group>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { useAttributeManager } from './useAttrs';
import { computed } from 'vue';

const {
  listA,
  dialogVisible,
  dialogAttributes,
  loading,
  handleOpenDialog,
  handleCheckboxChange,
  handleConfirm,
  handleDelete
} = useAttributeManager();

const checkedCodes = computed(() => {
  return dialogAttributes.value
    .filter(attr => attr.checked)
    .map(attr => attr.code);
});

const handleGroupChange = (checkedValues: string[]) => {
  dialogAttributes.value.forEach(attr => {
    if (!attr.disabled) {
      const isChecked = checkedValues.includes(attr.code);
      handleCheckboxChange(attr.code, isChecked);
    }
  });
};
</script>

<style scoped>
.attribute-page {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.attribute-list {
  margin-top: 20px;
}

.attribute-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.attribute-info {
  display: flex;
  gap: 20px;
}

.attribute-label {
  font-weight: 500;
}

.attribute-code {
  color: #666;
  font-family: monospace;
}

.attribute-type {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: #f0f2f5;
}

.dialog-content {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 10px;
}

.ant-checkbox-wrapper {
  display: block;
  margin-bottom: 8px;
  width: 150px;
  display: flex;
}

.attribute-type-tag {
  margin-left: 10px;
  font-size: 12px;
  color: #888;
}

.attribute-status-tag {
  margin-left: 10px;
  font-size: 12px;
  color: #1890ff;
}
</style>
