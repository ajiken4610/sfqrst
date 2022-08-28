<template lang="pug">
.video-wrapper(ref="wrapper")
  .video
    video(ref="videoElement")
    .region.text-center.text-white(ref="overlay") QRコードを探しています...
</template>

<script setup lang="ts">
import QrScanner from "qr-scanner";
// console.log(window.innerHeight);
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
              /^https:\/\/sfqrst\.web\.app\/(.*)$/
            ))
          ) {
            scanner.stop();
            useRouter().replace({
              path: "/" + matchResult[1],
              query: useRoute().query,
            });
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
.video-wrapper > .video,
.video-wrapper.region {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
