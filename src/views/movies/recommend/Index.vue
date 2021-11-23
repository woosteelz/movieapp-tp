<template>
  <v-container>
    <v-card class="mx-auto" max-width="500">
      <v-toolbar flat color="primary accent-4" dark>
        <v-toolbar-title
          >당신의 한끼에 맞는 영화를 추천해드립니다!</v-toolbar-title
        >
      </v-toolbar>

      <v-card-text>
        <h2 class="text-h6 mb-2">지금 무엇을 드시나요?</h2>

        <v-chip-group v-model="menu" column multiple>
          <v-chip filter outlined v-for="menu in menues" :key="menu">{{
            menu
          }}</v-chip>
        </v-chip-group>
      </v-card-text>
      <v-card-text>
        <h2 class="text-h6 mb-2">혹은, 카테고리를 선택해주세요!</h2>

        <v-chip-group v-model="cate" column multiple>
          <v-chip filter outlined v-for="cate in cates" :key="cate">
            {{ cate }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
      <v-card-text class="text-end">
        <v-btn icon color="green" @click="getRecommendMovies">
          <v-icon x-large> mdi-check-circle </v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
// import axios from "axios";
export default {
  data() {
    return {
      menues: ["양식", "중식", "일식", "한식", "분식", "간식"],
      cates: ["면류", "빵류", "패스트푸드", "혼술", "매운", "느끼한"],
      menu: [],
      cate: [],
    };
  },
  created() {},
  methods: {
    getRecommendMovies: function () {
      const select = [];
      for (let i = 0; i < this.menu.length; i++) {
        select.push(this.menues[this.menu[i]]);
      }
      for (let i = 0; i < this.cate.length; i++) {
        select.push(this.cates[this.cate[i]]);
      }
      console.log(select);
      if (select.length > 0) {
        this.$router.push({
          name: "MovieSelect",
          query: {
            select: select,
          },
        });
      } else {
        alert("음식을 고르세요!");
      }
    },
  },
};
</script>
