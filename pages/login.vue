<template lang="pug">
div
  h1.text-center 管理コンソールへログイン
  .text-center.text-muted 管理権限はお持ちですか？
  div(ref="element")
</template>
<script setup lang="ts">
import { EmailAuthProvider, GoogleAuthProvider } from "@firebase/auth";

import "firebaseui/dist/firebaseui.css";

const element = ref<HTMLDivElement>();
onMounted(() => {
  useAuth().signOut();
  const ui = useUI();
  ui.start(element.value, {
    signInOptions: [
      GoogleAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: "/admin",
  });
});
</script>
