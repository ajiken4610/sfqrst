<template lang="pug">
div
  .h1 404 NOT FOUND
  .text-muted {{ useRoute().query["path"] || useRoute().path }} はこのページに存在しません。
</template>
