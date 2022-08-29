<template lang="pug">
div(ref="wrapper")
  .full(v-if="data", :class="[judge() ? 'bg-green' : 'bg-red']")
    .top-50.start-50.translate-middle.w-100
      .display-1.text-center {{ judgeText() }}
      UiIcon.icon.d-block.text-center {{ judge() ? "keyboard_double_arrow_up" : "error_outline" }}
      .display-1.text-center(v-if="reason()") {{ reason() }}
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
const judge = () => {
  let reuseable = false;
  if (data.value.used) {
    // @ts-ignore
    const usedDate = new Date(data.value.used.seconds * 1000);
    const now = new Date();
    if (
      usedDate.getHours() < 12 ||
      (usedDate.getHours() === 12 && usedDate.getMinutes() < 30)
    ) {
      // 午前中に入場
      if (
        data.value.reuseable &&
        (now.getHours() < 12 ||
          (now.getHours() === 12 && now.getMinutes() < 30))
      ) {
        reuseable = true;
      }
    } else {
      // 午後に入場
      reuseable = data.value.reuseable;
    }
  }
  return (
    (!data.value.used || reuseable) &&
    (data.value.temp || 1000) < 37.2 &&
    data.value.name
  );
};
const judgeText = () => (judge() ? "入場可能" : "入場不可");
const checkin = async () => {
  await saveUserData({ used: new Date(), reuseable: null }, id);
  setTimeout(() => {
    scanQR();
  }, 2000);
};
const reason = () => {
  if (data.value.used) {
    // @ts-ignore
    const usedDate = new Date(data.value.used.seconds * 1000);
    const now = new Date();
    if (
      usedDate.getHours() < 12 ||
      (usedDate.getHours() === 12 && usedDate.getMinutes() < 30)
    ) {
      // 午前中に入場
      if (
        data.value.reuseable &&
        (now.getHours() < 12 ||
          (now.getHours() === 12 && now.getMinutes() < 30))
      ) {
        return "";
      } else {
        return "午前中に既に入場しています";
      }
    } else {
      // 午後に入場
      return data.value.reuseable ? "" : "チケットは使用済みです";
    }
  } else if (!data.value.temp) {
    return "体温を入力してください";
  } else if (!((data.value.temp || 1000) < 37.2)) {
    return "体温が不正です";
  } else if (!data.value.name) {
    return "名前を入力してください";
  } else {
    return "";
  }
};
if (data.value) {
  if (judge()) {
    console.log("入場");
    speechSynthesis.speak(
      new SpeechSynthesisUtterance(
        data.value.name +
          "さん、" +
          (data.value.reuseable ? "おかえりなさい" : "ようこそ")
      )
    );
    checkin();
  } else {
    console.log("入場不可");
    speechSynthesis.speak(new SpeechSynthesisUtterance(reason()));
    setTimeout(() => {
      scanQR();
    }, 2000);
  }
}
</script>
