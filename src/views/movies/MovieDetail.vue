<template>
  <v-container fluid>
    <h1>This is Movie Detail</h1>
    <v-row justify="start">
      <v-col cols="12" md="4"
        ><v-img
          max-height="1600"
          max-width="900"
          lazy-src="https://picsum.photos/id/11/10/6"
          src="https://image.tmdb.org/t/p/w500/1Lh9LER4xRQ3INFFi2dfS2hpRwv.jpg"
          class="ma-1"
        ></v-img>
      </v-col>
      <v-col cols="12" md="6" align="start">
        <v-container>
          <h2>{{ movie.title }}</h2>
          <v-spacer></v-spacer>
          <h4>개봉일 : {{ movie.release_date }}</h4>
          <v-divider></v-divider>
          {{ movie.overview }}
        </v-container>
      </v-col>
      <v-col cols="12" md="2">
        <v-icon color="red" class="ma-3" v-if="like" @click="like = !like"
          >mdi-heart-outline</v-icon
        >
        <v-icon color="red" class="ma-3" v-else @click="like = !like"
          >mdi-heart</v-icon
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    return {
      like: false,
      title: '',
      overview: '',
      release_date: '',
    };
  },
  props: {
    movie: {
      type: Object,
    }
  },
  methods: {
    
  },
};
</script>
