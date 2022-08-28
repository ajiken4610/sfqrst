const userId = ref(localStorage.getItem("userId"));
watchEffect(() => {
  localStorage.setItem("userId", userId.value);
});
export const useUserId = () => userId;
