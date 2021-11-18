<template>
  <v-container>
    <h1>This is Community Main</h1>
    <ArticleItem v-for="temp in tempList" :key="temp.title" :temp="temp" />
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="15"
        :total-visible="7"
      ></v-pagination>
    </div>

    <!-- 새 글 작성 Dialog -->
    <v-dialog v-model="dialog" scrollable width="700">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="green" dark v-bind="attrs" v-on="on" id="create-article">
          새 글 작성하기
        </v-btn>
      </template>
      <v-card>
        <v-card-title>새 글 작성하기</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field label="Title"></v-text-field>
          <v-textarea label="Content"></v-textarea>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="d-flex justify-end">
          <v-btn color="green darken-1" text @click="dialog = false">
            닫기
          </v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">
            게시하기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import ArticleItem from "../community/ArticleItem.vue";

export default {
  name: "Index",
  components: {
    ArticleItem,
  },
  data() {
    return {
      dialog: false,
      page: 1,
      tempList: [
        {
          title: "test1",
          content: "content test oh it's sooooooooooooooooooooooooooooo",
        },
        {
          title: "test2",
          content: "content test",
        },
        {
          title: "test3",
          content: "content test",
        },
        {
          title: "test4",
          content: "content test",
        },
        {
          title: "test5",
          content: "content test",
        },
        {
          title: "test6",
          content: "content test",
        },
        {
          title: "test7",
          content: "content test",
        },
      ],
    };
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
