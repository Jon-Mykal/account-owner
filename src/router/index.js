import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/errorpages/NotFound.vue'

// Owner Files
import Owners from '../views/Owner/Owners.vue';
import OwnerDetails from '../views/Owner/OwnerDetails.vue';
import OwnerCreate from '../views/Owner/OwnerCreate.vue';
import OwnerEdit from '../views/Owner/OwnerEdit.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/owners',
    name: 'OwnersList',
    component: Owners
  },
  {
    path: '/owners/:id',
    name: 'OwnerDetails',
    component: OwnerDetails,
    props: true
  },
  {
    path: '/owners/create',
    name: 'OwnerCreate',
    component: OwnerCreate
  },
  {
    path: '/owners/edit/:id',
    name: 'OwnerEdit',
    component: OwnerEdit,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
