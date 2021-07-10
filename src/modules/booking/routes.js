import bookingList from './components/booking-list/booking-list.vue'
import bookingModification from './components/booking-modifications/booking-modifications.vue'
export default [
  {
    path: '',
    name: 'bookingList',
    component: bookingList,
    props: false
  },
  {
    path: '/create',
    name: 'createBooking',
    component: bookingModification,
    props: false
  },
  {
    path: '/edit/:id',
    name: 'editBooking',
    component: bookingModification,
    props: true
  }
  /*
  {
    path: 'unit-planner',
    name: 'plannerContainer',
    component: plannerContainer,
    props: true,
    meta: {
      rule: 'Teacher'
    }
  } */
]
