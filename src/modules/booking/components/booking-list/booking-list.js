import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  name: 'booking-list',
  components: {},
  data () {
    return {
      today: moment(new Date()).format('YYYY-MM-DD')
    }
  },
  methods: {
    create () {
      this.$router.push({ name: 'createBooking' })
    },
    edit (id) {
      this.$router.push({ name: 'editBooking', params: { id: id } })
    },
    remove (id) {
      this.$store.dispatch('removeBooking', id)
    },
    canModify (date) {
      return new Date(date).getTime() >= new Date(this.today).getTime()
    }
  },
  computed: {
    ...mapGetters({ bookingList: 'getBookingList' })
  }
}
