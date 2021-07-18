<template>
  <div class="wrapper">
    <n-card title="easysprint - sign in" class="card">
      <template #action>
        <n-button :loading="loading" type="primary" @click="signInWithGoogle">
          <template #icon>
            <n-icon>
              <google-icon />
            </n-icon>
          </template>
          Google sign in
        </n-button>
      </template>
    </n-card>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, ref } from "vue";
import { NButton, NCard, NIcon } from "naive-ui";
import { LogoGoogle as GoogleIcon } from "@vicons/ionicons5";
import firebase from "firebase/app";
import { useRouter } from "vue-router";

const loading = ref(false)
const router = useRouter();
const signInWithGoogle = async () => {
  try {
    loading.value
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(googleProvider);
    router.push({ name: "Root" });
  } catch (e) {
    console.error(e);
  } finally {
    loading.value
  }
};
</script>
<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.card {
  max-width: 450px;
}
</style>