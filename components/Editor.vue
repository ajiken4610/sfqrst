<template lang="pug">
.edit-field-wrapper
  .h1 チケットの情報
  UiTextfield.w-100(v-model="data.name") 名前
  UiTextfield.w-100(v-model.number="data.age", inputType="number") 年齢
  UiSelect.w-100(
    v-model.number="data.arriveSchedule",
    :disabled="data.isArriveScheduleConstraint",
    :options="[ { label: '', value: ' ' }, { label: '17日(土)午前', value: 'am17' }, { label: '17日(土)午後', value: 'pm17' }, { label: '18日(日)午前', value: 'am18' }, { label: '18日(日)午後', value: 'pm18' }, ]"
  ) 来場日時
  UiTextfield.w-100(
    v-if="isToday()",
    v-model.number="data.temp",
    inputType="number"
  ) 体温
  .d-flex
    .ms-auto
      UiButton.me-1(outlined, @click="goBack") キャンセル
      UiButton(raised, @click="save") 保存
</template>

<script setup lang="ts">
const data = reactive({ ...(await useUserData()).value });
const goBack = () => history.back();
const save = async () => {
  try {
    await saveUserData(data);
    showToast("データは正常に保存されました。");
    goBack();
  } catch (e) {
    console.error(e);
    showToast("データの保存に失敗しました。");
  }
};
</script>

<style scoped lang="scss">
.edit-field-wrapper > :not(:last-child) {
  margin-bottom: 0.5rem;
}
</style>
