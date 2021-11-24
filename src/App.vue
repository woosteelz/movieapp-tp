<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app color="deep-purple darken-3">
      <v-list>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-chat-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              ><router-link to="/community" class="white--text text-decoration-none"
                >Community</router-link
              ></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-movie-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <router-link to="/movies" class="white--text text-decoration-none">Movies</router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-movie-search-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <router-link to="/movies/recommend" class="white--text text-decoration-none">Recommend</router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link v-if="isLogin" @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link v-else>
          <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app hide-on-scroll color="deep-purple darken-3">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        hide-on-scroll
      ></v-app-bar-nav-icon>

      <v-toolbar-title>
        <img src="@/assets/ssafyater_logo.png" alt="" width="200px">
      </v-toolbar-title>
    </v-app-bar>

    <v-main style="display: center; align-items: center">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import axios from 'axios'

export default {
  name: "App",
  component: {},
  data: () => {
    return {
      movies: null,
      drawer: true,
      isLogin: false,
    };
  },
  methods: {
    logout: function () {
      localStorage.removeItem("jwt");
      this.$router.push({
        name: "Login",
      });
    },
  },
  created() {
    const token = localStorage.getItem("jwt");
    if (token) {
      this.isLogin = true;
    }
  },
  mounted() {
    const token = localStorage.getItem("jwt");
    if (token) {
      this.isLogin = true;
    }
  },
  updated() {
    const token = localStorage.getItem("jwt");
    if (token) {
      this.isLogin = true;
    }
  },
};
</script>
<style>
/* #all {
   background: linear-gradient(pink, blue); 
} */
</style>
