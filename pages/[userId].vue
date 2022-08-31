<template lang="pug">
div(ref="wrapper")
  .text-muted.text-center QRコードをかざす際は
    br
    | 画面の明るさを最大にしてください。
  img.d-block.mx-auto(:src="ticketQR")
  h4.text-muted.text-center {{ data.name }}さん
  hr
  UiGrid(v-if="Object.keys(data.stamps).length")
    UiGridCell(v-for="key of Object.keys(data.stamps).sort()", columns="2")
      UiCard
        UiCardContent
          UiCardText.h1.text-center {{ stamps[key].name }}
  .text-center.text-muted(v-else) 所持しているスタンプはありません。
  template(v-if="!data.giftReceived")
    UiButton.text-muted.d-block.mx-auto(
      ,
      icon="help_outline",
      @click="toggleStampHelp"
    ) スタンプについて
    .text-center(v-if="stampHelpShown") 校内でスタンプのQRを見つけたら、右上の
      UiIcon qr_code
      | より読み込んでください。
      br
      | 4つ集めると受付にて景品と交換できます。
  .text-center(v-else) 景品を受け取り済みです
  .text-center(v-if="giftExist") {{ giftExist }}
</template>

<script async setup lang="ts">
import QRCode from "qrcode";
useUserId().value = useRoute().params["userId"].toString();
const giftExistBoolean = getGiftExist().asBoolean();
const giftExist = giftExistBoolean ? "" : "景品はなくなりました";
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
QRCode.toDataURL("https://sfqrco.web.app/" + id, (err, url: string) => {
  err && console.log(err);
  ticketQR.value = url;
});
useUserId().value = id;

const stamps = await useStamps();
const stampHelpShown = ref(false);
const toggleStampHelp = () => {
  stampHelpShown.value = !stampHelpShown.value;
};
</script>

<style scoped lang="scss"></style>
