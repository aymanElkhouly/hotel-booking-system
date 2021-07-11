import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Toaster from '@meforma/vue-toaster'
import '@/stylesheets/index.scss'

createApp(App)
  .use(store)
  .use(router)
  .use(Toaster, {
    position: 'top-right',
    duration: 2000
  })
  .mount('#app')
