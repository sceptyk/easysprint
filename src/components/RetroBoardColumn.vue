<template>
  <div class="wrapper">
    <slot name="header"></slot>
    <n-list>
      <n-list-item class="add-item-wrapper">
        <n-input v-model:value="content" type="textarea" placeholder="New item..." />
        <n-space justify="end" class="button-wrapper">
          <n-button size="small" @click="onPost">post</n-button>
        </n-space>
      </n-list-item>
      <n-list-item v-for="item in data" class="item-wrapper">
        <n-card :key="item.id">{{ item.content }}</n-card>
      </n-list-item>
    </n-list>
  </div>
</template>
<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import {
  NH3, NText, NList, NListItem, NInput, NButton, NSpace, NCard,
} from 'naive-ui'

defineProps<{
  data: any[]
}>()
const emit = defineEmits<{
  (e: 'post', content: string): void
}>();

const content = ref('')

const onPost = () => {
  emit('post', content.value)
  content.value = '';
}
</script>
<style scoped lang="scss">
.wrapper {
  padding: 16px 8px;
}
.button-wrapper {
  padding-top: 4px;
}
.add-item-wrapper {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 4px;
  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
}
.item-wrapper {
  margin-top: 12px;
}
</style>