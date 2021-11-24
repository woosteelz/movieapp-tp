<template>
  <v-container>
    <v-img
      :src="movie.poster_path"
      :lazy-src="movie.poster_path"
      aspect-ratio="0.7"
      class="grey lighten-2"
      @mouseover="overlay = true"
      @mouseleave="overlay = false"
      id="movie--detail-transfer"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
      <v-fade-transition style="width: 100%">
        <v-overlay :absolute="absolute" :value="overlay">
          <div style="height: 100%; width: 100%">
            <div
              class="text-h5 text-center"
              style="
                width: 100%;
                overflow-wrap: break-word;
                word-wrap: break-word;
              "
            >
              <div>{{ movie.title }}</div>
            </div>
            <div class="text-center d-flex justify-center align-items-end">
              <v-btn color="deep-purple darken-3" @click="showDetail"> 상세보기 </v-btn>
            </div>
          </div>
        </v-overlay>
      </v-fade-transition>
    </v-img>
  </v-container>
</template>

<script>
export default {
  name: "MovieDetail",
  data() {
    return {
      overlay: false,
      absolute: true,
      title: "",
      content: "",
      poster_path: "",
    };
  },
  components: {},
  props: {
    movie: Object,
  },
  methods: {
    showDetail() {
      // console.log(this.movie.movie_id);
      this.$router.push({
        name: "MovieDetail",
        query: { pk: this.movie.movie_id },
      });
    },
  },
};
</script>

<style scoped>
#movie--detail-transfer:hover {
  transform: translate(0px, -3px);
}
</style>
