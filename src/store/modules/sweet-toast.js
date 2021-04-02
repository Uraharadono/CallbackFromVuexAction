export const sweetToast = {
  namespaced: true,
  getters: {
    // currentToast =>
    currentToast: (state) => state,
  },
  state: {
    // variables user can control
    icon: "",
    title: "",

    // variable that is being "watched" in our App.vue
    ticks: null,
    // variable that stores global "this.$swal" so we can call functions from it
    globalSwal: null,

    // default values to make this look like actual toaster
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: function(toast) {
      const self = this;
      toast.addEventListener("mouseenter", self.globalSwal.stopTimer);
      toast.addEventListener("mouseleave", self.globalSwal.resumeTimer);      
    },
  },
  actions: {
    success({ commit }, message) {
      commit("success", message);
    },
    error({ commit }, message) {
      commit("error", message);
    },
    warning({ commit }, message) {
      commit("warning", message);
    },
    info({ commit }, message) {
      commit("info", message);
    },
    question({ commit }, message) {
      commit("question", message);
    },
    // Util actions
    setGlobalSwal({ commit }, swal) {
      commit("setGlobalSwal", swal);
    },
    clear({ commit }) {
      commit("clear");
    },
  },
  mutations: {
    success(state, message) {
      state.title = message;
      state.icon = "success";
      state.ticks = new Date().getTime();
    },
    error(state, message) {
      state.title = message;
      state.icon = "error";
      state.ticks = new Date().getTime();
    },
    warning(state, message) {
      state.title = message;
      state.icon = "warning";
      state.ticks = new Date().getTime();
    },
    info(state, message) {
      state.title = message;
      state.icon = "info";
      state.ticks = new Date().getTime();
    },
    question(state, message) {
      state.title = message;
      state.icon = "question";
      state.ticks = new Date().getTime();
    },
    // Util mutations
    setGlobalSwal(state, swal) {
      state.globalSwal = swal;
    },
    clear(state) {
      state.title = null;
      state.icon = null;
    },
  },
};
