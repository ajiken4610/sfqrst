<template lang="pug">
div
  NuxtPage
</template>

<script setup lang="ts">
const app = useFirebaseApp();
console.log(app);
</script>

<style lang="scss">
* {
  margin: 0;
}
</style>
