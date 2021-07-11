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
        date: { required },
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
      // check if room is busy based on periods & room id
      const busyRoom = this.bookingList.filter(item => {
        if (this.id !== item.id) {
          // Set Start & end dates as time to compare it
          const bookingDate = {
            start: new Date(this.booking.date).getTime(),
            end: new Date(this.getFutureDate(this.booking.date, this.booking.duration)).getTime()
          }
          const periods = {
            start: new Date(item.date).getTime(),
            end: new Date(item.endDate).getTime()
          }
          // Compare Cases //
          /// ///////////////
          // Case 1- check if start of booking not inside on another period
          const case1 = bookingDate.start >= periods.start && bookingDate.start <= periods.end
          // Case 2- check if end of booking not inside on another period
          const case2 = bookingDate.end >= periods.start && bookingDate.end <= periods.end
          // Case 3- check if period not inside in current booking period
          const case3 = bookingDate.start < periods.start && bookingDate.end > periods.end
          const checkRoom = this.booking.room.id === item.room.id
          if ((case1 || case2 || case3) && checkRoom) {
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
      this.booking.endDate = this.getFutureDate(this.booking.date, this.booking.duration)
    },
    getFutureDate (currentDate, days = 0) {
      days = (days > 1) ? days : 0
      const finalDate = new Date(currentDate)
      finalDate.setDate(finalDate.getDate() + days)
      return moment(finalDate).format('YYYY-MM-DD')
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
