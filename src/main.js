import Vue from "vue";
import Vuelidate from 'vuelidate';
import App from "./App.vue";
import store from "./store";
import router from "./router";
import 'bootstrap'; // these are js stuff from bootstrap

// Note for sweet alert: 
/* We are just importing our config of it here, and we don't have to use it anywhere in file to work. 
 * It will work globally by iself since that is specified in "sweet-alert/index.js" file. */
import sweetAlert from "./sweet-alert";

// Validation 
Vue.use(Vuelidate)

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");

