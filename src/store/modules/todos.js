import axios from 'axios';
import { startsWith } from '../../common/methods';

const state = {
  todos: []
};

const getters = {
  allTodos: state => state.todos
};

const actions = {
  async fetchTodos({ dispatch, commit }) {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/todos'
    )
      .then(response => {
        //  200 statuses are good
        if (startsWith(response.status + "", "2")) {
          dispatch('sweetToast/success', "Data fetched!", { root: true });
          commit('setTodos', response.data);
        }
        // Others are not
        else {
          dispatch('sweetToast/error', "ERROR MATEY!", { root: true });
        }
      })
      .catch(e => {
        dispatch('sweetToast/error', e.message, { root: true });
      });
  },
  async addTodo({ dispatch, commit }, title) {
    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/todos',
      { title, completed: false }
    )
      .then(response => {
        //  200 statuses are good
        if (startsWith(response.status + "", "2")) {
          dispatch('sweetToast/success', "Todo added!", { root: true });
          commit('newTodo', response.data);
        }
        // Others are not
        else {
          dispatch('sweetToast/error', "ERROR MATEY!", { root: true });
        }
      })
      .catch(e => {
        dispatch('sweetToast/error', e.message, { root: true });
      });
  },
  async deleteTodo({ dispatch, commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(response => {
        //  200 statuses are good
        if (startsWith(response.status + "", "2")) {
          dispatch('sweetToast/info', "TODO deleted!", { root: true });
          commit('removeTodo', response.data);
        }
        // Others are not
        else {
          dispatch('sweetToast/error', "ERROR MATEY!", { root: true });
        }
      })
      .catch(e => {
        dispatch('sweetToast/error', e.message, { root: true });
      });
  },
  async filterTodos({ dispatch, commit }, e) {
    // Get selected number
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );

    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    )
      .then(response => {
        //  200 statuses are good
        if (startsWith(response.status + "", "2")) {
          dispatch('sweetToast/info', "Data fetched!", { root: true });
          commit('setTodos', response.data);
        }
        // Others are not
        else {
          dispatch('sweetToast/error', "ERROR MATEY!", { root: true });
        }
      })
      .catch(e => {
        dispatch('sweetToast/error', e.message, { root: true });
      });
  },
  async updateTodo({ dispatch, commit }, updTodo) {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
      updTodo
    )
      .then(response => {
        //  200 statuses are good
        if (startsWith(response.status + "", "2")) {
          dispatch('sweetToast/warning', "Todo updated!", { root: true });
          commit('updateTodo', response.data);
        }
        // Others are not
        else {
          dispatch('sweetToast/error', "ERROR MATEY!", { root: true });
        }
      })
      .catch(e => {
        dispatch('sweetToast/error', e.message, { root: true });
      });
  }
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter(todo => todo.id !== id)),
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};

