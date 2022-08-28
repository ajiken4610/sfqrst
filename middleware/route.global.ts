export default defineNuxtRouteMiddleware((to) => {
  if (to.meta["requireId"] && !useUserId()) {
    return navigateTo("/");
  } else {
    return null;
  }
});
