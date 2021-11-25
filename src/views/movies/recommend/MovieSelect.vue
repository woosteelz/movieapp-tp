<template>
  <v-container style="justify: center">
    <h1 class="d-flex justify-center ma-3">Recommend Movies</h1>
    <v-carousel
      width="300"
      hide-delimiter-background
      show-arrows-on-hover
      style="display:flex; flex-direction:column; justify-content-center; "
    >
      <v-carousel-item
        v-for="(movie, i) in movies"
        :key="i"
        reverse-transition="fade-transition"
        transition="fade-transition"
        style=""
      >
        <v-card class="transparent" max-width="100%" height="100%">
          <div class="d-flex flex-column-reverse flex-md-row">
            <v-img
              contain
              :src="movie.poster_path"
              :class="$vuetify.breakpoint.mdAndUp ? 'rounded-lg' : 'rounded-0'"
              height="100%"
              :max-width="$vuetify.breakpoint.mdAndUp ? '220' : '100%'"
            ></v-img>
            <div>
              <v-card-title> {{ movie.title }} </v-card-title>
              <v-card-text class="d-flex align-center flex-wrap body-1">
                <v-rating
                  half-increments
                  :value="movie.vote_average / 2"
                  readonly
                  color="warning"
                  background-color="warning"
                  dense
                  class="me-3 flex-shrink-0"
                ></v-rating>
                <v-icon @click="movie_like(movie)">{{
                  movie_liked ? "mdi-heart" : "mdi-heart-outline"
                }}</v-icon>
                <span class="text-sm"
                  >{{ movie_likeCnt }}명이 좋아합니다 | {{ movie.vote_count }}명
                  투표</span
                >
              </v-card-text>
              <v-card-text>
                {{ movie.overview }}
              </v-card-text>

              <v-card-actions class="dense d-flex justify-end">
                <v-btn
                  text
                  color="primary"
                  dark
                  @click="showDetail(movie.movie_id)"
                >
                  상세보기
                </v-btn>
              </v-card-actions>
            </div>
            <div class="pa-4"></div>
          </div>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      movies: null,
      movie_liked: false,
      movie_likeCnt: 0,
    };
  },
  components: {},
  methods: {
    setToken: function () {
      const token = localStorage.getItem("jwt");
      const config = {
        Authorization: `JWT ${token}`,
      };
      return config;
    },
    showDetail(movie_id) {
      // console.log(this.movie.movie_id);
      this.$router.push({
        name: "MovieDetail",
        query: { pk: movie_id },
      });
    },
    getMovieLike: function (movie) {
      axios({
        method: "get",
        url: `ec2-3-143-230-89.us-east-2.compute.amazonaws.com/movies/${movie.movie_id}/get_movie_like/`,
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
          this.movieLiked = res.data.movie_liked;
          this.movieLikeCnt = res.data.movie_like_count;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    movie_like: function (movie) {
      axios({
        method: "post",
        url: `ec2-3-143-230-89.us-east-2.compute.amazonaws.com/movies/${movie.movie_id}/movie_like/`,
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
          this.movie_liked = res.data.movie_liked;
          this.movie_likeCnt = res.data.movie_like_count;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    const select = this.$route.query.select;
    axios({
      method: "post",
      url: "ec2-3-143-230-89.us-east-2.compute.amazonaws.com/movies/recommend/select/",
      data: select,
      headers: this.setToken(),
    }).then((res) => {
      console.log(res);
      this.movies = res.data;
      this.getMovieLike(this.movie);
    });
  },
};
</script>

<style lang="scss" scoped></style>
