<template>
  <a-button size="small" @click="clickShow">
    <slot></slot>
  </a-button>
  <a-modal v-model:open="visible" title="新增成員資訊" @ok="clickOk()">
    <div>
      <p>人員名稱：</p>
      <a-input v-model:value="form.name"></a-input>
    </div>
    <div>
      <p>人員備註：</p>
      <a-input v-model:value="form.direction"></a-input>
    </div>
    <div>
      <p>電子信箱：</p>
      <a-input v-model:value="form.email"></a-input>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import type {People} from "~/types/documents/PeopleDocument";

const props = defineProps(['index']);
const emit = defineEmits(['refresh']);

const visible = ref<boolean>(false);
const form = reactive({
  name: '',
  direction: '',
  email: '',
});

const clickShow = () => {
  form.name = '';
  form.direction = '';
  form.email = '';
  visible.value = true;
};

const clickOk = async () => {
  const index: number = props.index ?? 0;
  console.log(`index: ${index}`);
  const peopleDoc: People = {
    index: index,
    name: form.name,
    direction: form.direction,
    email: form.email,
  };
  await $fetch('/api/people/insert', {
    method: 'POST',
    body: peopleDoc,
  });
  visible.value = false;
  emit('refresh');
};
</script>
<style scoped>

</style>