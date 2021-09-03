import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

// Error Pages
import NetworkIssue from '../views/errorpages/NetworkIssue.vue'
import NotFound from '../views/errorpages/NotFound.vue'
import NProgress from 'nprogress';

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
    redirect: { name: '404', params: { resource: 'page'}}
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
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

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

// Let components manu
router.afterEach((routeTo, routeFrom) => {
  // Exclude routes with Create/Edit as a name
  const routeToName = routeTo.name.toLowerCase();
  var excludedRoutes = [
    "create", "404", "home"
  ]

  excludedRoutes.forEach(route => {
    if (routeToName.includes(route)) {
      NProgress.done();
    }
  });

});

export default router
