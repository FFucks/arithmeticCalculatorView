<template>
  <v-container class="mt-16" fluid>
    <v-layout row wrap align-center>
      <v-flex>
        <v-card class="mx-auto" max-width="400">
          <v-card-title class="text-center d-block">
            <div class="logo-atma"></div>
          </v-card-title>
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
                color="flow-color"
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
                label="Senha"
                outlined
                :rules="password_rules"
                color="flow-color"
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
                  class="atma-bg white--text"
                  type="submit"
                  form="login-form"
                  :loading="loading"
                >
                  Continuar</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    data() {
      return {
        username: "",
        username_rules: [(v) => !!v],
        password: "",
        password_rules: [(v) => !!v],
        password_show: false,
        forgot_password: false,
      };
    },
    computed: {
      ...mapState("UserLogged", ["loading"]),
    },
    methods: {
      login() {
        if (this.$refs.form.validate()) {
          console.log("Logou")
        }
      },
      async forgetPassword() {
        if (this.email) {
          // let resp = await core.forgotPassword(this.email);
        }
      },
    },
  };
</script>
