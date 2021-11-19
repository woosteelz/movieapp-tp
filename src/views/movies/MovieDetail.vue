<template>
  <v-container fluid>
    <h1>This is Movie Detail</h1>
    <v-row justify="start">
      <v-col cols="12" md="4"
        ><v-img
          max-height="1600"
          max-width="900"
          lazy-src="https://picsum.photos/id/11/10/6"
          src="https://image.tmdb.org/t/p/w500/1Lh9LER4xRQ3INFFi2dfS2hpRwv.jpg"
          class="ma-1"
        ></v-img>
      </v-col>
      <v-col cols="12" md="6" align="start">
        <v-container>
          <h2>Title : Venom</h2>
          <v-spacer></v-spacer>
          <h4>개봉일 : 2021-11-10</h4>
          <v-divider></v-divider>
          받는다. 죽을 생각이 전혀 없는 클리터스는 자신의 집행일을 연기할
          목적으로 마지막 증언을 남기겠다며 탐사보도로 유명한 프리랜스
          저널리스트 에디를 지목한다. 베놈을 얻는 대신 직장과 연인을 모두 잃고
          폐인처럼 생활하던 에디는 클리터스와의 단독 인터뷰를 통해 다시 한번
          저널리스트로서 재기할 수 있는 기회를 얻는다. 클리터스가 던져주는
          수많은 단서로 인해 미결로 남아 있던 살인사건을 추가로 밝히는 데 성공한
          에디는 제일 먼저 앤에게 달려가지만 전편에서 에디의 몸에 베놈이 산다는
          것을 알게 된 그녀는 새로운 연인 댄 박사(레이드 스콧)와 결혼을
          선언한다. 평정심을 잃은 에디는 클리터스와의 인터뷰 중 실수로
          클리터스가 새로운 빌런 카니지로 거듭나는 빌미를 제공하고 마는데..."
        </v-container>
      </v-col>
      <v-col cols="12" md="2">
        <v-icon color="red" class="ma-3" v-if="like" @click="like = !like"
          >mdi-heart-outline</v-icon
        >
        <v-icon color="red" class="ma-3" v-else @click="like = !like"
          >mdi-heart</v-icon
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      like: false,
    };
  },
};
</script>
