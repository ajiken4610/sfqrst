export default defineNuxtRouteMiddleware(async (to) => {
  const loggedIn = await isLoggedIn();
  if (to.meta["requireId"] && !useUserId()) {
    return navigateTo("/");
  } else if (
    to.meta["requireSAccount"] &&
    loggedIn &&
    !useAuth().currentUser?.email?.match?.(/^.*@salesio-gakuin\.ac\.jp$/)
  ) {
    return navigateTo("/login?redirect=" + to.path);
  } else {
    return null;
  }
});
