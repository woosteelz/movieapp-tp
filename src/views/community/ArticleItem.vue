<template>
  <!-- 커뮤니티 게시글의 각 상태를 나타내는 파일입니다. -->
  <v-card class="mx-auto ma-3" max-width="700">
    <v-card-title>
      <h3>{{ article.title }}</h3>
    </v-card-title>

    <v-card-subtitle class="d-flex justify-end"> 작성시간 </v-card-subtitle>
    <v-btn class="ma-2" text icon color="blue lighten-2">
      <v-icon>mdi-thumb-up</v-icon>
    </v-btn>

    <v-card-actions>
      <v-btn @click="updateArticle" color="green lighten-2" text> 수정하기 </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon @click="getComments(article)">{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          <h3>{{ article.content }}</h3>
          <v-divider></v-divider>
          <h3 v-for="comment in comments" :key="comment.pk"> {{ comment.content }}  <v-btn @click="deleteComment(comment)">X</v-btn></h3>
          
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              @keyup.enter.prevent="createComment(article)"
              v-model="comment_content"
              :counter="10"
              label="Name"
              required
              :rules="nameRules" 
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              Validate
            </v-btn>
          </v-form>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import axios from 'axios'
export default {
  name: "ArticleItem",
  components: {},
  props: {
    article: {
      type: Object,
    }
  },
  data() {
    return {
      comments: null,
      title: '',
      content: '',
      comment_content: '',
      show: false,
    };
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    getComments: function (article) {
      axios ({
        method: 'get',
        url: `http://127.0.0.1:8000/community/comments/${article.id}/`,
        headers: this.setToken()
      })
        .then(res => {
          console.log(res)
          this.comments = res.data

        })
        .catch(err => {
          console.log(err)
        })
    },
    createComment: function (article) {
      const comment = {
        content: this.comment_content,
      }
      if (comment.content) {
        axios({
          method: 'post',
          url: `http://127.0.0.1:8000/community/comments/${article.id}/`,
          data: comment,
          headers: this.setToken()
        })
          .then(res => {
            console.log(res)
            this.getComments()
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    deleteComment: function (comment) {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/community/comment/${comment.id}/`,
        headers: this.setToken()
      })
        .then(res => {
          console.log(res)
          this.getComments()
        })
        .catch(err => {
          console.log(err)
        })
    },
    
  },

  created: function () {
    if (localStorage.getItem('jwt')) {
      this.getComments()
    } else {
      this.$router.push({name: 'Login'})
    }
  }

};
</script>
