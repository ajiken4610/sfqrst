<template lang="pug">
div
</template>

<script setup lang="ts">
const id = useRoute().params["userId"].toString();
localStorage.setItem("userId", id);
const data = useUserData();
console.log((await data).value);
</script>
