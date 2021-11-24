<template>
  <v-container width="50%">
    <div class="auth-wrapper auth-v1">
      <div class="auth-inner">
        <v-card class="auth-card">
          <!-- logo -->
          <v-card-title class="d-flex align-center justify-center py-7">
            <h2 class="text-2xl font-weight-semibold">Signup</h2>
          </v-card-title>

          <!-- title -->
          <v-card-text>
            <p class="text-2xl font-weight-semibold text--primary mb-2">
              Welcome to SSAFYATER! 👋🏻
            </p>
            <p class="mb-2">Please sign-up to your account and start the adventure!</p>
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
                placeholder="············"
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
                placeholder="············"
                :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                hide-details
                class="mb-3"
                @click:append="showConfirm = !showConfirm"
              ></v-text-field>

              <v-btn block color="grey lighten-2" class="mt-6 black--text" @click="signup">
                Sign Up
              </v-btn>
            </v-form>
          </v-card-text>

          <!-- create new account  -->
          <v-card-text
            class="d-flex align-center justify-center flex-wrap mt-2"
          >
            <span class="me-2"> Already have an account? </span>
            <router-link :to="{ name: 'Login' }" class="white--text"> Sign in instead </router-link>
          </v-card-text>

          <!-- divider -->
          <v-card-text class="d-flex align-center mt-2">
            <v-divider></v-divider>
            <span class="mx-5">or</span>
            <v-divider></v-divider>
          </v-card-text>

          <!-- social link -->
          <v-card-actions class="d-flex justify-center">
            <v-btn
              v-for="link in socialLink"
              :key="link.icon"
              icon
              class="ms-1"
            >
              <v-icon
                :color="$vuetify.theme.dark ? link.colorInDark : link.color"
              >
                {{ link.icon }}
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
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
