<template>
  <login-layout v-if="useLoginStatus.isLoggedIn"/>
  <sider-layout v-else @reload="reload()">
    <router-view v-if="isRouterAlive"/>
  </sider-layout>
</template>
<script lang="ts" setup>
import SiderLayout from "~/layouts/siderLayout.vue";
import {useLoginStatusStore} from "./stores/loginStatusStore";
import LoginLayout from "~/layouts/loginLayout.vue";

const useLoginStatus = useLoginStatusStore();
const isRouterAlive = ref<boolean>(true);
const tokenCookie = useCookie('token');

if (tokenCookie.value)
  useLoginStatus.setLogIn(tokenCookie.value);

useLoginStatus.$subscribe(() => {
  reload();
});

async function reload() {
  isRouterAlive.value = false;
  await nextTick();
  isRouterAlive.value = true;
}

useHead({
  title: "Attendance MS",
});
</script>
<style scoped>

</style>
