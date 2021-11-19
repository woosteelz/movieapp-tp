import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/accounts/Login.vue'
import Signup from '@/views/accounts/Signup.vue'
import Community from '@/views/community/Index.vue'
import Movies from '@/views/movies/Index.vue'
import MovieDetail from '@/views/movies/MovieDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/accounts/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/accounts/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/community',
    name: 'Community',
    component: Community
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
  },
  {
    path: '/movies/detail',
    name: 'MovieDetail',
    component: MovieDetail
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
