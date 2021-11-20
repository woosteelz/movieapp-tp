<template>
  <div id="main">
    <div>
      <div class="ma-3">
        <v-btn width="80%" x-large color="primary">영화추천</v-btn>
      </div>
      <div class="ma-3">
        <v-btn width="80%" x-large color="primary">로그인</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",

  components: {},
};
</script>

<style scoped>
#main {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
}
</style>
