import { mapGetters } from 'vuex'
import moment from 'moment'
import useVuelidate from '@vuelidate/core'
import { numeric, required } from '@vuelidate/validators'

export default {
  name: 'booking-modifications',
  props: ['id'],
  data () {
    return {
      v$: useVuelidate(),
      todayDate: moment(new Date()).format('YYYY-MM-DD'),
      booking: {
        name: '',
        phone: '',
        date: moment(new Date()).format('YYYY-MM-DD'),
        endDate: null,
        room: { id: '', title: '' },
        duration: null,
        beds: null,
        price: null
      },
      roomBusy: false,
      roomBusyMsg: 'selected room is already booked in this time, please choose another room'
    }
  },
  mounted () {
    this.getInitialData()
  },

  validations () {
    return {
      booking: {
        name: { required },
        phone: { required, numeric },
        date: {
          required
        },
        room: {
          id: { required },
          title: { required }
        },
        duration: { required, numeric },
        beds: { required, numeric }
      }
    }
  },

  methods: {

    getInitialData () {
      if (this.id) {
        this.booking = { ...this.$store.getters.getBookingDetails(this.id) }
      }
    },

    uniqueID () {
      return `_${Math.random().toString(36).substr(2, 9)}`
    },

    roomValidation () {
      const busyRoom = this.bookingList.filter(item => {
        if (this.id !== item.id) {
          // Compare selected Date with all Booking period date
          const currentDate = new Date(this.booking.date).getTime()
          const startPeriodDate = new Date(item.date).getTime()
          const lastPeriodDate = new Date(item.endDate).getTime()
          const final = currentDate >= startPeriodDate && currentDate <= lastPeriodDate
          // Check if current date inside another periods or not
          if (final && item.room.id === this.booking.room.id) {
            return item
          }
        }
      })
      if (busyRoom.length) {
        this.roomBusy = true
        this.$toast.warning(this.roomBusyMsg)
      } else {
        this.roomBusy = false
      }
    },

    setDate (event) {
      this.booking.date = event.target.value
      this.roomValidation()
    },

    mappingData () {
      /* Set data */
      this.booking.id = this.id || this.uniqueID()
      this.booking.price = this.price
      /* Set End Date = startDate + period time of booking */
      const endDate = new Date(this.booking.date)
      endDate.setDate(endDate.getDate() + this.booking.duration)
      this.booking.endDate = moment(endDate).format('YYYY-MM-DD')
      this.cancel()
    },
    setStoreData () {
      const storeAction = this.id ? 'updateBooking' : 'bookRoom'
      this.$store.dispatch(storeAction, this.booking);
      (storeAction === 'bookRoom')
        ? this.$toast.success('Booked Successfully')
        : this.$toast.success('Updated Successfully')
    },
    submitForm () {
      // Run Validator Before Submit
      this.roomValidation()
      this.v$.$validate()
      if (!this.v$.$error && !this.roomBusy) {
        this.mappingData()
        this.setStoreData()
        this.cancel()
      }
    },

    cancel () {
      this.$router.push({ name: 'bookingList' })
    }
  },
  computed: {
    ...mapGetters({ bookingList: 'getBookingList' }),

    ...mapGetters({ durations: 'getDays' }),

    ...mapGetters({ rooms: 'getRooms' }),

    price () {
      const bedsCost = this.booking.beds ? this.booking.beds * 50 : 0
      const seeViewCost = (this.booking.room.id === 1 || this.booking.room.id === 2) ? bedsCost * 0.20 : 0
      return (bedsCost + seeViewCost) * this.booking.duration
    }
  }
}
