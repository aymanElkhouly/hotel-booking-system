import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'booking-modifications',
  props: ['id'],
  components: {},
  data () {
    return {
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
      isValidBooking: false,
      todayDate: moment(new Date()).format('YYYY-MM-DD'),
      rooms: [],
      durations: [],
      roomBusyMsg: 'selected room is already booked in this time, please choose another room'
    }
  },
  mounted () {
    this.getInitialData()
    if (this.id) {
      this.booking = { ...this.$store.getters.getBookingDetails(this.id) }
    }
  },
  methods: {
    getInitialData () {
      this.rooms = [
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
      ]

      this.durations = [
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
    uniqueID () {
      return `_${Math.random().toString(36).substr(2, 9)}`
    },
    roomValidation () {
      const roomBusy = this.bookingList.find(item => {
        // Compare selected Date with all Booking period date
        const currentDate = new Date(this.booking.date).getTime()
        const bookedDate = new Date(item.endDate).getTime()
        if (currentDate <= bookedDate && item.room.id === this.booking.room.id) {
          return item
        }
      })
      if (roomBusy) {
        this.isValidBooking = false
        this.$toast.warning(this.roomBusyMsg)
      }
    },
    validateDate (event) {
      this.booking.date = event.target.value
      this.roomValidation()
    },
    create () {
      this.mappingData()
      const storeAction = this.id ? 'updateBooking' : 'bookRoom'
      this.$store.dispatch(storeAction, this.booking)
    },
    mappingData () {
      /* Simulate data */
      this.booking.id = this.id || this.uniqueID()
      this.booking.price = this.price
      /* Set End Date = startDate + period time of booking */
      const endDate = new Date(this.booking.date)
      endDate.setDate(endDate.getDate() + this.booking.duration)
      this.booking.endDate = moment(endDate).format('YYYY-MM-DD')
      this.cancel()
    },
    cancel () {
      this.$router.push({ name: 'bookingList' })
    }
  },
  computed: {
    ...mapGetters({ bookingList: 'getBookingList' }),
    price () {
      const bedsCost = this.booking.beds ? this.booking.beds * 50 : 0
      const seeViewCost = (this.booking.room.id === 1 || this.booking.room.id === 2) ? bedsCost * 0.20 : 0
      return (bedsCost + seeViewCost) * this.booking.duration
    }
  }
}
