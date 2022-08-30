<template lang="pug">
.video-wrapper(ref="wrapper")
  .video
    video(ref="videoElement")
    .region.h2.text-center.text-white(ref="overlay") 
      | QRコード
      UiIcon qr_code
      | を探しています...
</template>

<script setup lang="ts">
import QrScanner from "qr-scanner";
const props = defineProps<{ redirect?: string }>();
const wrapper = ref<HTMLDivElement>();
const videoElement = ref<HTMLVideoElement>();
const overlay = ref<HTMLDivElement>();
if (!QrScanner.hasCamera()) {
  QrScanner.listCameras(true);
}
let scanner: QrScanner;
onMounted(() => {
  const waitUntilAppend = () => {
    if (wrapper.value.matches("body div")) {
      scanner = new QrScanner(
        videoElement.value,
        (result) => {
          let matchResult: RegExpMatchArray;
          if (
            (matchResult = result.data.match(
              /^https:\/\/sfqrco\.web\.app\/(.*)$/
            ))
          ) {
            scanner.stop();
            const redirect = props.redirect?.toString?.();
            const uri =
              (redirect ? redirect + "?q=" : "") + "/" + matchResult[1];
            useRouter().replace(uri);
          } else {
            console.log("error");
          }
        },
        { highlightScanRegion: true, overlay: overlay.value }
      );
      scanner.start();
    } else {
      requestAnimationFrame(waitUntilAppend);
    }
  };
  waitUntilAppend();
});

onUnmounted(() => {
  scanner.stop();
});
</script>
<style scoped lang="scss">
.region {
  border-radius: 25px;
  border: solid 2px white;
}
.video-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.video-wrapper > .video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.video-wrapper .region {
  transform: none !important;
}
</style>
