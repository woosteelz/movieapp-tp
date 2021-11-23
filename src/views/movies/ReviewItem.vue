<template>
  <!-- 커뮤니티 게시글의 각 상태를 나타내는 파일입니다. -->
  <v-card class="mx-auto ma-3" max-width="700">
    <v-card-title>
      <h3>{{ review.title }}</h3>
    </v-card-title>

    <v-card-subtitle class="d-flex justify-end">
      작성시간 {{ review.created_at }}</v-card-subtitle
    >
    <v-btn class="ma-2" text icon color="blue lighten-2">
      <v-icon @click="like(review)">mdi-thumb-up</v-icon>
    </v-btn>
    <h3></h3>

    <v-card-actions>
      <v-btn @click="updateReview" color="green lighten-2" text>
        수정하기
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <!-- @click="getComments(review)" -->
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
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
    // getComments: function (review) {
    //   axios({
    //     method: "get",
    //     url: `http://127.0.0.1:8000/community/comments/${review.id}/`,
    //     headers: this.setToken(),
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       this.comments = res.data;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // createComment: function (review) {
    //   const comment = {
    //     content: this.comment_content,
    //   };
    //   if (comment.content) {
    //     axios({
    //       method: "post",
    //       url: `http://127.0.0.1:8000/community/comment_create/${review.id}/`,
    //       data: comment,
    //       headers: this.setToken(),
    //     })
    //       .then((res) => {
    //         console.log(res);
    //         this.comments.push(this.comment_content);
    //         this.show = true;
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   }
    //   this.comment_content = "";
    // },
    // deleteComment: function (review, comment) {
    //   axios({
    //     method: "delete",
    //     url: `http://127.0.0.1:8000/community/comment/${review.id}/${comment.id}/`,
    //     headers: this.setToken(),
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       this.getComments(review);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    like: function (review) {
      axios({
        method: "post",
        url: `http://127.0.0.1:8000/community/like/${review.id}/`,
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res);
          //const likeCount = res.data.like_count
          //const liked = res.data.liked
          //console.log('liked')

          //const likeBtn = document.querySelector(`#likeBtn-${review.id}`)
          // likeBtn.value = liked ? '좋아요 취소' : '좋아요'

          //const likeCnt = document.querySelector(`#likeCnt-${review.id}`)
          //likeCnt.innerText = `좋아요 ${likeCount}개`
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  // created: function (review) {
  //   if (localStorage.getItem('jwt')) {
  //     this.getComments(review)
  //   } else {
  //     this.$router.push({name: 'Login'})
  //   }
  // },
};
</script>
