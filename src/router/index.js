import { createRouter, createWebHashHistory } from 'vue-router'
/* import Home from '../views/Home.vue' */
import bookingRoutes from '../modules/booking/routes'
const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "booking" */ '../modules/booking'),
    children: bookingRoutes
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
