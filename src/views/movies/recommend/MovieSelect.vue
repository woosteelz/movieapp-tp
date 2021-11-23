<template>
  <div></div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem("jwt");
      const config = {
        Authorization: `JWT ${token}`,
      };
      return config;
    },
  },
  created() {
    const select = this.$route.query.select;
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/movies/recommend/select/",
      data: select,
      headers: this.setToken(),
    }).then((res) => {
      console.log(res);
    });
  },
};
</script>
