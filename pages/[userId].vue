<template lang="pug">
div
  NuxtLink.float-end(to="/edit")
    UiIconButton(icon="edit")
  .text-center.display-1 ようこそ、
    br
    | {{ data.name }}さん
  hr
</template>

<script setup lang="ts">
const id = useRoute().params["userId"].toString();
localStorage.setItem("userId", id);
const data = await useUserData();
</script>

<style scoped lang="scss"></style>
