<template>
  <v-container>
    <!-- ----------------------- -->
    <v-card
      class="auth-card justify-center"
      transparent
      width=""
      rounded="3"
      height=""
      color="purple darken-4"
    >
      <!-- title -->
      <v-card-title class="d-flex align-center justify-center py-7">
        <h2 class="text-2xl font-weight-semibold">Login</h2>
      </v-card-title>

      <!-- login form -->
      <v-card-text>
        <h2>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Welcome to SSAFYATER! 👋🏻
          </p>
        </h2>
        <p class="mb-2">
          Please sign-in to your account and start the adventure
        </p>
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
            <a href="javascript:void(0)" class="mt-1"> Forgot Password? </a>
          </div>

          <v-btn block color="primary" class="mt-6" @click.prevent="login">
            Login
          </v-btn>
        </v-form>
      </v-card-text>

      <!-- create new account  -->
      <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
        <span class="me-2"> New on our platform? </span>
        <router-link :to="{ name: 'Signup' }"> Create an account </router-link>
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
        url: "http://127.0.0.1:8000/accounts/api-token-auth/",
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
