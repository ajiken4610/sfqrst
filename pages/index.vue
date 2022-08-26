<template lang="pug">
.video-wrapper
  .video
    video(ref="videoElement")
    .region(ref="overlay")
</template>

<script setup lang="ts">
import QrScanner from "qr-scanner";
const videoElement = ref<HTMLVideoElement>();
const overlay = ref<HTMLDivElement>();
let scanner: QrScanner;
onMounted(() => {
  scanner = new QrScanner(
    videoElement.value,
    (result) => {
      let matchResult: RegExpMatchArray;
      if (
        (matchResult = result.data.match(/^https:\/\/sfqrst\.web\.app\/(.*)$/))
      ) {
        scanner.stop();
        useRouter().replace("/" + matchResult[1]);
      } else {
        console.log("error");
      }
    },
    { highlightScanRegion: true, overlay: overlay.value }
  );
  scanner.start();
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
