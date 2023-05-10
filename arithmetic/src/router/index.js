import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue'),
    meta: { private: true }
  },
  {
    path: '*',
    redirect: '/',
  }
]

const router = new VueRouter({
  mode:"history",
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta?.private && !localStorage.getItem("Authorization")) {
    return next('/login');
  } else {
    next();
  }
})

export default router
