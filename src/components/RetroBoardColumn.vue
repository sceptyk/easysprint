<template>
  <div class="wrapper">
    <slot name="header"></slot>
    <n-card class="add-item-wrapper" size="small">
      <n-input v-model:value="content" type="textarea" placeholder="New item..." />
      <template #action>
        <n-button size="small" @click="onPost">post</n-button>
      </template>
    </n-card>
    <n-list>
      <n-list-item v-for="item in data" class="item-wrapper">
        <n-card :key="item.id">
          <span :class="{ blurred: hideCards }">{{ hideCards ? item.masked : item.content }}</span>
          <template #action>
            <n-button size="small" text @click="onRemove(item.id)" type="error">delete</n-button>
          </template>
        </n-card>
      </n-list-item>
    </n-list>
  </div>
</template>
<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import {
  NH3, NText, NList, NListItem, NInput, NButton, NIcon, NCard,
} from 'naive-ui'

defineProps<{
  data: any[],
  hideCards: boolean,
}>()
const emit = defineEmits<{
  (e: 'post', content: string): void,
  (e: 'remove', itemId: string): void,
}>();

const content = ref('')

const onPost = () => {
  emit('post', content.value)
  content.value = '';
}

const onRemove = (itemId: string) => {
  emit('remove', itemId);
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
  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
}
.item-wrapper {
  margin-top: 12px;
}

.blurred {
  filter: blur(4px);
}
</style>