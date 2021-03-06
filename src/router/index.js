import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/accounts/Login.vue'
import Signup from '@/views/accounts/Signup.vue'
import Community from '@/views/community/Index.vue'
import ArticleDetail from '@/views/community/ArticleDetail.vue'
import Movies from '@/views/movies/Index.vue'
import MovieDetail from '@/views/movies/MovieDetail.vue'
import temp from '@/views/community/temp.vue'
import Recommend from '@/views/movies/recommend/Index.vue'
import MovieSelect from '@/views/movies/recommend/MovieSelect.vue'
import Error from '@/components/Error.vue'

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
    path: '/Error',
    name: 'Error',
    component: Error
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
    path: '/community/detail',
    name: 'ArticleDetail',
    component: ArticleDetail
  },
  {
    path: '/communitytemp',
    name: 'Communitytemp',
    component: temp
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
  {
    path: '/movies/recommend',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/movies/recommend/view',
    name: 'MovieSelect',
    component: MovieSelect
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
