<template lang="pug">
div(ref="wrapper")
  div(v-if="data")
    h1(v-if="data.reuseable") このチケットは再入場可能です。
    h1(v-else-if="data.used") このチケットは使用済みです。
    h1(v-else) このチケットは未使用です。
    hr
    h2 体温: {{ data.temp || "未入力" }}
    h2 名前: {{ data.name || "未入力" }}
    h2 年齢: {{ data.age || "未入力" }}
    hr
    h2 判定: {{ judgeText() }}
    .d-flex
      UiButton.h4(@click="scanQR", outlined) QRをスキャンする
      UiButton.ms-auto.h4(@click="checkin", raised) 入場！
</template>

<script setup lang="ts">
import type { UserData } from "~~/composables/UserData";
import { useConfirm } from "balm-ui";
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
  data.value.name;
const judgeText = () => (judge() ? "入場可能" : "入場不可");
const checkin = async () => {
  if (!judge()) {
    useConfirm()("条件を満たしていませんが入場しますか？").then(
      async (result: void) => {
        if (typeof result === "boolean") {
          if (result) {
            await saveUserData({ used: true, reuseable: null }, id);
            scanQR();
          }
        }
      }
    );
  } else {
    await saveUserData({ used: true, reuseable: null }, id);
    scanQR();
  }
};
</script>
