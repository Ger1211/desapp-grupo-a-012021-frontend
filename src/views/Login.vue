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
            <b-button variant="primary" @click="login">{{
              $t("login", this.$store.getters.language)
            }}</b-button>
          </b-row>
        </b-container>
      </b-card>
    </b-col>
  </b-container>
</template>

<script>
var bcrypt = require("bcryptjs");

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    encodedPassword() {
      var salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(this.password, salt);
    },
  },
  methods: {
    login() {
      (async () => {
        const rawResponse = await fetch(
          "http://localhost:8989/api/authentication",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password,
            }),
          }
        );
        const data = await rawResponse.json();
        this.$store.commit("updateToken", data.token);
        this.$store.commit("updatePlatform", data.platform);
      })()
        .then(() => this.$router.push("/"))
        .then(() =>
          this.makeToast(
            "success",
            this.$i18n.t("awesome", this.$store.getters.language),
            this.$i18n.t("login-success", this.$store.getters.language)
          )
        )
        .catch(() =>
          this.makeToast(
            "danger",
            this.$i18n.t("sorry", this.$store.getters.language),
            this.$i18n.t("login-fail", this.$store.getters.language)
          )
        );
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
