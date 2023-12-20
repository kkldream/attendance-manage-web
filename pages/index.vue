<template>
  <div style="padding: 8px 24px 24px; background: #fff; margin-bottom: 16px;">
    <h1>常用模板：</h1>
    <a-flex align="center" justify="space-between" wrap="wrap">
      <div>
        選取套用：
        <a-select
            v-model:value="templateSelectValue"
            :loading="false"
            :options="templateSelectOptions"
            style="width: 150px;"
            @change="clickTemplateSelect('change')"
            @click="clickTemplateSelect('init')"
        ></a-select>
      </div>
      <a-space>
        <insert-template-button-with-model v-if="editIsAlive" :peoples="peoples" @refresh="refreshTemplate">
          儲存模板
        </insert-template-button-with-model>
        <a-button danger type="primary" @click="templateDelete">
          刪除模板
        </a-button>
      </a-space>
    </a-flex>
  </div>
  <div style="padding: 8px 24px 24px; background: #fff;">
    <a-flex align="center" justify="space-between">
      <h1>點名列表：</h1>
      <a-space size="middle">
        <div>
          編輯模式：
          <a-switch v-model:checked="editMode"/>
        </div>
        <a-button :disabled="editMode" type="primary" :loading="buttonLoading" @click="clickSend">
          送出點名單
        </a-button>
      </a-space>
    </a-flex>
    <a-divider v-if="editMode">
      <insert-people-button-with-model :index="0" @refresh="refreshPeoples">
        插入新成員
      </insert-people-button-with-model>
    </a-divider>
    <div v-for="(people, index) in peoples">
      <a-card size="small" style="margin-bottom: 8px">
        <a-flex align="center" justify="space-between" wrap="wrap">
          <a-space size="small">
            {{ people.name }}
            <div v-if="people.direction.length > 0">
              ({{ people.direction }})
            </div>
            <edit-people-button-with-model v-if="editMode && editIsAlive" :value="people" @refresh="refreshPeoples"/>
          </a-space>
          <a-select
              v-model:value="people.select"
              :disabled="editMode"
              :loading="false"
              :options="attendanceSelectOptions"
              style="width: 150px;"
          ></a-select>
        </a-flex>
      </a-card>
      <a-divider v-if="editMode">
        <insert-people-button-with-model :index="index + 1" @refresh="refreshPeoples">
          插入新成員
        </insert-people-button-with-model>
      </a-divider>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type {SelectProps} from "ant-design-vue";
import InsertPeopleButtonWithModel from "~/components/insertPeopleButtonWithModel.vue";
import EditPeopleButtonWithModel from "~/components/editPeopleButtonWithModel.vue";
import type {Attendance, TemplateWithId} from "~/types/indexType";
import InsertTemplateButtonWithModel from "~/components/insertTemplateButtonWithModel.vue";
import type {WithId} from "mongodb";
import type {PeopleDocument} from "~/types/documents/PeopleDocument";
import {notifyPush, notifyType} from "~/services/notify";

const editMode = ref<boolean>(false);
const editIsAlive = ref<boolean>(true);
const peoples = ref<Attendance[]>([]);
const attendanceSelectOptions = ref<SelectProps['options']>([]);
const templateSelectValue = ref<number | null>(null);
let templates: TemplateWithId[] = [];
const templateSelectOptions = ref<SelectProps['options']>([]);
const buttonLoading = ref<boolean>(false);

refreshPeoples();
refreshStatus();
refreshTemplate();

async function refreshTemplate() {
  templates = await $fetch('/api/template/get');
  templateSelectOptions.value = templates.map((template, index) => ({
    label: template.name,
    value: index,
  }));
  console.log(templates);
  templateSelectValue.value = 0;
}

async function clickTemplateSelect(mode: 'init' | 'change') {
  if (mode === 'init') {
    templateSelectValue.value = null;
    return;
  }
  if (templateSelectValue.value === null) return;
  const template = templates[templateSelectValue.value];
  const res: string[] = await $fetch('/api/config/getStatusList');
  peoples.value.forEach(people => {
    const result = template.template.find(e => e.peopleId === people.id);
    if (!result) people.select = 0;
    else people.select = res.findIndex(e => e === result.status);
  });
}

async function templateDelete() {
  if (templateSelectValue.value === null) return;
  if (templateSelectValue.value === 0) {
    notifyPush({
      type: notifyType.error,
      message: '無法刪除預設模板',
      description: '請選擇其他模板',
    });
    return;
  }
  const template = templates[templateSelectValue.value];
  console.log(template);
  Modal.confirm({
    title: `確定刪除嗎？`,
    content: `${template.name} 模板將被從資料庫中移除`,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    async onOk() {
      const isSuccess = await $fetch('/api/template/delete', {
        method: 'POST',
        body: {
          templateId: template.templateId,
        },
      });
      if (isSuccess) await refreshTemplate();
      notifyPush({
        type: isSuccess ? notifyType.success : notifyType.error,
        message: isSuccess ? '刪除成功' : '刪除失敗',
        description: isSuccess ? '' : '請稍後再試或告知開發人員',
      });
    },
  });
}

async function refreshStatus() {
  const res: string[] = await $fetch('/api/config/getStatusList');
  attendanceSelectOptions.value = res.map((label, index) => ({
    label: label,
    value: index,
  }));
}

async function refreshPeoples() {
  editIsAlive.value = false;
  const res: WithId<PeopleDocument>[] = await $fetch('/api/people/get');
  peoples.value = res.map((people: WithId<PeopleDocument>): Attendance => ({
    id: people._id.toString(),
    name: people.name,
    direction: people.direction,
    email: people.email,
    select: 0,
  }));
  editIsAlive.value = true;
}

async function clickSend() {
  buttonLoading.value = true;
  setTimeout(() => {
    buttonLoading.value = false;
    notifyPush({
      type: notifyType.success,
      message: '送出成功',
      description: '已將點名單送出',
    });
  }, 2000);
}
</script>
<style scoped>

</style>
