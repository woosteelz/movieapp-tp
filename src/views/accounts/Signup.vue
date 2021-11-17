<template>
  <v-container>
    <h1>This is Signup page</h1>
    <v-form>
      <v-container fluid>
        <v-col>
          <!-- email -->
          <v-text-field
            v-model="email"
            :rules="[rules.emailRequired, rules.email]"
            label="E-mail"
          ></v-text-field>

          <!-- name -->
          <v-text-field
            v-model="nickname"
            :rules="[rules.nameRequired]"
            label="name"
          ></v-text-field>

          <!-- password -->
          <v-text-field
            v-model="password"
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.passwordRequired, rules.min]"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-2"
            label="비밀번호"
            value=""
            class="input-group--focused"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <!-- password confirm -->
          <v-text-field
            v-model="passwordConfirm"
            :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.passwordRequired, rules.min, rules.passwordCorrect]"
            :type="showConfirm ? 'text' : 'password'"
            name="input-10-2"
            label="비밀번호 확인"
            value=""
            class="input-group--focused"
            @click:append="showConfirm = !showConfirm"
          ></v-text-field>
          <div class="d-flex justify-end">
            <v-btn @click.prevent="signup" color="light-green">Signup</v-btn>
          </div>
        </v-col>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: "Signup",
  data() {
    return { 
      email: "",
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
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/signup/',
        data: {
          email : this.email,
          nickname : this.nickname,
          password : this.password,
          passwordConfirm : this.passwordConfirm,
        },
      })
        .then(() => {
          this.$router.push({ name: 'Login'})
        })
        .catch(err => {
          console.log(err)
        })
    }
  }  
};
</script>
