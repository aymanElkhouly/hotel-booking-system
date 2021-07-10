import { mapGetters } from 'vuex'
export default {
  name: 'booking-list',
  components: {},
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {
  },
  methods: {
    create () {
      this.$router.push({ name: 'createBooking' })
    },
    edit () {
      this.$router.push({ name: 'editBooking', params: { id: '10' } })
    }
  },
  computed: {
    ...mapGetters({ bookingList: 'getBookings' })
  }
}
