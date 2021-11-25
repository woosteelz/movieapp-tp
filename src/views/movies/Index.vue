<template>
  <v-container>
    <v-btn
      class="mx-2 text--white"
      id="search-btn"
      fab
      dark
      large
      color="deep-purple darken-3"
      @click="showSearch = !showSearch"
    >
      <v-icon dark> mdi-movie-search-outline </v-icon>
    </v-btn>
    <div id="search-input">
      <v-text-field
        v-show="showSearch"
        v-model="search"
        label="Keyword"
        clearable
        filled
        autofocus
      ></v-text-field>
    </div>
    <v-row>
      <v-col
        v-for="(movie, index) in filteredMovies"
        :key="index"
        class="d-flex child-flex"
        cols="12"
        xl="2"
        lg="3"
        md="4"
        sm="6"
      >
        <MovieDetail :movie="filteredMovies[index]" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MovieDetail from "@/components/MovieDetail.vue";
import axios from "axios";
export default {
  name: "Movies",
  data() {
    return {
      movies: [],
      search: "",
      showSearch: false,
    };
  },
  components: {
    MovieDetail,
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem("jwt");
      const config = {
        Authorization: `JWT ${token}`,
      };
      return config;
    },
    getMovies: function () {
      axios({
        method: "get",
        url: "http://3.143.230.89/movies/",
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
          this.movies = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created: function () {
    if (localStorage.getItem("jwt")) {
      this.getMovies();
    } else {
      alert("영화목록 조회는 로그인이 필요합니다.");
      this.$router.push({ name: "Login" });
    }
  },
  computed: {
    filteredMovies: function () {
      return this.movies.filter((movie) => {
        return movie.title.match(this.search);
      });
    },
  },
};
</script>

<style>
#search-input {
  position: fixed;
  top: 80px;
  right: 100px;
  z-index: 1;
}
#search-btn {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 1;
}
</style>
