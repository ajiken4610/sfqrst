<template lang="pug">
div(ref="wrapper")
  div(v-if="data")
    h1(v-if="!data.used || data.reuseable") このチケットは未使用です。
    h1(v-else) このチケットは使用済みです。
    hr
    h2 体温: {{ data.temp || "未入力" }}
    h2 名前: {{ data.name || "未入力" }}
    h2 年齢: {{ data.age || "未入力" }}
    hr
    h2 判定: {{ judge() }}
    .d-flex
      UiButton.h4(@click="scanQR", outlined) QRをスキャンする
      UiButton.ms-auto.h4(@click="checkin", raised) 入場！
</template>

<script setup lang="ts">
import type { UserData } from "~~/composables/UserData";

definePageMeta({
  requireSAccount: true,
});
const wrapper = ref<HTMLDivElement>();
const data = ref<UserData>();
let id: string;
const scanQR = () => {
  showToast("QRをスキャンしてください");
  useRouter().replace("/?redirect=/checkin");
};
if (useRoute().query["q"]) {
  id = useRoute().query["q"].toString().split("/")[1];
  data.value = (await useUserData(id)).value;
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
const judge = () =>
  (!data.value.used || data.value.reuseable) &&
  (data.value.temp || 1000) < 37.2 &&
  data.value.age &&
  data.value.name
    ? "入場可能"
    : "入場不可";
const checkin = async () => {
  await saveUserData({ used: true }, id);
};
</script>
