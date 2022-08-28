<template lang="pug">
div
  .text-center.display-1 ようこそ
  .text-muted.text-center {{ data.name }}さん
  hr
</template>

<script setup lang="ts">
const id = useRoute().params["userId"].toString();
useUserId().value = id;
const data = await useUserData();
</script>

<style scoped lang="scss"></style>
