<template>
  <!-- 커뮤니티 게시글의 각 상태를 나타내는 파일입니다. -->
  <v-card>
    <v-card-title
      >{{ review.title }}<v-spacer></v-spacer>
      <span>{{ review.created_at.slice(0, 10) }}</span></v-card-title
    >
    <v-card-text class="d-flex align-center flex-wrap body-1">
      <v-rating
        v-model="rating"
        color="warning"
        background-color="warning"
        dense
      ></v-rating>
      <span class="ms-3 text-sm">5 Star | 98 reviews</span>
      <v-spacer></v-spacer>
      {{ review.author }}
    </v-card-text>
    <v-card-text>
      {{ review.content }}
    </v-card-text>
    <v-card-actions>
      <v-btn @click="updateReview(review)" color="grey" text>
        <v-icon>mdi-border-color</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" text icon color="blue lighten-2">
        <v-icon @click="like(review)">{{
          liked ? "mdi-thumb-up" : "mdi-thumb-up-outline"
        }}</v-icon>
      </v-btn>
    </v-card-actions>
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
