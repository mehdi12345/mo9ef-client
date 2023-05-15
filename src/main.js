import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import Select2 from "vue3-select2-component";
import { createI18n } from "vue-i18n";
import ar from "./i18n/ar.json";
import fr from "./i18n/fr.json";

const i18n = createI18n({
  locale: "fr",
  messages: {
    fr: fr,
    ar: ar,
  },

  fallbackLocale: "en",
});
createApp(App).use(store).use(router).use(i18n).mount("#app");
// .component("Select2", Select2);
