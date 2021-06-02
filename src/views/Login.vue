<template>
  <b-container>
    <b-col align="center">
      <b-card
        :title="$t('sign-in', this.$store.getters.language)"
        style="max-width: 20rem"
        align="center"
        class="mt-5"
      >
        <b-form-input
          id="username"
          type="text"
          :placeholder="$t('username', this.$store.getters.language)"
          required
          v-model="username"
          class="mt-4"
        ></b-form-input>
        <b-form-input
          id="password"
          type="password"
          :placeholder="$t('password', this.$store.getters.language)"
          required
          v-model="password"
          class="mt-4"
          @keyup.enter="login"
        ></b-form-input>
        <b-container class="mt-4">
          <b-row align-h="between">
            <b-button variant="outline-primary" @click="register">{{
              $t("sign-up", this.$store.getters.language)
            }}</b-button>
            <template v-if="spinner">
              <b-spinner variant="primary" label="Spinning"></b-spinner>
            </template>
            <template v-else>
              <b-button variant="primary" @click="login">{{
                $t("login", this.$store.getters.language)
              }}</b-button>
            </template>
          </b-row>
        </b-container>
      </b-card>
    </b-col>
  </b-container>
</template>

<script>
let sha256 = require('js-sha256');
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      spinner: false,
    };
  },
  computed: {
    encodedPassword() {
      return sha256(this.password);
    },
  },
  methods: {
    login() {
      this.spinner = true;
      const body = {
        username: this.username,
        password: this.encodedPassword,
      };
      axios
        .post("authentication", body)
        .then((response) => {
          this.$store.commit("updateToken", response.data.token);
          this.$store.commit("updatePlatform", response.data.platform);
        })
        .then(() => (this.spinner = false))
        .then(() => this.$router.push("/"))
        .then(() =>
          this.makeToast(
            "success",
            this.$i18n.t("awesome", this.$store.getters.language),
            this.$i18n.t("login-success", this.$store.getters.language)
          )
        )
        .catch(() => {
          this.spinner = false;
          this.makeToast(
            "danger",
            this.$i18n.t("sorry", this.$store.getters.language),
            this.$i18n.t("login-fail", this.$store.getters.language)
          );
        });
    },
    makeToast(variant, title, bodyMessage) {
      this.$bvToast.toast(bodyMessage, {
        title: title,
        variant: variant,
        toaster: "b-toaster-bottom-right",
        solid: true,
      });
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
</style>
