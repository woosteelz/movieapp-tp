<template>
  <v-app>
    <v-app-bar app color="green" dark>
      <div class="d-flex align-center">client</div>

      <v-spacer></v-spacer>
      <router-link to="/accounts/login">login</router-link> |
      <router-link to="/accounts/signin">signin</router-link>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  component: {},
  data: () => ({
    //
  }),
};
</script>
