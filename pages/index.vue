<template lang="pug">
div
  QRReader(:redirect="redirect")
</template>
<script setup lang="ts">
const redirect = useRoute().query["redirect"];
</script>
