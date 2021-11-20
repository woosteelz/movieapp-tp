<template>
  <v-row align="center">
    <v-col>
      <div>
        <v-card class="pa-2 align-items-center">
          <div class="d-flex justify-center ma-3">
            <v-btn @click="loadMovies" width="80%" x-large color="primary">영화추천</v-btn>
          </div>
          <div class="d-flex justify-center ma-3">
            <v-btn width="80%" x-large color="primary">로그인</v-btn>
          </div>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'
export default {
  name: "Home",

  components: {},

  data: () => {
    return {
      movies: null
    }
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    loadMovies : function () {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies/load_movies/',
        headers: this.setToken()
      })
        .then(res => {
          console.log(res)
          
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
};
</script>
