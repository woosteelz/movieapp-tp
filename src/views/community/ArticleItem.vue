<template>
  <!-- 커뮤니티 게시글의 각 상태를 나타내는 파일입니다. -->
  <v-card class="mx-auto ma-3" max-width="700">
    <v-card-title>
      <h3>{{ article.title }}</h3>
    </v-card-title>

    <v-card-subtitle class="d-flex justify-end">
      작성시간 {{ article.created_at }}</v-card-subtitle
    >
    <v-btn class="ma-2" text icon color="blue lighten-2">
      <v-icon @click="like(article)">mdi-thumb-up</v-icon>
    </v-btn>
    <h3></h3>

    <v-card-actions>
      <v-btn @click="updateArticle" color="green lighten-2" text>
        수정하기
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
          <h3>{{ article.content }}</h3>
          <v-divider></v-divider>
          <h3 v-for="comment in comments" :key="comment.pk">
            {{ comment.content }}
            <v-btn @click="deleteComment(article, comment)">X</v-btn>
          </h3>
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
          //const likeCount = res.data.like_count
          //const liked = res.data.liked
          //console.log('liked')

          //const likeBtn = document.querySelector(`#likeBtn-${article.id}`)
          // likeBtn.value = liked ? '좋아요 취소' : '좋아요'

          //const likeCnt = document.querySelector(`#likeCnt-${article.id}`)
          //likeCnt.innerText = `좋아요 ${likeCount}개`
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
