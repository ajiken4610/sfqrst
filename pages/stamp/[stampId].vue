<template lang="pug">
div
</template>

<script setup lang="ts">
definePageMeta({ requireId: true });
await saveUserData({ ["stamps." + useRoute().params["stampId"]]: true });
</script>
