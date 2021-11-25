<template>
  <!-- 커뮤니티 게시글의 각 상태를 나타내는 파일입니다. -->
  <v-card>
    <v-dialog v-model="editDialog" scrollable width="700">
      <v-card>
        <v-card-title>수정하기</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field label="Title" v-model="edit.title"></v-text-field>
          <div>
            <v-rating
              v-model="edit.score"
              :value="review.score"
              half-increments
              color="warning"
              background-color="warning"
              dense
              class="me-3 flex-shrink-0"
            ></v-rating>
          </div>
          <v-textarea label="Content" v-model="edit.content"></v-textarea>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="d-flex justify-end">
          <v-btn color="primary darken-1" text @click="editDialog = false">
            닫기
          </v-btn>
          <v-btn
            @click.prevent="updateReview"
            @click="editDialog = false"
            color="primary darken-1"
            text
          >
            수정하기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">정말로 삭제하시겠습니까? </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialogDelete = !dialogDelete"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="deleteReview">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card-title
      >{{ review.title }}<v-spacer></v-spacer>
      <span>{{ review.created_at.slice(0, 10) }}</span></v-card-title
    >
    <v-card-text class="d-flex align-center flex-wrap body-1">
      <v-rating
        :value="review.score"
        color="warning"
        background-color="warning"
        dense
        half-increments
        readonly
      ></v-rating>
      <span class="ms-3 text-sm">{{ review.like_users }} likes</span>
      <v-spacer></v-spacer>
      {{ review.author }}
    </v-card-text>
    <v-card-text>
      {{ review.content }}
    </v-card-text>
    <v-card-actions>
      <v-btn @click="editReview(review)" color="grey" text>
        <v-icon>mdi-border-color</v-icon>
      </v-btn>
      <v-icon @click="beforeReview(review)" color="grey"> mdi-delete </v-icon>
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
    movie: {
      type: Object,
    },
  },
  data() {
    return {
      title: "",
      content: "",
      show: false,
      liked: null,
      likeCnt: 0,
      movieLike: null,
      movieLikeCnt: 0,
      editDialog: false,
      dialogDelete: false,
      reviewToDelete: null,
      edit: {
        title: "",
        content: "",
        movie_title: "",
      },
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
    async getReviewlist() {
      this.$emit("get-review-list", this.movie);
    },
    like: function (review) {
      axios({
        method: "post",
        url: `http://3.143.230.89/movies/${review.id}/like/`,
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
          this.liked = res.data.liked;
          this.likeCnt = res.data.like_count;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    movie_like: function (movie) {
      axios({
        method: "post",
        url: `http://3.143.230.89/movies/${movie.movie_id}/movie_like/`,
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
          this.movieLiked = res.data.movie_liked;
          this.movieLikeCnt = res.data.movie_like_count;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    beforeReview: function (review) {
      this.dialogDelete = true;
      this.reviewToDelete = review;
      console.log(this.reviewToDelete.id);
    },
    deleteReview: function () {
      console.log(this.reviewToDelete);
      axios({
        method: "delete",
        url: `http://3.143.230.89/movies/${this.reviewToDelete.id}/review/`,
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
          this.dialogDelete = false;
          this.getReviewlist(this.movie);
        })
        .catch((err) => {
          console.log(err);
          alert("잘못된 접근입니다");
        });
    },
    editReview: function (review) {
      this.editDialog = true;
      this.edit = review;
    },
    updateReview: function () {
      const updatedReview = {
        title: this.edit.title,
        content: this.edit.content,
      };

      axios({
        method: "put",
        url: `http://3.143.230.89/movies/${this.edit.id}/review/`,
        data: updatedReview,
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getReviewLike: function (review) {
      axios({
        method: "get",
        url: `http://3.143.230.89/movies/${review.id}/get_review_like/`,
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
          this.liked = res.data.liked;
          this.likeCnt = res.data.like_count;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
