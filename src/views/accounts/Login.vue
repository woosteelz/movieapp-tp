<template>
  <v-container class="d-flex justify-center">
    <!-- ----------------------- -->
    <v-card
      class="auth-card justify-center"
      transparent
      max-width="344"
      rounded="3"
      height=""
    >
      <!-- title -->
      <v-card-title class="d-flex align-center justify-center py-7">
        <h2 class="text-2xl font-weight-semibold">로그인</h2>
      </v-card-title>

      <!-- login form -->
      <v-card-text>
        <h3>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            SSAFYATER에 오신걸 환영합니다! 👋🏻
          </p>
        </h3>
        <p class="mb-2">당신의 멋진 식사와 함께할 영화를 찾아보세요!</p>
        <v-form>
          <v-text-field
            v-model="email"
            outlined
            label="Email"
            placeholder="example@example.com"
            hide-details
            class="mb-3"
            :rules="[rules.required, rules.email]"
          ></v-text-field>

          <v-text-field
            v-model="password"
            outlined
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            placeholder="············"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            hide-details
            @click:append="showPassword = !showPassword"
            :rules="[rules.required, rules.min]"
          ></v-text-field>

          <div class="d-flex align-center justify-space-between flex-wrap">
            <v-checkbox label="Remember Me" hide-details class="me-3 mt-1">
            </v-checkbox>

            <!-- forgot link -->
            <a href="javascript:void(0)" class="mt-1 white--text">
              비밀번호를 잊으셨나요?
            </a>
          </div>

          <v-btn
            block
            color="deep-purple darken-3"
            class="mt-6 white--text"
            @click.prevent="login"
          >
            로그인
          </v-btn>
        </v-form>
      </v-card-text>

      <!-- create new account  -->
      <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
        <span class="me-2"> SSAFYATER가 처음이세요? </span>
        <router-link :to="{ name: 'Signup' }" class="white--text">
          계정 만들기
        </router-link>
      </v-card-text>

      <!-- divider -->

      <!-- social links -->
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      loginSuccess: false,
      email: "",
      password: "",
      showPassword: false,
      rules: {
        required: (value) => !!value || "비밀번호를 입력하세요",
        min: (v) => v.length >= 8 || "비밀번호는 최소 8글자 입니다.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "유효한 이메일이 아닙니다.";
        },
      },
    };
  },
  methods: {
    login: function () {
      axios({
        method: "post",
        url: "http://3.143.230.89/accounts/api-token-auth/",
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then((res) => {
          console.log(res);
          localStorage.setItem("jwt", res.data.token);
          this.$emit("login");
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
