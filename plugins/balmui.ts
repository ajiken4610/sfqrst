import BalmUI from "balm-ui"; // Official Google Material Components
import BalmUIPlus from "balm-ui/dist/balm-ui-plus"; // BalmJS Team Material Components
import "balm-ui/dist/balm-ui.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(BalmUI);
  nuxtApp.vueApp.use(BalmUIPlus);
});
