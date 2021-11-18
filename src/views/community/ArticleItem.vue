<template>
  <!-- 커뮤니티 게시글의 각 상태를 나타내는 파일입니다. -->
  <v-card class="mx-auto ma-3" max-width="700">
    <v-card-title>
      <h3>{{ temp.title }}</h3>
    </v-card-title>

    <v-card-subtitle class="d-flex justify-end"> 작성시간 </v-card-subtitle>
    <v-btn class="ma-2" text icon color="blue lighten-2">
      <v-icon>mdi-thumb-up</v-icon>
    </v-btn>

    <v-card-actions>
      <v-btn color="green lighten-2" text> 상세보기 </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          <h3>{{ temp.content }}</h3>
          <v-divider></v-divider>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules"
              label="Name"
              required
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
