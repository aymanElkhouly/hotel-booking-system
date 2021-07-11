
export default {
  state: {
    bookingList: JSON.parse(localStorage.getItem('bookingList')) || [],
    rooms: [
      {
        id: 1,
        title: 'Sea_view1'
      },
      {
        id: 2,
        title: 'Sea_view2'
      },
      {
        id: 3,
        title: 'Garden_view1'
      },
      {
        id: 4,
        title: 'Garden_view2'
      }
    ],
    durations: [
      {
        id: 1,
        title: 'Day'
      },
      {
        id: 2,
        title: '2 Days'
      },
      {
        id: 3,
        title: '3 Days'
      },
      {
        id: 4,
        title: '4 Days'
      },
      {
        id: 5,
        title: '5 Days'
      },
      {
        id: 6,
        title: '6 Days'
      },
      {
        id: 7,
        title: '7 Days'
      }
    ]
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
    },
    getRooms (state) {
      return state.rooms
    },
    getDays (state) {
      return state.durations
    }
  }
}
