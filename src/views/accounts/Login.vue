<template>
  <v-container>
    <v-alert v-model="loginSuccess" type="success"></v-alert>
    <h1>This is login page</h1>
    <v-form>
      <v-container fluid>
        <v-col>
          <!-- email -->
          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="E-mail"
          ></v-text-field>

          <!-- password -->
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-2"
            label="password"
            value=""
            class="input-group--focused"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <div class="d-flex justify-end">
            <v-btn @click.prevent="login" color="light-green">login</v-btn>
          </div>
        </v-col>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
// import axios from "axios";

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
      // axios({
      //   method: 'post',
      //   url: 'http://127.0.0.1:8000/accounts/api-token-auth/',
      //   data: {
      //     email: this.email,
      //     password: this.password,
      //   }
      // })
      //   .then(res => {
      //     console.log(res)
      //     localStorage.setItem('jwt', res.data.token)
      //     this.$emit('login')
      //     this.$router.push({ name: 'Home' })
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    },
  },
};
</script>
