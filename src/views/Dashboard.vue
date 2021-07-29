<template>
  <n-page-header>
    <template #title>
      <n-h1 prefix="bar">
        <n-text>Dashboard</n-text>
      </n-h1>
    </template>
  </n-page-header>
  <n-tabs>
    <n-tab-pane name="retros" tab="Retro boards">
      <n-list>
        <template #header>
          <n-space justify="space-between">
            <n-h2>
              <n-text>Retro boards</n-text>
            </n-h2>
            <n-button type="primary" @click="onCreateBoard">Create board</n-button>
          </n-space>
        </template>
        <n-list-item v-for="board in boards" :key="board.id">
          <n-card :title="board.title">
            <template #header-extra>
              <n-text>{{ board.updatedAt }}</n-text>
            </template>
            <n-space>
              <n-button text @click="openBoard(board.id)">Open</n-button>
              <n-button text type="error" @click="onRemoveBoard(board.id)">Delete</n-button>
            </n-space>
          </n-card>
        </n-list-item>
      </n-list>
    </n-tab-pane>
    <n-tab-pane name="grooming" tab="Grooming sessions"></n-tab-pane>
    <n-tab-pane name="team" tab="Team members"></n-tab-pane>
  </n-tabs>
</template>
<script lang="ts" setup>
import {
  NH1,
  NH2,
  NText,
  NTabs,
  NTabPane,
  NList,
  NListItem,
  NCard,
  NButton,
  NSpace,
  NPageHeader,
} from 'naive-ui';
import { useRouter } from 'vue-router';
import { useAuth } from '../services/useAuth';
import { useBoardRepository } from '../services/useBoardRepository';
import dayjs from 'dayjs';

const { currentUser } = useAuth();
const { fetchBoards, createBoard, removeBoard } = useBoardRepository();
const router = useRouter();
const boards = fetchBoards((currentUser.value as any).uid);

const openBoard = (id: string) => {
  router.push({ name: 'RetroBoard', params: { id } })
}

const onCreateBoard = () => {
  createBoard({
    title: `Sprint ${dayjs().format('L')}`,
    owner: currentUser.value?.uid,
  })
}

const onRemoveBoard = (boardId) => {
  removeBoard((currentUser.value as any).uid, boardId)
}
</script>