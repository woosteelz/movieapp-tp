<template>
  <v-img
    :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
    :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
    aspect-ratio="1"
    class="grey lighten-2"
    @click="overlay = !overlay"
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
      <v-btn color="success" @click="overlay = false"> Hide Overlay </v-btn>
    </v-overlay>
  </v-img>
</template>

<script>
export default {
  name: "MovieDetail",
  data() {
    return {
      overlay: false,
      absolute: true,
    };
  },
  components: {},
  props: {
    n: Number,
  },
};
</script>
