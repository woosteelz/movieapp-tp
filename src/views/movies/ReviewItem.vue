<template>
  <!-- 커뮤니티 게시글의 각 상태를 나타내는 파일입니다. -->
  <v-card class="mx-auto ma-3" max-width="700">
    <v-card-title>
      <h3>{{ review.title }}</h3>
      <v-spacer></v-spacer>
      게시일 {{ review.created_at.slice(0, 10) }}
    </v-card-title>

    <v-card-subtitle class="d-flex justify-end" ></v-card-subtitle>
    <div class="ma-5 text-center">
      <h3>{{ review.content }}</h3>
    </div>
    <div class="d-flex justify-end">
      <v-btn class="ma-2" text icon color="blue lighten-2">
        <v-icon @click="like(review)">{{
          liked ? "mdi-thumb-up" : "mdi-thumb-up-outline"
        }}</v-icon>
      </v-btn>
      {{ likeCnt }}
    </div>
    <h3></h3>

    <v-card-actions>
      <v-btn @click="updateReview(review)" color="grey" text>
        <v-icon>mdi-border-color</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{
          show ? "mdi-chevron-up" : "mdi-chevron-down"
        }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          <h3>{{ review.content }}</h3>
          <v-divider></v-divider>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "ReviewItem",
  components: {},
  props: {
    review: {
      type: Object,
    },
  },
  data() {
    return {
      title: "",
      content: "",
      show: false,
    };
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem("jwt");
      const config = {
        Authorization: `JWT ${token}`,
      };
      return config;
    },
    
    like: function (review) {
      axios({
        method: "post",
        url: `http://127.0.0.1:8000/community/like/${review.id}/`,
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

};
</script>
