export default {
  name: 'booking-modifications',
  props: ['id'],
  components: {},
  data () {
    return {
      booking: {
        name: '',
        phone: '',
        date: '',
        room: '',
        duration: null,
        beds: null,
        price: null
      },
      roomViews: [],
      durations: []
    }
  },
  created () {
    // console.log('Current Id', this.id)
  },
  mounted () {
    this.getInitialData()
  },
  methods: {
    getInitialData () {
      this.rooms = [
        { id: 1, title: 'Sea_view1' },
        { id: 2, title: 'Sea_view2' },
        { id: 3, title: 'Garden_view1' },
        { id: 4, title: 'Garden_view2' }
      ]

      this.durations = [
        { id: 1, title: 'Day' },
        { id: 2, title: '2 Days' },
        { id: 3, title: '3 Days' },
        { id: 4, title: '4 Days' },
        { id: 5, title: '5 Days' },
        { id: 6, title: '6 Days' },
        { id: 7, title: '7 Days' }
      ]
    },
    uniqueID () {
      return `_${Math.random().toString(36).substr(2, 9)}`
    },
    validateDate (event) {
      console.log(event.target.value)
    },
    create () {
      this.mappingData();
      this.$store.dispatch('bookRoom', this.booking)
    },
    mappingData () {
      this.booking.price = this.price;
    },
    cancel () {
      this.$router.push({ name: 'bookingList' })
    }
  },
  computed: {
    booking () {
      if (this.id) {
        return this.$store.getters.getBookingDetails(this.id)
      }
    },
    price () {
      const bedsCost = this.booking.beds ? this.booking.beds * 50 : 0
      const seeViewCost = (this.booking.room === 1 || this.booking.room === 2) ? bedsCost * 0.20 : 0
      return (bedsCost + seeViewCost) * this.booking.duration
    }
  }
}
