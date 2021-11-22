<template>
  <v-app id="all">
    <v-app-bar app color="black" dark>
      <div class="d-flex align-center">client</div>
      <Home />

      <!-- menus -->
      <v-spacer></v-spacer>
      <v-btn class="ma-1" color="white" plain>
        <router-link to="/accounts/login/" class="white--text"
          >login</router-link
        >
      </v-btn>
      <v-btn class="ma-1" color="white" plain>
        <router-link to="/accounts/signup/" class="white--text"
          >signup</router-link
        >
      </v-btn>
      <v-btn class="ma-1" color="white" plain>
        <router-link to="/communitytemp" class="white--text"
          >Community</router-link
        >
      </v-btn>
      <v-btn class="ma-1" color="white" plain>
        <router-link to="/community" class="white--text" >Community</router-link>
      </v-btn>
      <v-btn class="ma-1" color="white" plain>
        <router-link to="/movies" class="white--text">Movies</router-link>
      </v-btn>
      <v-btn class="ma-1" color="white" plain
        >getMovie</v-btn
      >
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Home from "../src/views/Home.vue";
// import axios from 'axios'

export default {
  name: "App",
  component: {
    Home,
  },
  data: () => {
    return {
      movies: null,
    };
  },
  methods: {
  }
};
</script>
<style>
#all {
  /* background: linear-gradient(pink, blue); */
}
</style>
