<template>
  <v-app>
    <v-app-bar app color="green" dark>
      <div class="d-flex align-center">client</div>
      <Home />
      <v-spacer></v-spacer>
      <router-link to="/accounts/login/">login</router-link> |
      <router-link to="/accounts/signup/">signup</router-link>
    </v-app-bar>
    <v-main>
      <router-view />
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
