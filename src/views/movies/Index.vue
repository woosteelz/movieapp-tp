<template>
  <v-container>
    <h1 class="">This is Movie main</h1>
    <v-row>
      <v-col
        v-for="n in movies.length()"
        :key="n"
        class="d-flex child-flex"
        cols="12"
        md="4"
        sm="6"
      >
  
        <MovieDetail v-for="movie in movies" :key="movie.pk" :movie="movie" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MovieDetail from "@/components/MovieDetail.vue";
import axios from 'axios'
export default {
  name: "Movies",
  data() {
    return {
      movies: null,
    };
  },
  components: {
    MovieDetail,
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    getMovies : function () {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies/get_movies/',
        headers: this.setToken()
      })
        .then(res => {
          console.log(res)
          this.movies = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
};
</script>
