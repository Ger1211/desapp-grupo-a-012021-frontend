<template>
  <b-container>
    <b-col align="center">
      <b-card
        :title="$t('sign-up', this.$store.getters.language)"
        style="max-width: 20rem"
        align="center"
        class="mt-5"
      >
        <b-form-input
          id="username"
          type="text"
          :placeholder="$t('username', this.$store.getters.language)"
          required
          :state="userValid"
          v-model="username"
          aria-describedby="input-username-feedback"
          class="mt-4"
          @focus="focus = true"
          @blur="focus = false"
        ></b-form-input>
        <b-form-invalid-feedback align="start" id="input-username-feedback">
          Enter at least 3 letters
        </b-form-invalid-feedback>
        <b-form-input
          id="password"
          type="password"
          :placeholder="$t('password', this.$store.getters.language)"
          required
          v-model="password"
          :state="passValid"
          class="mt-4"
        ></b-form-input>
        <b-form-input
          id="confirmation"
          type="password"
          :placeholder="$t('confirmation', this.$store.getters.language)"
          required
          v-model="confirmation"
          :state="confirmValid"
          class="mt-4"
          @keyup.enter="register"
        ></b-form-input>
        <b-container class="mt-4">
          <b-row align-h="between">
            <b-button variant="outline-primary" @click="login">{{
              $t("sign-in", this.$store.getters.language)
            }}</b-button>
            <template v-if="spinner">
              <b-spinner variant="primary" label="Spinning"></b-spinner>
            </template>
            <template v-else>
              <b-button variant="primary" @click="register">{{
                $t("register", this.$store.getters.language)
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
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      confirmation: "",
      focus: true,
      spinner: false,
    };
  },
  computed: {
    passValid() {
      if (this.password.length >= 8) {
        return true;
      } else {
        return null;
      }
    },
    confirmValid() {
      if (
        this.confirmation.length >= 8 &&
        this.confirmation.length >= this.password.length
      ) {
        return this.confirmation === this.password;
      } else {
        return null;
      }
    },
    userValid() {
      if (!this.focus) {
        return this.username.length > 3;
      } else {
        return null;
      }
    },
    encodedPassword() {
      return sha256(this.password);
    },
  },
  methods: {
    register() {
      if (this.userValid && this.passValid && this.confirmValid) {
        this.spinner = true;
        const body = {
          username: this.username,
          password: this.encodedPassword,
        };
        axios
          .post("registration", body)

          .then(() => (this.spinner = false))
          .then(() => this.$router.push("/login"))
          .then(() =>
            this.makeToast(
              "success",
              this.$i18n.t("awesome", this.$store.getters.language),
              this.$i18n.t("registration-success", this.$store.getters.language)
            )
          )
          .catch(() => {
            this.spinner = false;
            this.makeToast(
              "danger",
              this.$i18n.t("sorry", this.$store.getters.language),
              this.$i18n.t("registration-fail", this.$store.getters.language)
            );
          });
      } else {
        this.makeToast(
          "danger",
          this.$i18n.t("sorry", this.$store.getters.language),
          this.$i18n.t("registration-fail", this.$store.getters.language)
        );
      }
    },
    makeToast(variant, title, bodyMessage) {
      this.$bvToast.toast(bodyMessage, {
        title: title,
        variant: variant,
        toaster: "b-toaster-bottom-right",
        solid: true,
      });
    },
    login() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
</style>