<template>
  <v-container class="d-flex justify-center">
    <v-card class="auth-card" min-width="344">
      <!-- logo -->
      <v-card-title class="d-flex align-center justify-center py-7">
        <h2 class="text-2xl font-weight-semibold">회원가입</h2>
      </v-card-title>

      <!-- title -->
      <v-card-text>
        <h3>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            SSAFYATER에 오신걸 환영합니다! 👋🏻
          </p>
        </h3>
        <p class="mb-2">당신의 멋진 식사와 함께할 영화를 찾아보세요!</p>
      </v-card-text>

      <!-- login form -->
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="nickname"
            outlined
            label="name"
            placeholder="name"
            hide-details
            class="mb-3"
          ></v-text-field>

          <v-text-field
            v-model="email"
            outlined
            label="Email"
            placeholder="example@example.com"
            hide-details
            class="mb-3"
          ></v-text-field>

          <v-text-field
            v-model="password"
            outlined
            :type="showPassword ? 'text' : 'password'"
            label="비밀번호"
            placeholder=""
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            hide-details
            class="mb-3"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-text-field
            v-model="passwordConfirm"
            outlined
            :type="showConfirm ? 'text' : 'password'"
            label="비밀번호 확인"
            placeholder=""
            :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
            hide-details
            class="mb-3"
            @click:append="showConfirm = !showConfirm"
          ></v-text-field>

          <v-btn
            block
            color="deep-purple darken-3"
            class="mt-6 white--text"
            @click="signup"
          >
            가입하기
          </v-btn>
        </v-form>
      </v-card-text>

      <!-- create new account  -->
      <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
        <span class="me-2"> 이미 계정을 가지고 있나요? </span>
        <router-link :to="{ name: 'Login' }" class="white--text">
          로그인하기
        </router-link>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Signup",
  data() {
    return {
      signupSuccess: false,
      email: "",
      nickname: "",
      password: "",
      passwordConfirm: "",
      showPassword: false,
      showConfirm: false,
      rules: {
        emailRequired: (value) => !!value || "이메일을 입력하세요",
        passwordRequired: (value) => !!value || "비밀번호를 입력하세요",
        nameRequired: (value) => !!value || "이름을 입력하세요",
        min: (v) => v.length >= 8 || "비밀번호는 최소 8글자 입니다.",
        passwordCorrect: (value) => {
          if (this.password !== value) {
            return "비밀번호가 일치하지 않습니다.";
          } else {
            return "비밀번호가 일치합니다.";
          }
        },
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "유효한 이메일이 아닙니다.";
        },
      },
    };
  },
  methods: {
    signup: function () {
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/accounts/signup/",
        data: {
          email: this.email,
          nickname: this.nickname,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
        },
      })
        .then(() => {
          this.$router.push({ name: "Login" });
        })
        .catch((err) => {
          console.log(err);
        });
      this.signupSuccess = true;
    },
  },
};
</script>
