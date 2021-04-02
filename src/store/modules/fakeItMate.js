const state = {};

const getters = {};

const actions = {
  fakeSuccess({ dispatch, commit }, message) {
    // Do api calls, some kind of logic or something else then dispach message
    dispatch("sweetToast/success", "Fake success", { root: true });
  },
  fakeError({ dispatch, commit }, message) {
    // Do api calls, some kind of logic or something else then dispach message
    dispatch("sweetToast/error", "Fake error", { root: true });
  },
  fakeWarning({ dispatch, commit }, message) {
    // Do api calls, some kind of logic or something else then dispach message
    dispatch("sweetToast/warning", "Fake warning", { root: true });
  },
  fakeInfo({ dispatch, commit }, message) {
    // Do api calls, some kind of logic or something else then dispach message
    dispatch("sweetToast/info", "Fake info", { root: true });
  },
  fakeQuestion({ dispatch, commit }, message) {
    // Do api calls, some kind of logic or something else then dispach message
    dispatch("sweetToast/question", "Fake question", { root: true });
  },
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
