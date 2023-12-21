<template>
  <div style="padding: 8px 24px 24px; background: #fff; margin-bottom: 16px;">
    <a-space size="middle" style="margin: 16px 0">
      <a-button type="primary" size="small" @click="active(true)">
        <CaretDownOutlined />
        展開全部
      </a-button>
      <a-button type="primary" size="small" @click="active(false)">
        <CaretUpOutlined />
        摺疊全部
      </a-button>
    </a-space>
    <a-collapse v-for="body in bodys" v-model:activeKey="body.activeKey" collapsible="header" style="margin-bottom: 16px">
      <a-collapse-panel :header="new Date(body.createTime).toLocaleString() as never">
        <a-flex justify="space-around" wrap="wrap">
          <a-card v-for="record in body.record" :title="record.status">
            <ul>
              <li v-for="username in record.username" style="margin-bottom: 8px">
                {{ username }}
              </li>
            </ul>
          </a-card>
        </a-flex>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script lang="ts" setup>
const record = await $fetch('/api/record/get');
const peoples = await $fetch('/api/people/get');
const bodys = ref<BodyType[]>([]);

refreshBodys();

function active(open: boolean) {
  bodys.value.forEach((body) => {
    body.activeKey = open ? 0 : 1;
  });
}

function refreshBodys() {
  bodys.value = record.map((item): BodyType => {
    const recordItem = item.record.reduce((group, product) => {
      const username = peoples.find(people => people._id.toString() === product.peopleId)?.name ?? '未知';
      const findResult = group.find(e => e.status === product.status);
      if (findResult) {
        findResult.username.push(username);
      } else {
        group.push({
          status: product.status,
          username: [username],
        });
      }
      return group;
    }, [] as { status: string; username: string[]; }[]);
    return {
      activeKey: 1,
      createTime: item.createTime,
      record: recordItem,
    }
  });
}

interface BodyType {
  activeKey: number;
  createTime: string;
  record: {
    status: string;
    username: string[];
  }[];
}
</script>
<style scoped>

</style>
