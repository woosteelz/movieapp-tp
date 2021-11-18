<template>
  <!-- 커뮤니티 게시글의 각 상태를 나타내는 파일입니다. -->
  <v-card class="mx-auto ma-3" max-width="700">
    <v-card-title>
      <h3>{{ temp.title }}</h3>
    </v-card-title>

    <v-card-subtitle class="d-flex justify-end"> 작성시간 </v-card-subtitle>

    <v-card-actions>
      <v-btn color="green lighten-2" text> 수정하기 </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ temp.content }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "ArticleItem",
  components: {},
  data() {
    return {
      show: false,
    };
  },
  props: {
    temp: Object,
  },
};
</script>
