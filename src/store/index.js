import Vuex from "vuex";
import Vue from "vue";
import { sweetToast } from './modules/sweet-toast';
import todos from "./modules/todos";
import fakeItMate from "./modules/fakeItMate";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    sweetToast,
    todos,
    fakeItMate,
  },
});
