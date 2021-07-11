
export default {
  state: {
    bookingList: JSON.parse(localStorage.getItem('bookingList')) || []
  },
  mutations: {
    bookRoom (state, payload) {
      state.bookingList.push(payload)
      localStorage.setItem('bookingList', JSON.stringify(state.bookingList))
    },
    updateBooking (state, payload) {
      const idx = state.bookingList.findIndex(item => item.id === payload.id)
      state.bookingList.splice(idx, 1, payload)
      localStorage.setItem('bookingList', JSON.stringify(state.bookingList))
    },
    removeBooking (state, payload) {
      const idx = state.bookingList.findIndex(item => item.id === payload)
      state.bookingList.splice(idx, 1)
      localStorage.setItem('bookingList', JSON.stringify(state.bookingList))
    }
  },
  actions: {
    bookRoom ({ commit }, payload) {
      commit('bookRoom', payload)
    },
    updateBooking ({ commit }, payload) {
      commit('updateBooking', payload)
    },
    removeBooking ({ commit }, payload) {
      commit('removeBooking', payload)
    }
  },
  getters: {
    getBookingList (state) {
      return state.bookingList
    },
    getBookingDetails: (state) => (id) => {
      //* * Store Getters With Query **//
      return state.bookingList.find(item => item.id === id)
    }
  }
}
