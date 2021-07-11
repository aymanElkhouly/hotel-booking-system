import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  name: 'booking-list',
  components: {},
  data () {
    return {
      search: '',
      roomSearch: '',
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
      this.$toast.success('Removed Successfully')
    },
    canModify (date) {
      return new Date(date).getTime() >= new Date(this.today).getTime()
    }
  },
  computed: {
    ...mapGetters({ bookingList: 'getBookingList' }),
    filteredList () {
      return this.bookingList.filter(item => {
        const roomFilter = item.room.title.toLowerCase().includes(this.roomSearch.toLowerCase())
        const customerFilter = item.name.toLowerCase().includes(this.search.toLowerCase())
        if (roomFilter && customerFilter) {
          return item
        }
      })
    }
  }
}
