<template>
  <!-- 커뮤니티 게시글의 각 상태를 나타내는 파일입니다. -->
  <v-card class="mx-auto ma-3">
    <v-card-title>
      <h3>{{ article.title }}</h3>
      <v-spacer></v-spacer>
      게시일 {{ article.created_at.slice(0, 10) }}
    </v-card-title>

    <v-card-subtitle class="d-flex justify-end"> </v-card-subtitle>
    <div class="ma-5 text-center">
      <h3>{{ article.content }}</h3>
    </div>
    <div class="d-flex justify-end">
      <v-btn class="ma-2" text icon color="blue lighten-2">
        <v-icon @click="like(article)">{{
          liked ? "mdi-thumb-up" : "mdi-thumb-up-outline"
        }}</v-icon>
      </v-btn>
      {{ likeCnt }}
    </div>
    <h3></h3>

    <v-card-actions>
      <v-btn @click="updateArticle" color="grey" text>
        <v-icon>mdi-border-color</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon @click="getComments(article)">{{
          show ? "mdi-chevron-up" : "mdi-chevron-down"
        }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          <div v-for="comment in comments" :key="comment.pk" class="d-flex">
            <h4>
              {{ comment.content }}
            </h4>
            <v-spacer></v-spacer>
            <v-btn icon @click="deleteComment(article, comment)" color="error">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </div>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              @keyup.enter="createComment(article)"
              v-model="comment_content"
              label="Comment"
              required
            >
            </v-text-field>
            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                class="mr-4"
                outlined
                @click="createComment(article)"
              >
                comment
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "ArticleItem",
  components: {},
  props: {
    article: {
      type: Object,
    },
  },
  data() {
    return {
      comments: null,
      title: "",
      content: "",
      comment_content: "",
      show: false,
      liked: false,
      likeCnt: 0,
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
    getComments: function (article) {
      axios({
        method: "get",
        url: `http://127.0.0.1:8000/community/comments/${article.id}/`,
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
          this.comments = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createComment: function (article) {
      const comment = {
        content: this.comment_content,
      };
      if (comment.content) {
        axios({
          method: "post",
          url: `http://127.0.0.1:8000/community/comment_create/${article.id}/`,
          data: comment,
          headers: this.setToken(),
        })
          .then((res) => {
            console.log(res);
            this.comments.push(this.comment_content);
            this.show = true;
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.comment_content = "";
    },
    deleteComment: function (article, comment) {
      axios({
        method: "delete",
        url: `http://127.0.0.1:8000/community/comment/${article.id}/${comment.id}/`,
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
          this.getComments(article);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    like: function (article) {
      axios({
        method: "post",
        url: `http://127.0.0.1:8000/community/like/${article.id}/`,
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

  // created: function (article) {
  //   if (localStorage.getItem('jwt')) {
  //     this.getComments(article)
  //   } else {
  //     this.$router.push({name: 'Login'})
  //   }
  // },
};
</script>
