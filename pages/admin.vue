<template lang="pug">
div
  h1 {{ useAuth().currentUser.emailVerified ? "アカウントは認証されています" : "アカウントが認証されていません" }}
  UiGrid
    UiGridCell(v-for="button in buttons")
      UiCard(@click="$router.push(button.link)")
        UiCardContent
          UiCardText.h1 {{ button.title }}
          UiCardText.text-muted {{ button.description }}
</template>
<script lang="ts">
const buttons = [
  {
    link: "/checkin",
    title: "入場管理",
    description: "入場管理するときに使用してください",
  },
  {
    link: "/checkout",
    title: "再入場",
    description: "再入場印をつける際に使用してください",
  },
  {
    link: "/input",
    title: "情報入力",
    description: "情報入力用端末にて使用してください",
  },
  {
    link:"/gift",
    title:"景品登録",
    description:"景品をもらった印をつける際に利用して下さい" 
  }
];
</script>
<script setup lang="ts">
import { sendEmailVerification } from "@firebase/auth";

definePageMeta({
  requireSAccount: true,
});
await isLoggedIn();

if (!useAuth().currentUser?.emailVerified) {
  sendEmailVerification(useAuth().currentUser, {
    url: "https://sfqrco.web.app/admin",
  }).then(() => {
    showToast("認証メールを送信しました。Gmailをご確認ください。");
  });
}
</script>
