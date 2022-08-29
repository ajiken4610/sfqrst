<template lang="pug">
div(ref="wrapper")
  .text-muted.text-center QRコードをかざす際は
    br
    | 画面の明るさを最大にしてください。
  img.d-block.mx-auto(:src="ticketQR")
  h4.text-muted.text-center {{ data.name }}さん
  hr
  UiGrid(v-if="Object.keys(data.stamps).length")
    UiGridCell
      UiCard(v-for="(_val, key) in data.stamps")
        UiCardContent
          UiCardText.h1 {{ stamps[key].name }}
          UiCardText.text-muted {{ stamps[key].description }}
  .text-center.text-muted(v-else) 所持しているスタンプはありません。
</template>

<script async setup lang="ts">
import QRCode from "qrcode";
useUserId().value = useRoute().params["userId"].toString();
const data = await useUserData();
const wrapper = ref<HTMLDivElement>();
if (!data.value.temp && isToday()) {
  onMounted(() => {
    const waitUntilAppend = () => {
      if (wrapper.value.matches("body div")) {
        useRouter().push("/edit");
      } else {
        requestAnimationFrame(waitUntilAppend);
      }
    };
    waitUntilAppend();
  });
}
const id = useRoute().params["userId"].toString();
const ticketQR = ref("");
QRCode.toDataURL("https://sfqrst.web.app/" + id, (err, url: string) => {
  err && console.log(err);
  ticketQR.value = url;
});
useUserId().value = id;

const stamps = await useStamps();
</script>

<style scoped lang="scss"></style>
