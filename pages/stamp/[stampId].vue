<template lang="pug">
div(ref="wrapper")
</template>

<script async setup lang="ts">
definePageMeta({ requireId: true });
const id = useRoute().params["stampId"].toString();
await saveUserData({ ["stamps." + id]: true });

const wrapper = ref<HTMLDivElement>();
onMounted(() => {
  const waitUntilAppend = () => {
    if (wrapper.value.matches("body div")) {
      showToast("体温を入力してください");
      useRouter().back();
    } else {
      requestAnimationFrame(waitUntilAppend);
    }
  };
  waitUntilAppend();
});
showToast("スタンプを取得しました");
</script>
