<template lang="pug">
div
  UiTopAppBar(navIcon="false", contentSelector="#content") サレ祭チケット管理
    template(#toolbar="{ toolbarItemClass }")
      NuxtLink(to="/")
        UiIconButton(:class="toolbarItemClass", icon="qr_code")
  #content
    NuxtPage
</template>

<script setup lang="ts">
useFirebaseApp();
</script>

<style lang="scss">
* {
  margin: 0;
}
</style>
