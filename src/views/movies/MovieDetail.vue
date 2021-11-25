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
              <div>
                <v-rating
                  :value="movie.vote_average / 2"
                  half-increments
                  color="warning"
                  background-color="warning"
                  dense
                  readonly
                  class="me-3 flex-shrink-0"
                ></v-rating>
              </div>
              <v-icon @click="movie_like(movie)">{{
                movieLiked ? "mdi-heart" : "mdi-heart-outline"
              }}</v-icon>
              <span class="text-sm">
                {{ movieLikeCnt }}명이 좋아합니다 |
                {{ review_list.length }} reviews</span
              >
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
        <v-tab> casting </v-tab>
        <v-tab> overview </v-tab>
        <v-tab @click="getComments(movie)"> comment </v-tab>
        <v-tab @click="getReviewlist(movie)"> review </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
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
                :key="actor.id"
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
        <!-- overview tab -->
        <v-tab-item>
          <v-card flat height="400">
            <v-card-text>{{ movie.overview }} </v-card-text>
          </v-card>
        </v-tab-item>
        <!-- comment tab -->
        <v-tab-item>
          <v-container>
            <v-row align="end">
              <v-col cols="12">
                <h5>leave your comments</h5>
                <div>
                  <v-form
                    class="d-flexalign-items-end"
                    ref="form"
                    lazy-validation
                  >
                    <v-text-field
                      @keyup.enter="createComment(movie)"
                      v-model="content"
                      label="Comment"
                      required
                    >
                    </v-text-field>
                    <div class="d-flex justify-end">
                      <v-btn
                        color="primary"
                        class="mr-4"
                        outlined
                        @click="createComment(movie)"
                      >
                        comment
                      </v-btn>
                    </div>
                  </v-form>
                </div>
              </v-col>
              <v-col cols="12">
                <v-card min-height="350">
                  <v-card-text class="scroll">
                    <div v-if="comments">
                      <div
                        v-for="comment in comments"
                        :key="comment.pk"
                        class="d-flex"
                      >
                        <h4>{{ comment.author }} : {{ comment.content }}</h4>
                        <v-spacer></v-spacer>
                        <v-btn
                          icon
                          @click="deleteComment(comment)"
                          color="error"
                        >
                          <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                      </div>
                    </div>
                    <div v-else>
                      <h3>Not Comment yet...</h3>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <!-- Review tab -->
        <v-tab-item>
          <v-card min-height="400">
            <div>
              <v-row>
                <v-col
                  v-for="review in review_list"
                  :key="review.pk"
                  cols="12"
                  md="6"
                  lg="4"
                >
                  <ReviewItem
                    @get-review-list="getReviewlist"
                    :review="review"
                    :movie="movie"
                  />
                </v-col>
              </v-row>
            </div>
          </v-card>
          <div class="d-flex justify-end ma-5">
            <v-btn
              flat
              rounded-0
              outlined
              color="primary"
              @click="dialog = !dialog"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
          </div>
          <v-pagination
            :length="numofpage"
            v-model="curpagenum"
            class="ma-3"
          ></v-pagination>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" scrollable width="700">
            <v-card>
              <v-card-title>리뷰 작성하기</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-text-field label="Title" v-model.trim="title"></v-text-field>
                <v-rating
                  v-model="score"
                  half-increments
                  color="warning"
                  background-color="warning"
                  dense
                  class="me-3 flex-shrink-0"
                ></v-rating>
                <v-textarea label="Content" v-model.trim="content"></v-textarea>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions class="d-flex justify-end">
                <v-btn color="green darken-1" text @click="dialog = false">
                  닫기
                </v-btn>
                <v-btn
                  @click.prevent="createReview(movie)"
                  @click="dialog = false"
                  color="green darken-1"
                  text
                >
                  게시하기
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import ReviewItem from "../movies/ReviewItem.vue";
import axios from "axios";

export default {
  components: {
    ReviewItem,
  },
  data() {
    return {
      tab: null,
      movie: null,
      actors: [],
      comments: null,
      content: "",
      show: null,
      comment: null,
      dialog: null,
      curpagenum: 1,
      datapage: 12,
      reviewlist: [],
      reviews: null,
      title: null,
      score: 0,
      rating: 0,
      movieLiked: null,
      movieLikeCnt: 0,
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
    getComments: function (movie) {
      axios({
        method: "get",
        url: `http://127.0.0.1:8000/movies/${movie.movie_id}/comments/`,
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
    getMovieLike: function (movie) {
      axios({
        method: "get",
        url: `http://127.0.0.1:8000/movies/${movie.movie_id}/get_movie_like/`,
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
    createComment: function (movie) {
      const comment = {
        content: this.content,
      };
      if (comment.content) {
        axios({
          method: "post",
          url: `http://127.0.0.1:8000/movies/${movie.movie_id}/comment/`,
          data: comment,
          headers: this.setToken(),
        })
          .then((res) => {
            console.log(res);
            this.getComments(movie);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.content = "";
    },
    getReviews: function (movie) {
      axios({
        method: "get",
        url: `http://127.0.0.1:8000/movies/${movie.movie_id}/reviews/`,
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
          this.reviews = res.data;
          this.pageArray = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createReview: function (movie) {
      const review = {
        title: this.title,
        score: this.score,
        content: this.content,
      };
      console.log(this.score);
      if (review.title) {
        axios({
          method: "post",
          url: `http://127.0.0.1:8000/movies/${movie.movie_id}/reviews/`,
          data: review,
          headers: this.setToken(),
        })
          .then((res) => {
            console.log(res);
            this.getReviewlist(movie);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.title = "";
      this.score = 0;
      this.content = "";
    },
    async getReviewlist(movie) {
      await axios
        .get(`http://127.0.0.1:8000/movies/${movie.movie_id}/reviews/`)
        .then(
          (res) => {
            this.reviewlist = res.data;
          },
          (err) => {
            console.log(err);
          }
        );
    },
    vote: function (movie) {
      const vote = {
        score: this.rating,
      };

      if (vote.score) {
        axios({
          method: "post",
          url: `http://127.0.0.1:8000/movies/${movie.movie_id}/vote/`,
          data: vote,
          headers: this.setToken(),
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    like: function (review) {
      axios({
        method: "post",
        url: `http://127.0.0.1:8000/movies/like/${review.id}/`,
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
        url: `http://127.0.0.1:8000/movies/${movie.movie_id}/movie_like/`,
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
        this.getReviewlist(this.movie);
        this.getMovieLike(this.movie);

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
  computed: {
    startOffset() {
      return (this.curpagenum - 1) * this.datapage;
    },
    endOffset() {
      return this.startOffset + this.datapage;
    },
    numofpage() {
      return Math.ceil(this.reviewlist.length / this.datapage);
    },
    review_list() {
      return this.reviewlist.slice(this.startOffset, this.endOffset);
    },
  },
};
</script>
