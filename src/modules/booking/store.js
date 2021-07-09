
export default {
  state: {
    bookings: []
  },
  mutations: {
    bookAppointment (state, payload) {
      state.bookings.push(payload)
    }
  },
  actions: {
    bookAppointment ({ commit }, payload) {
      commit('bookAppointment', payload)
    }
  },
  getters: {
    getAppointments (state) {
      return state.bookings
    }
  }
}
