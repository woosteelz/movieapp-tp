<template>
  <v-container>
    <h1 class="d-flex justify-center ma-5">Community</h1>
    <v-simple-table height="600" max-height="600" fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-uppercase">글 제목</th>
            <th class="text-center text-uppercase">영화 제목</th>
            <th class="text-center text-uppercase">작성자</th>
            <th class="text-center text-uppercase">작성시간</th>
            <th class="text-center text-uppercase">마지막 수정시간</th>
            <th class="text-center text-uppercase">비고</th>
          </tr>
        </thead>
        <v-dialog v-model="editDialog" scrollable width="700">
          <v-card>
            <v-card-title>수정하기</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-text-field label="Title" v-model="edit.title"></v-text-field>
              <v-text-field
                label="Movie Title"
                v-model="edit.movie_title"
                aria-autocomplete="on"
              ></v-text-field>
              <v-textarea label="Content" v-model="edit.content"></v-textarea>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="d-flex justify-end">
              <v-btn color="primary darken-1" text @click="editDialog = false">
                닫기
              </v-btn>
              <v-btn
                @click.prevent="updateArticle"
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
            <v-card-title class="text-h5"
              >정말로 삭제하시겠습니까?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="dialogDelete = !dialogDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteArticle"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <tbody>
          <tr v-for="article in article_list" :key="article.id">
            <td @click="showArticleDetail(article.id)">{{ article.title }}</td>
            <td class="text-center">
              {{ article.movie_title }}
            </td>
            <td class="text-center">
              {{ article.author }}
            </td>
            <td class="text-center">
              {{ article.created_at.slice(0, 16) }}
            </td>
            <td class="text-center">
              {{ article.updated_at.slice(0, 16) }}
            </td>
            <td class="text-center">
              <v-btn @click="editArticle(article)">
                <v-icon small class="mr-2"> mdi-pencil </v-icon>
              </v-btn>
              <v-btn @click="beforeArticle(article)">
                <v-icon small> mdi-delete </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div class="text-center">
      <v-pagination
        :length="numofpage"
        color="deep-purple darken-3"
        v-model="curpagenum"
      ></v-pagination>
    </div>

    <!-- 새 글 작성 Dialog -->
    <v-dialog v-model="dialog" scrollable width="700">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="deep-purple darken-3"
          v-bind="attrs"
          v-on="on"
          fab
          id="create-article"
        >
          <v-icon cx-large>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>새로운 글쓰기</v-card-title>
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
          <v-btn color="primary darken-1" text @click="dialog = false">
            닫기
          </v-btn>
          <v-btn
            @click.prevent="createArticle"
            @click="dialog = false"
            color="primary darken-1"
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
import axios from "axios";

export default {
  name: "Community",
  components: {},
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
      dialogDelete: false,
      aricleToDelete: null,
      editDialog: false,
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
            this.getArticlelist();
            // this.$router.push({ name: "Community" });
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.title = "";
      this.movie_title = "";
      this.content = "";
    },
    beforeArticle: function (article) {
      this.dialogDelete = true;
      this.articleToDelete = article;
      console.log(this.articleToDelete.id);
    },
    deleteArticle: function () {
      console.log(this.articleToDelete);
      axios({
        method: "delete",
        url: `http://127.0.0.1:8000/community/articles/${this.articleToDelete.id}/`,
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
          this.dialogDelete = false;
          this.getArticlelist();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editArticle: function (article) {
      this.editDialog = true;
      this.edit = article;
    },
    updateArticle: function () {
      const updatedArticle = {
        title: this.edit.title,
        movie_title: this.edit.movie_title,
        content: this.edit.content,
      };

      axios({
        method: "put",
        url: `http://127.0.0.1:8000/community/articles/${this.edit.id}/`,
        data: updatedArticle,
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
          this.getArticlelist();
        })
        .catch((err) => {
          console.log(err);
          this.$router.push({
            name: "Error",
          });
        });
    },
    async getArticlelist() {
      await axios.get("http://127.0.0.1:8000/community/articles/").then(
        (res) => {
          this.articlelist = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
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
    showArticleDetail: function (id) {
      this.$router.push({
        name: "ArticleDetail",
        query: {
          id: id,
        },
      });
    },
  },
  created: function () {
    if (localStorage.getItem("jwt")) {
      axios({
        method: "get",
        url: "http://127.0.0.1:8000/community/articles/",
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
          this.pageArray = res.data;
          this.getArticlelist();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("커뮤니티 이용을 위해 로그인해주세요!");
      this.$router.push({ name: "Login" });
    }
  },

  computed: {
    startOffset() {
      return (this.curpagenum - 1) * this.datapage;
    },
    endOffset() {
      return this.startOffset + this.datapage;
    },
    numofpage() {
      return Math.ceil(this.articlelist.length / this.datapage);
    },
    article_list() {
      return this.articlelist.slice(this.startOffset, this.endOffset);
    },
  },
  mounted() {
    this.getArticles();
    this.getArticlelist();
  },
};
</script>

<style scoped>
#create-article {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
