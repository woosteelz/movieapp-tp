<template>
  <div>
    <v-img
      :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"
      width="100%"
      gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
    >
      <h1 class="ma-3">{{ movie.title }}</h1>
      <v-row>
        <v-col cols="12">
          <div class="ma-5" cols="4">
            <v-img :src="movie.poster_path" width="200" height="300"></v-img>
          </div>
          <div></div>
        </v-col>
        <v-col>
          <div>
            <v-tabs fixed-tabs background-color="dark" dark>
              <v-tab> overview </v-tab>
              <v-tab> comment </v-tab>
              <v-tab> review </v-tab>
              <v-tab> rating </v-tab>
            </v-tabs>
          </div>
        </v-col>
      </v-row>
    </v-img>
  </div>
</template>

<v-col cols="12" md="4">
        <v-icon color="red" class="ma-3" v-if="like" @click="like = !like"
          >mdi-heart-outline</v-icon
        >
        <v-icon color="red" class="ma-3" v-else @click="like = !like"
          >mdi-heart</v-icon
        >
      </v-col>
<script>
import axios from "axios";
export default {
  data() {
    return {
      like: false,
      movie: null,
    };
  },
  props: {},
  methods: {
    setToken: function () {
      const token = localStorage.getItem("jwt");
      const config = {
        Authorization: `JWT ${token}`,
      };
      return config;
    },
  },
  created() {
    console.log(this.$route.query.pk);
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/movies/${this.$route.query.pk}/`,
      headers: this.setToken(),
    })
      .then((res) => {
        console.log(res);
        this.movie = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped></style>
