<template style="display: flex; align-items: center">
  <v-container fluid style="align-items: center">
    <h1 class="text-center">choose one</h1>

    <div id="main">
      <div class="ma-3">
        <v-btn @click="loadMovies" width="100%" x-large color="primary"
          >영화추천</v-btn
        >
      </div>
      <div class="ma-3">
        <v-btn x-large width="100%" color="primary">로그인</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  components: {},
  data: () => {
    return {
      movies: null,
    };
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem("jwt");
      const config = {
        Authorization: `JWT ${token}`,
      };
      return config;
    },
    loadMovies: function () {
      axios({
        method: "get",
        url: "http://127.0.0.1:8000/movies/load_movies/",
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#main {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
}
</style>
