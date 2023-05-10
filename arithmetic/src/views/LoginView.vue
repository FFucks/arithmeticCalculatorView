<template>
  <v-container class="mt-16" fluid>
    <v-layout row wrap align-center>
      <v-flex>
        <v-card class="mx-auto" max-width="400">
          <v-card-text>
            <v-form id="login-form" ref="form" @submit.prevent="login()">
              <v-text-field
                v-model="username"
                :rules="username_rules"
                class="py-2 pt-4"
                label="Login"
                placeholder=""
                persistent-placeholder
                outlined
                hide-details
              ></v-text-field>

              <v-text-field
                v-if="!forgot_password"
                v-model="password"
                class="password_view pt-4"
                placeholder=""
                persistent-placeholder
                :append-icon="password_show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="password_show ? 'text' : 'password'"
                hide-details
                name="password"
                label="Password"
                outlined
                :rules="password_rules"
                @click:append="password_show = !password_show"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="px-4 pb-4 d-block">
            <v-row no-gutters>
              <v-col cols="12" md="12">
                <v-btn
                  x-large
                  block
                  depressed
                  class="white--text"
                  type="submit"
                  form="login-form"
                  color="indigo"
                >
                  OK
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="snackbar"
      timeout='3000'
    >
      'User or password invalid !!'

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
  import { mapState } from "vuex";
  import api from '@/services/api.js';

  export default {
    data() {
      return {
        username: "",
        username_rules: [(v) => !!v],
        password: "",
        password_rules: [(v) => !!v],
        password_show: false,
        forgot_password: false,
        snackbar: false
      };
    },
    computed: {
      ...mapState("UserLogged", ["loading"]),
    },
    methods: {
      async login() {
        if (this.$refs.form.validate()) {
          const login = {
            username: this.username,
            password: this.password
          }

          await api.post('/token', login).then(response => {
            localStorage.setItem('Authorization', response.data.token);
            
            console.log(response);
          }).catch(() => {
            this.snackbar = true;
            localStorage.clear();
          }) 

          api.post('/login', login).then((resp) => {
              localStorage.setItem('userBalance', resp.data.userBalance);
              localStorage.setItem('userId', resp.data.userId);
              this.$router.push('/');
              console.log("Logou")

            }).catch(() => {
              this.snackbar = true;
              localStorage.clear();
            }) 

        }
      }
    },
  };
</script>
