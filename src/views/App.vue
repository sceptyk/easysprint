<template>
  <n-space v-if="isAuthenticating" :justify="'center'" :align="'center'" class="loader-wrapper">
    <n-spin />
  </n-space>
  <router-view v-else />
</template>
<script lang="ts" setup>
import { useAuth } from "../services/useAuth";
import { NSpin, NSpace } from 'naive-ui';

const { isAuthenticating, currentUser, subscribe } = useAuth();
subscribe();

</script>
<style scoped>
.loader-wrapper {
  width: 100vw;
  height: 100vh;
}
</style>