<template>
  <n-page-header>
    <template #title>
      <n-h1 prefix="bar">
        <n-text>Retro: {{ board?.title }}</n-text>
      </n-h1>
    </template>
    <template #extra v-if="isBoardOwner">
      <n-switch :value="!board?.hideCards" @update:value="onToggleCardVisibility">
        <template #checked>
          <n-icon>
            <hide-icon />
          </n-icon>
        </template>
        <template #unchecked>
          <n-icon>
            <show-icon />
          </n-icon>
        </template>
      </n-switch>
    </template>
  </n-page-header>
  <n-grid x-gap="12" :cols="3">
    <n-gi style="background: #f7fffb;">
      <retro-board-column
        @post="content => onPost('positive', content)"
        @remove="onRemove"
        :data="positives"
        :hide-cards="!!board?.hideCards"
      >
        <template #header>
          <n-h3>
            <n-text type="success">Went well</n-text>
          </n-h3>
        </template>
      </retro-board-column>
    </n-gi>
    <n-gi style="background:#fff7f9;">
      <retro-board-column
        @post="content => onPost('improvable', content)"
        @remove="onRemove"
        :data="improvables"
        :hide-cards="!!board?.hideCards"
      >
        <template #header>
          <n-h3>
            <n-text type="error">To improve</n-text>
          </n-h3>
        </template>
      </retro-board-column>
    </n-gi>
    <n-gi style="background:#fffcf7;">
      <retro-board-column
        @post="content => onPost('actionable', content)"
        @remove="onRemove"
        :data="actionables"
        :hide-cards="!!board?.hideCards"
      >
        <template #header>
          <n-h3>
            <n-text type="warning">To do</n-text>
          </n-h3>
        </template>
      </retro-board-column>
    </n-gi>
  </n-grid>
</template>
<script lang="ts" setup>
import { computed } from '@vue/runtime-core';
import {
  NH1,
  NH3,
  NText,
  NPageHeader,
  NGrid,
  NGi,
  NButton,
  NIcon,
  NSwitch,
} from 'naive-ui'
import RetroBoardColumn from '../components/RetroBoardColumn.vue';
import { useRoute } from 'vue-router';
import { useBoardRepository } from '../services/useBoardRepository';
import { EyeOff as HideIcon, Eye as ShowIcon } from '@vicons/ionicons5';
import { useAuth } from '../services/useAuth';

const route = useRoute();
const boardId = route.params.id as string;
const { fetchBoard, fetchBoardItems, createBoardItem, removeBoardItem, updateBoard } = useBoardRepository();
const { currentUser } = useAuth();
const board = fetchBoard(boardId)
const boardItems = fetchBoardItems(boardId)

const positives = computed(() => boardItems.value.filter(item => item.column === 'positive'));
const improvables = computed(() => boardItems.value.filter(item => item.column === 'improvable'));
const actionables = computed(() => boardItems.value.filter(item => item.column === 'actionable'));

const isBoardOwner = computed(() => board.value?.owner === currentUser.value?.uid);

const onPost = (column: string, content: string) => {
  createBoardItem(boardId, {
    column,
    content,
    masked: content.replace(/\w/g, 'x'),
    owner: currentUser.value?.uid,
    author: currentUser.value?.displayName || '',
  })
}

const onRemove = (itemId: string) => {
  removeBoardItem(boardId, itemId);
}

const onToggleCardVisibility = () => {
  updateBoard(boardId, {
    hideCards: !board.value?.hideCards,
  })
}
</script>