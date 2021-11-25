<template>
  <v-container>
    <v-card>
      <v-card-title> {{ article.title }}</v-card-title>
      <v-card-text class="d-flex align-center flex-wrap body-1">
        <span class="ms-3 text-sm">작성자: {{ article.author }}</span>
        <v-spacer></v-spacer>
        <span class="ms-3 text-sm">{{ article.created_at.slice(0, 10) }}</span>
      </v-card-text>
      <v-card-text>
        {{ article.content }}
      </v-card-text>
    </v-card>
    <v-card min-height="350" class="mt-3">
      <v-card-text>
        <div v-if="comments">
          <div v-for="comment in comments" :key="comment.pk" class="d-flex">
            <h4>{{ comment.author }} :{{ comment.content }}</h4>
            <v-spacer></v-spacer>
            <v-btn icon @click="deleteComment(comment)" color="error">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </div>
        </div>
        <div v-else>
          <h3>Not Comment yet...</h3>
        </div>
      </v-card-text>
    </v-card>
    <v-form
      class="d-flexalign-items-end"
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        @keyup.enter="createComment()"
        v-model="content"
        label="Comment"
        required
      >
      </v-text-field>
      <div class="d-flex justify-end">
        <v-btn color="primary" class="mr-4" outlined @click="createComment()">
          comment
        </v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "ArticleDetail",
  data() {
    return {
      article: null,
      comments: [],
      content: "",
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
    getComments: function () {
      axios({
        method: "get",
        url: `http://127.0.0.1:8000/community/comments/${this.article.id}/`,
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
          if (res.data) {
            this.comments = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createComment: function () {
      const comment = {
        content: this.content,
      };
      if (comment.content) {
        axios({
          method: "post",
          url: `http://127.0.0.1:8000/community/comment_create/${this.article.id}/`,
          data: comment,
          headers: this.setToken(),
        })
          .then((res) => {
            console.log(res);
            this.comments.push(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.content = "";
    },
    deleteComment: function (comment) {
      axios({
        method: "delete",
        url: `http://127.0.0.1:8000/community/comment/${this.article.id}/${comment.id}/`,
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
          this.getComments();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    console.log("created!");
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/community/articles/${this.$route.query.id}`,
      headers: this.setToken(),
    })
      .then((res) => {
        console.log(res);
        this.article = res.data;
        this.getComments();
      })
      .catch((err) => {
        console.log(err);
        this.$router.push({
          name: "Error",
        });
      });
  },
};
</script>

<style scoped>
html {
  overflow: hidden !important;
}

.v-card {
  display: flex !important;
  flex-direction: column;
}

.v-card__text {
  flex-grow: 1;
  overflow: auto;
}
</style>
