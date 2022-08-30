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
const calTimeRegion = (date: Date) => {
  return (
    date.getDate() * 2 +
    (date.getHours() < 12 || (date.getHours() === 12 && date.getMinutes() < 30)
      ? 0
      : 1)
  );
};
const judge = () => {
  const reuseable = data.value.reuseable;
  if (data.value.used) {
    // @ts-ignore
    const usedDate = new Date(data.value.used.seconds * 1000);
    const now = new Date();

    const usedTimeRegion = calTimeRegion(usedDate);
    const nowTimeRegion = calTimeRegion(now);
    if (reuseable && usedTimeRegion == nowTimeRegion) {
      // 再入場
      return (data.value.temp || 1000) < 37.5 && data.value.name;
    } else {
      // 再入場不可
      return false;
    }
  }
  return (data.value.temp || 1000) < 37.5 && data.value.name;
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
    const reuseable = data.value.reuseable;
    const usedTimeRegion = calTimeRegion(usedDate);
    const nowTimeRegion = calTimeRegion(now);
    if (reuseable && usedTimeRegion == nowTimeRegion) {
      return "WELCOME BACK";
    } else {
      return reuseable ? "再入場期限を過ぎています" : "チケットは使用済みです";
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
    await checkin();
    console.log("入場");
    speechSynthesis.speak(
      new SpeechSynthesisUtterance(
        data.value.name +
          "さん、" +
          (data.value.reuseable ? "おかえりなさい" : "ようこそ")
      )
    );
  } else {
    console.log("入場不可");
    speechSynthesis.speak(new SpeechSynthesisUtterance(reason()));
    setTimeout(() => {
      scanQR();
    }, 2000);
  }
}
</script>
