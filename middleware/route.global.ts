export default defineNuxtRouteMiddleware((to) => {
  if (to.meta["requireId"] && !useUserId().value) {
    return navigateTo("/");
  } else {
    return null;
  }
});
