<template>
  <n-space v-if="isAuthenticating" justify="center" align="center" class="loader-wrapper">
    <n-spin />
  </n-space>
  <router-view v-else />
</template>
<script lang="ts" setup>
import { useAuth } from "../services/useAuth";
import { NSpin, NSpace } from 'naive-ui';
import { watch } from "@vue/runtime-core";
import { useRouter } from "vue-router";

const router = useRouter();
const { isAuthenticating, isSignedIn, subscribe } = useAuth();
subscribe();

watch(isSignedIn, (value) => {
  if (!value) router.push({ name: 'SignIn' })
})

</script>
<style scoped>
.loader-wrapper {
  width: 100vw;
  height: 100vh;
}
</style>