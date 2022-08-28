<template lang="pug">
div {{ useAuth().currentUser.email }},{{ useAuth().currentUser.emailVerified }}
</template>
<script setup lang="ts">
import { sendEmailVerification } from "@firebase/auth";

definePageMeta({
  requireSAccount: true,
});
await isLoggedIn();

if (!useAuth().currentUser.emailVerified) {
  sendEmailVerification(useAuth().currentUser, {
    url: "https://sfqrst.web.app/admin",
  }).then(() => {
    showToast("認証メールを送信しました。Gmailをご確認ください。");
  });
}
</script>
