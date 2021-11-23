<template>
  <div>
    <v-img
      :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"
      max-height="450"
      gradient="to top right, rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)"
      class="rounded-lg"
    >
      <v-card class="ma-5" outlined color="transparent">
        <div class="d-flex flex-column-reverse flex-md-row">
          <div>
            <v-card-title
              ><h1>{{ movie.title }}</h1>
            </v-card-title>
            <v-card-text class="d-flex align-center flex-wrap body-1">
              <v-rating
                v-model="rating"
                color="warning"
                background-color="warning"
                dense
                class="me-3 flex-shrink-0"
              ></v-rating>
              <span class="text-sm">5 Star | 98 reviews</span>
            </v-card-text>
            <v-card-text>
              {{ movie.overview }}
            </v-card-text>
            <v-card-actions class="dense d-flex justify-end">
              <v-btn text color="primary" dark> 영화보러가기 </v-btn>
            </v-card-actions>
          </div>
          <v-spacer></v-spacer>
          <div class="pa-4">
            <v-img
              :src="movie.poster_path"
              :class="$vuetify.breakpoint.mdAndUp ? 'rounded-lg' : 'rounded-0'"
              height="100%"
              :max-width="$vuetify.breakpoint.mdAndUp ? '220' : '100%'"
            ></v-img>
          </div>
        </div>
      </v-card>
    </v-img>
    <div class="">
      <v-tabs fixed-tabs background-color="dark" dark v-model="tab">
        <v-tab> overview </v-tab>
        <v-tab> comment </v-tab>
        <v-tab> review </v-tab>
        <v-tab> casting </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <!-- overview tab -->
        <v-tab-item>
          <v-card flat height="400">
            <v-card-text>{{ movie.overview }} </v-card-text>
          </v-card>
        </v-tab-item>
        <!-- comment tab -->
        <v-tab-item>
          <div flat height="100%" width="100%">
            <v-card-text><h1>comment</h1></v-card-text>
          </div>
        </v-tab-item>
        <!-- Review tab -->
        <v-tab-item>
          <v-card flat height="50%">
            <v-card-text>{{ movie.overview }}</v-card-text>
          </v-card>
        </v-tab-item>
        <!-- casting Tab -->
        <v-tab-item>
          <v-container class="" height="400" fluid>
            <v-row>
              <v-col
                cols="2"
                lg="2"
                sm="3"
                xs12
                v-for="actor in actors"
                :key="actor"
              >
                <div class="ma-5">
                  <div class="text-center">
                    <v-avatar size="128">
                      <v-img :src="actor.profile_path"> </v-img>
                    </v-avatar>
                  </div>
                  <h3 class="text-center">{{ actor.name }}</h3>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tab: null,
      like: false,
      movie: null,
      actors: [],
    };
  },
  props: {},
  methods: {
    setToken: function () {
      const token = localStorage.getItem("jwt");
      const config = {
        Authorization: `JWT ${token}`,
      };
      return config;
    },
  },
  created() {
    // console.log(this.$route.query.pk);
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/movies/${this.$route.query.pk}/`,
      headers: this.setToken(),
    })
      .then((res) => {
        console.log(res);
        this.movie = res.data;

        for (let i = 0; i < 20; i++) {
          axios({
            method: "get",
            url: `https://api.themoviedb.org/3/person/${this.movie.actors[i].actor_id}?api_key=1e1628fa2029e5e5102664565f10a845&language=ko-kr`,
          }).then((response) => {
            console.log(response);
            const actor_info = {
              name: response.data.name,
              profile_path:
                "https://image.tmdb.org/t/p/w500" + response.data.profile_path,
            };
            this.actors.push(actor_info);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped></style>
