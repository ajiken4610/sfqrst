<template lang="pug">
div(ref="wrapper")
  .full(v-if="data", :class="[judge() ? 'bg-green' : 'bg-red']")
    .top-50.start-50.translate-middle.w-100
      .display-1.text-center {{ judgeText() }}
      UiIcon.icon.d-block.text-center done
</template>

<style scoped lang="scss">
.full {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  color: white;
}
.full > * {
  position: absolute;
}
.bg-green {
  background-color: green;
}
.bg-red {
  background-color: red;
}
.icon {
  font-size: 50vmin;
}
</style>

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
  useRouter().replace("/?redirect=/gift");
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
const judge = () => true;
const judgeText = () => "景品取得処理完了";
const giftReceive = async () => {
  await saveUserData({ giftReceived:true }, id);
  setTimeout(() => {
    scanQR();
  }, 2000);
};

if (data.value) {
  await giftReceive();
  console.log("景品");

}
</script>
