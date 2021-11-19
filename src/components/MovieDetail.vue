<template>
  <v-img
    :src="movie.poster_path"
    :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
    aspect-ratio="0.8"
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
    <v-overlay :absolute="absolute" :value="overlay">
      {{ movie.poster_path }}
      <v-btn color="success" @click="showDetail"> {{ movie.title }} </v-btn>
    </v-overlay>
  </v-img>
</template>

<script>
export default {
  // name: "MovieDetail",
  data() {
    return {
      overlay: false,
      absolute: true,
    };
  },
  components: {},
  props: {
    movie: {
      type: Object,
    }
  },
  methods: {
    showDetail() {
      this.$router.push({
        name: "MovieDetail",
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
