<template>
  <v-container>
    <h1 class="white--text">This is Movie main</h1>
    <v-row>
      <v-col
        v-for="n in 100"
        :key="n"
        class="d-flex child-flex"
        cols="12"
        md="4"
        sm="6"
      >
        <MovieDetail :n="n" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MovieDetail from "@/components/MovieDetail.vue";
export default {
  name: "Movies",
  data() {
    return {
      absolute: true,
      overlay: false,
    };
  },
  components: {
    MovieDetail,
  },
};
</script>
