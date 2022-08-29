<template lang="pug">
div(ref="wrapper")
  div(v-if="id")
    Editor
</template>
<script setup lang="ts">
const id = useRoute().query["q"]?.toString();
const scanQR = () => {
  useRouter().push("/?redirect=/input");
};
const wrapper = ref<HTMLDivElement>();
if (id) {
  useUserId().value = id;
} else {
  onMounted(() => {
    const waitUntilAppend = () => {
      if (wrapper.value.matches("body div")) {
        scanQR();
      } else {
        requestAnimationFrame(waitUntilAppend);
      }
    };
    waitUntilAppend();
  });
}
watch(useRoute(), (route) => {
  if (!route.query["q"]?.toString()) {
    scanQR();
  }
});
</script>
