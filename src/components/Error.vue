<template>
  <div>
    <div class="page-title text-center px-5">
      <h1
        class="
          text-2xl
          font-weight-semibold
          text--primary
          d-flex
          align-center
          justify-center
        "
      >
        <span class="me-2">404: Page Not Found</span>
        <v-icon color="warning"> mdi-alert </v-icon>
      </h1>
      <p class="text-sm">에러가 발생했습니다.</p>

      <v-btn color="error" to="/" class="mb-4"> 홈으로 돌아가기 </v-btn>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
