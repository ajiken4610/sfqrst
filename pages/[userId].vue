<template lang="pug">
div
  img.d-block.mx-auto(:src="ticketQR")
  .text-center.display-1 ようこそ
  .text-muted.text-center {{ data.name }}さん
  hr
  UiGrid(v-if="Object.keys(data.stamps).length")
    UiGridCell
      UiCard(v-for="(_val, key) in data.stamps")
        UiCardContent
          UiCardText.h1 {{ stamps[key].name }}
          UiCardText.text-muted {{ stamps[key].description }}
  .text-center.text-muted(v-else) 所持しているスタンプはありません。
</template>

<script setup lang="ts">
import QRCode from "qrcode";
const id = useRoute().params["userId"].toString();
const ticketQR = ref("");
QRCode.toDataURL("https://sfqrst.web.app/" + id, (err, url: string) => {
  err && console.log(err);
  ticketQR.value = url;
});
useUserId().value = id;
const data = await useUserData();
const stamps = await useStamps();
</script>

<style scoped lang="scss"></style>
