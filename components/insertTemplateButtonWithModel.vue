<template>
  <a-button type="primary" @click="clickShow">
    <slot></slot>
  </a-button>
  <a-modal v-model:open="visible" title="儲存新模板" @ok="clickOk()">
    <div>
      <p>模板名稱：</p>
      <a-input v-model:value="templateName"></a-input>
    </div>
    <div>
      <p>模板內容：</p>
      <ul>
        <li v-for="item in body" :key="item.username">
          {{ item.username }}：{{ item.status }}
        </li>
      </ul>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import type {UnwrapRefSimple} from "@vue/reactivity";
import type {Attendance, TemplateWithId} from "~/types/indexType";

const props = defineProps(['peoples']);
const emit = defineEmits(['refresh']);

const peoples = props.peoples as UnwrapRefSimple<Attendance[]>;
const visible = ref<boolean>(false);
const templateName = ref<string>('');
const body = ref<{ username: string; status: string; }[]>();

const clickShow = async () => {
  templateName.value = '';
  const res: string[] = await $fetch('/api/config/getStatusList');
  body.value = peoples.filter(e => e.select !== 0).map(e => ({
    username: e.name,
    status: e.select !== null ? res[e.select] : 'null',
  }));
  visible.value = true;
};

const clickOk = async () => {
  const res: string[] = await $fetch('/api/config/getStatusList');
  await $fetch('/api/template/insert', {
    method: 'POST',
    body: {
      createTime: new Date(),
      name: templateName.value,
      template: peoples.filter(e => e.select !== 0).map(e => ({
        peopleId: e.id,
        status: res[e.select ?? 0],
      })),
    },
  });
  visible.value = false;
  emit('refresh');
};
</script>
<style scoped>

</style>