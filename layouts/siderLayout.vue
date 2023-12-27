<template>
  <a-layout class="test" style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed">
      <a-flex align="center" style="height: 100px">
        <AuditOutlined style="font-size: 24px; color: white; margin-left: 24px;"/>
        <h1 v-if="!collapsed" style="font-size: 16px; color: white; margin-left: 8px">
          AttendanceMS
        </h1>
      </a-flex>
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline" theme="dark">
        <a-menu-item v-for="item in navigation" :key="item.key" style="margin-bottom: 8px">
          <component :is="item.icon"/>
          <span>{{ item.name }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-flex justify="space-between" style="margin-right: 16px">
          <div>
            <menu-unfold-outlined v-if="collapsed" class="header-button-icon" @click="() => (collapsed = !collapsed)"/>
            <menu-fold-outlined v-else class="header-button-icon" @click="() => (collapsed = !collapsed)"/>
            <RedoOutlined v-if="!loading" class="header-button-icon" @click="refreshPage()"/>
            <LoadingOutlined v-else class="header-button-icon"/>
          </div>
          <div>
            <LogoutOutlined class="header-button-icon" @click="logOut"/>
          </div>
        </a-flex>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item v-for="name in navigationBar">{{ name }}</a-breadcrumb-item>
        </a-breadcrumb>
        <div>
          <slot></slot>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Attendance Manage System
        | Created by 2023 |
        <a href="https://github.com/kkldream/attendance-manage-web">Source</a>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {
  DesktopOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RedoOutlined,
} from '@ant-design/icons-vue';
import {onMounted, ref, watch} from 'vue';
import {useRouter} from "vue-router";
import {useLoginStatusStore} from "~/stores/loginStatusStore";

const useLoginStatus = useLoginStatusStore();
const emit = defineEmits(['reload']);
const router = useRouter();
const tokenCookie = useCookie('token');

const navigation = ref([
  {key: 'index', name: '點名系統', path: '/', current: true, icon: DesktopOutlined},
  {key: 'record', name: '歷史紀錄', path: '/record', current: false, icon: FileTextOutlined},
  {key: 'about', name: '關於', path: '/about', current: false, icon: InfoCircleOutlined},
]);
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>([]);
const navigationBar = ref<string[]>(['首頁']);
const loading = ref<boolean>(false);

onMounted(() => {
  refreshPage();
});

watch(selectedKeys, (newKeys) => {
  refreshPage(newKeys[0]);
});

const refreshPage = async (key?: string) => {
  loading.value = true;
  const routerMapItem = navigation.value
      .find(e => key ? e.key === key : e.path === window.location.pathname);
  if (!routerMapItem) throw new Error(`routerMapItem not found`);
  selectedKeys.value[0] = routerMapItem.key;
  navigationBar.value = ['首頁', routerMapItem.name];
  if (window.location.pathname !== routerMapItem.path) {
    console.log(`[router] push -> ${routerMapItem.path}`);
    await router.push(routerMapItem.path);
  } else {
    console.log(`[router] reload -> ${routerMapItem.path}`);
    emit('reload');
  }
  await new Promise(resolve => setTimeout(resolve, 200));
  loading.value = false;
};

function logOut() {
  useLoginStatus.setToken(null);
  tokenCookie.value = null;
}
</script>
<style scoped>
.header-button-icon {
  font-size: 20px;
  margin-left: 16px;
}
</style>
