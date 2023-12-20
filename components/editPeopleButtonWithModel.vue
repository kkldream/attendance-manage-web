<template>
  <a-space>
    <EditOutlined style="color: chocolate" @click="clickEdit"/>
    <DeleteOutlined style="color: red" @click="clickDelete"/>
  </a-space>
  <slot></slot>
  <a-modal v-model:open="visible" :title="title" @ok="clickEditOk()">
    <div>
      <p>人員名稱：</p>
      <a-input v-model:value="people.name"></a-input>
    </div>
    <div>
      <p>人員備註：</p>
      <a-input v-model:value="people.direction"></a-input>
    </div>
    <div>
      <p>電子信箱：</p>
      <a-input v-model:value="people.email"></a-input>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import type {Attendance} from "~/types/indexType";
import type {UnwrapRefSimple} from "@vue/reactivity";

const props = defineProps(['value']);
const emit = defineEmits(['refresh']);

const people = props.value as UnwrapRefSimple<Attendance>;
const visible = ref<boolean>(false);

let title: string = '';

function clickEdit() {
  title = `修改 ${people.name} 資訊`;
  visible.value = true;
}

async function clickEditOk() {
  await $fetch('/api/people/edit', {
    method: 'POST',
    body: {
      peopleId: people.id,
      data: {
        name: people.name,
        direction: people.direction,
        email: people.email,
      },
    },
  });
  visible.value = false;
  emit('refresh');
}

async function clickDelete() {
  Modal.confirm({
    title: `確定刪除嗎？`,
    content: `${people.name} 將被從資料庫中移除`,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    async onOk() {
      const isSuccess = await $fetch('/api/people/delete', {
        method: 'POST',
        body: {peopleId: people.id},
      });
      if (isSuccess) emit('refresh');
    },
  });
}
</script>
<style scoped>

</style>