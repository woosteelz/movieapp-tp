<template>
  <v-app id="all">
    <v-app-bar app color="black" dark>
      <div class="d-flex align-center">client</div>
      <Home />
      <v-spacer></v-spacer>
      <router-link to="/accounts/login/">login</router-link> |
      <router-link to="/accounts/signup/">signup</router-link> |
      <router-link to="/community">Community</router-link> |
      <router-link to="/movies">Movies</router-link>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Home from "../src/views/Home.vue";

export default {
  name: "App",
  component: {
    Home,
  },
  data: () => ({
    //
  }),
};
</script>
<style>
#all {
  background: linear-gradient(pink, blue);
}
</style>
