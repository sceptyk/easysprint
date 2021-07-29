<template>
  <n-layout>
    <n-layout-header class="header" bordered>
      <n-space justify="space-between" align="center">
        <router-link :to="{ name: 'Dashboard' }">
          <n-button text>
            <template #icon>
              <n-icon>
                <apps-icon />
              </n-icon>
            </template>
            Dashboard
          </n-button>
        </router-link>
        <n-button @click="onSignOut" text>
          <template #icon>
            <n-icon>
              <log-out-icon />
            </n-icon>
          </template>
          Sign out
        </n-button>
      </n-space>
    </n-layout-header>
    <n-layout-content class="content">
      <router-view />
    </n-layout-content>
  </n-layout>
</template>
<script lang="ts" setup>
import {
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NTabs,
  NTabPane,
  NSpace,
  NDropdown,
  NButton,
  NIcon,
} from "naive-ui";
import { LogOutSharp as LogOutIcon, Apps as AppsIcon } from '@vicons/ionicons5';
import { useAuth } from "../services/useAuth";
import { useRouter } from "vue-router";

const { signOut } = useAuth();
const router = useRouter();

const onSignOut = async () => {
  await signOut();
  router.push({ name: 'SignIn' });
}
</script>
<style scoped lang="scss">
.header {
  padding: 4px 16px;
}

.content {
  padding: 12px 16px;
}
</style>