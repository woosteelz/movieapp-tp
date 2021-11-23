<template>
  <v-container>
    <h1>This is Community Main</h1>
    <ArticleItem
      v-for="article in articles"
      :key="article.pk"
      :article="article"
    />
    <!-- <v-text-field v-model="select" @keyup.enter="recommend(select)"></v-text-field> -->
    <div class="text-center">
      <v-pagination :length="numofpage" v-model="curpagenum"></v-pagination>
    </div>

    <!-- 새 글 작성 Dialog -->
    <v-dialog v-model="dialog" scrollable width="700">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary "
          v-bind="attrs"
          v-on="on"
          fab
          id="create-article"
        >
          <v-icon x-large>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>새 글 작성하기</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field label="Title" v-model.trim="title"></v-text-field>
          <v-text-field
            label="Movie Title"
            v-model.trim="movie_title"
            aria-autocomplete="on"
          ></v-text-field>
          <v-textarea label="Content" v-model.trim="content"></v-textarea>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="d-flex justify-end">
          <v-btn color="green darken-1" text @click="dialog = false">
            닫기
          </v-btn>
          <v-btn
            @click.prevent="createArticle"
            @click="dialog = false"
            color="green darken-1"
            text
          >
            게시하기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import ArticleItem from "../community/ArticleItem.vue";
import axios from "axios";
//import { mapActions } from 'vuex'

export default {
  name: "Community",
  components: {
    ArticleItem,
  },
  data() {
    return {
      articles: null,
      title: null,
      movie_title: null,
      content: null,
      dialog: false,
      curpagenum: 1,
      datapage: 10,
      articlelist: [],
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
    getArticles: function () {
      axios({
        method: "get",
        url: "http://127.0.0.1:8000/community/articles/",
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
          this.articles = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createArticle: function () {
      const article = {
        title: this.title,
        movie_title: this.movie_title,
        content: this.content,
      };

      if (article.title) {
        axios({
          method: "post",
          url: "http://127.0.0.1:8000/community/articles/",
          data: article,
          headers: this.setToken(),
        })
          .then((res) => {
            console.log(res);
            this.getArticles();
            this.$router.push({ name: "Community" });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    deleteArticle: function (article) {
      axios({
        method: "delete",
        url: `http://127.0.0.1:8000/community/articles/${article.id}/`,
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
          this.getArticles();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateArticle: function (article) {
      const updatedArticle = {
        ...article,
        title: this.title,
        movie_title: this.movie_title,
        content: this.content,
      };

      axios({
        method: "put",
        url: `http://127.0.0.1:8000/community/articles/${article.id}/`,
        data: updatedArticle,
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
          this.$router.push({ name: "Login" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getArticlelist () {
      await axios.get("http://127.0.0.1:8000/community/articles/").then(
        (res) => {
          this.articlelist = res.data
        },
        (err) => {
          console.log(err)
        }
      )
    },
    // recommend: function (select) {
    //   axios({
    //     method: "post",
    //     url: `http://127.0.0.1:8000/movies/recommend/${select}/`,
    //     headers: this.setToken(),
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       this.recommended = res.data
    //       console.log(this.recommended)
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    },
    getMovies: function () {
      axios({
        method: "get",
        url: "http://127.0.0.1:8000/movies/",
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
          this.movies = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  
  created: function () {
    axios({
        method: "get",
        url: "http://127.0.0.1:8000/community/articles/",
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
          this.pageArray = res.data;
        })
        .catch((err) => {
            console.log(err);
          });
  },
  // mounted: function () {
  //   if (localStorage.getItem("jwt")) {
  //     this.getArticles();
  //     this.getMovies();
  //   } else {
  //     this.$router.push({ name: "Login" });
  //   }
  // },
  computed: {
    startOffset() {
      return ((this.curpagenum- 1) * this.datapage);
    },
    endOffset() {
      return (this.startOffset + this.datapage);
    },
    numofpage() {
      return Math.ceil(this.articlelist.length/this.datapage);
    },
    article_list() {
      return this.articlelist.slice(this.startOffset, this.endOffset)
    },
  },
  mounted () {
    this.getArticles()
    this.getArticlelist()
  }
};
</script>

<style scoped>
#create-article {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
