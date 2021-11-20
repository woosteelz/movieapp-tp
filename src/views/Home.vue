<template>
  <div id="main">
    <div>
      <div class="ma-3">
        <v-btn width="80%" x-large color="primary">영화추천</v-btn>
      </div>
      <div class="ma-3">
        <v-btn width="80%" x-large color="primary">로그인</v-btn>
      </div>
    </div>
  </div>
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
