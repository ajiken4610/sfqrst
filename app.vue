<template lang="pug">
div
  UiTopAppBar(
    v-if="useRoute().path !== '/'",
    :navIcon="false",
    contentSelector="#content"
  ) サレ祭チケット管理
    template(#toolbar="{ toolbarItemClass }")
      NuxtLink(to="/")
        UiIconButton(:class="toolbarItemClass", icon="qr_code")
      NuxtLink.float-end(to="/edit", v-if="useUserId().value")
        UiIconButton(:class="toolbarItemClass", icon="edit")
  #content(:class="{ container: useRoute().path !== '/' }")
    NuxtPage
</template>

<script setup lang="ts">
useFirebaseApp();
</script>

<style lang="scss">
// Custom.scss
// Option B: Include parts of Bootstrap
// 1. Include functions first (so you can manipulate colors, SVGs, calc, etc)
@import "bootstrap/scss/functions";

// 2. Include any default variable overrides here
// Default variable overrides

// 3. Include remainder of required Bootstrap stylesheets
@import "bootstrap/scss/variables";
@import "bootstrap/scss/mixins";

@import "bootstrap/scss/maps";

// 4. Include any optional Bootstrap components as you like

@import "bootstrap/scss/root";
@import "bootstrap/scss/reboot";
@import "bootstrap/scss/containers";
@import "bootstrap/scss/utilities";
@import "bootstrap/scss/type";
@import "bootstrap/scss/helpers";
@import "bootstrap/scss/utilities/api";
.container {
  padding-top: 1rem;
}
</style>
