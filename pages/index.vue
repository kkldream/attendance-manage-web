<template>
  <div style="padding: 8px 24px 24px; background: #fff; margin-bottom: 16px;">
    <h1>常用模板：</h1>
    <a-flex align="center" justify="space-between" wrap="wrap">
      <div>
        選取套用：
        <a-select
            v-model:value="daysSelectValue"
            :loading="false"
            :options="daysSelectOptions"
            style="width: 150px;"
            @change="attendanceSelectOnChange"
        ></a-select>
      </div>
      <a-space>
        <a-button type="primary" @click="insertTemplate">儲存模板</a-button>
        <a-button danger type="primary" :disabled="daysSelectValue===0">刪除模板</a-button>
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
        <a-button type="primary" :disabled="editMode">送出點名單</a-button>
      </a-space>
    </a-flex>
    <a-divider v-if="editMode">
      <a-button size="small" @click="insertPeople(0)">插入新成員</a-button>
    </a-divider>
    <div v-for="(people, index) in peoples">
      <a-card size="small" style="margin-bottom: 8px">
        <a-flex align="center" justify="space-between" wrap="wrap">
          <a-space size="middle">
            {{ people.name }} - {{ people.direction }}
            <a-space v-if="editMode">
              <EditOutlined style="color: chocolate;" @click="editPeople(people)"/>
              <DeleteOutlined style="color: red" @click="deletePeople(people)"/>
            </a-space>
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
        <a-button size="small" @click="insertPeople(index + 1)">插入新成員</a-button>
      </a-divider>
    </div>
  </div>

  <a-modal
      v-model:open="insertPeopleModalVisible"
      title="Basic Modal"
      @ok="insertPeopleModalOk"
  >
    人員名稱：
    <a-input v-model:value="insertPeopleModalInput.name"></a-input>
    人員備註：
    <a-input v-model:value="insertPeopleModalInput.direction"></a-input>
    電子信箱：
    <a-input v-model:value="insertPeopleModalInput.email"></a-input>
  </a-modal>
</template>
<script lang="ts" setup>
import type {SelectProps} from "ant-design-vue";
import {ExclamationCircleOutlined} from "@ant-design/icons-vue";
import {createVNode} from "vue";

const daysRecord = (await $fetch('/api/template/get'))
    .map((label, index) => ({label: label.name, value: index}));

// 處理選擇的日期
const daysSelectOptions = ref<SelectProps['options']>(daysRecord);
const daysSelectValue = ref<number | null>(daysRecord[0].value);

const peopleInfo = (await $fetch('/api/getPeople'));
const attendanceTypes = (await $fetch('/api/getAttendanceTypes'))
    .map((label, index) => ({label, value: index}));

const attendanceSelectOptions = ref<SelectProps['options']>(attendanceTypes);
const peoples = ref(peopleInfo.docs.map(people => ({
  id: people._id,
  name: people.name,
  direction: people.direction,
  email: people.email,
  select: attendanceTypes[0].value,
})));

const editMode = ref<boolean>(false);

const insertPeopleModalVisible = ref<boolean>(false);
const insertPeopleModalIndex = ref<number>(0);
const insertPeopleModalInput = reactive({
  name: '',
  direction: '',
  email: '',
});
const insertPeopleModalOk = async () => {
  const peopleDoc: any = {
    index: insertPeopleModalIndex.value,
    name: insertPeopleModalInput.name,
    direction: insertPeopleModalInput.direction,
    email: insertPeopleModalInput.email,
  };
  peopleDoc.id = await $fetch('/api/insertPeople', {
    method: 'POST',
    body: peopleDoc,
  });
  peoples.value = [
    ...peoples.value.slice(0, insertPeopleModalIndex.value),
    {
      id: peopleDoc.id,
      name: peopleDoc.name,
      direction: peopleDoc.direction,
      email: peopleDoc.email,
      select: attendanceTypes[0].value,
    },
    ...peoples.value.slice(insertPeopleModalIndex.value)
  ];
  insertPeopleModalVisible.value = false;
};

async function attendanceSelectOnChange() {
  daysRecord.value = (await $fetch('/api/template/get'))
      .map((label, index) => ({label: label.name, value: index}));

  daysSelectValue
  peoples.value = peoples.value.map(e => ({
    ...e,
    select: attendanceTypes[0].value,
  }));
}

function editPeople(people: any) {

}

function insertPeople(index: number) {
  insertPeopleModalVisible.value = true;
  insertPeopleModalIndex.value = index;
}

function deletePeople(people: any) {
  Modal.confirm({
    title: `確定刪除嗎？`,
    icon: createVNode(ExclamationCircleOutlined),
    content: `${people.name} 將被從資料庫中移除`,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    async onOk() {
      const isSuccess = await $fetch('/api/deletePeople', {
        method: 'POST',
        body: {peopleId: people.id},
      });
      if (isSuccess) {
        peoples.value = peoples.value.filter(e => e.id !== people.id);
      }
    },
  });
}

const templateName = ref<string>('');
async function insertTemplate() {
  const template = peoples.value.filter(e => e.select !== 0).map(e => ({
    peopleId: e.id,
    attendanceType: e.select,
  }));
  await $fetch('/api/template/insert', {
    method: 'POST',
    body: {
      createTime: new Date(),
      name: templateName.value,
      template,
    },
  });

}
</script>
<style scoped>

</style>
