<template>
  <li v-for="people in data.docs">
    {{ people.name }}
  </li>
</template>
<script lang="ts" setup>
const {data} = await useFetch('/api/getData');
</script>
<style scoped>

</style>
