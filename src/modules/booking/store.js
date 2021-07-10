
export default {
  state: {
    bookings: []
  },
  mutations: {
    bookRoom (state, payload) {
      state.bookings.push(payload)
    }
  },
  actions: {
    bookRoom ({ commit }, payload) {
      commit('bookRoom', payload)
    }
  },
  getters: {
    getBookings (state) {
      return state.bookings
    },
    getBookingDetails: (state) => (id) => {
      //* * Store Getters With Query **//
      return state.bookings.find(item => item.id === id)
    },
    getBookingsDates (state) {
      return state.bookings.map(item => item.date)
    }
  }
}
