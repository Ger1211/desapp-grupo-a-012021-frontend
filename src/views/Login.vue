<template>
  <b-container>
    <b-col align="center">
      <b-card
        title="Sign In"
        style="max-width: 20rem"
        align="center"
        class="mt-5"
      >
        <b-form-input
          id="username"
          type="text"
          placeholder="Username"
          required
          v-model="username"
          class="mt-4"
        ></b-form-input>
        <b-form-input
          id="password"
          type="password"
          placeholder="Password"
          required
          v-model="password"
          class="mt-4"
        ></b-form-input>
        <b-container class="mt-4">
          <b-row align-h="between">
            <b-button variant="outline-primary" @click="register"
              >Sign up</b-button
            >
            <b-button variant="primary" @click="login">Login</b-button>
          </b-row>
        </b-container>
      </b-card>
    </b-col>
  </b-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      (async () => {
        const rawResponse = await fetch(
          "http://localhost:8989/api/users/authentication",
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
      })()
        .then(() => this.$router.push("/"))
        .then(() => this.makeToast("success", "Awesome", "Login success"))
        .catch(() => this.makeToast("danger", "Sorry", "Login fail"));
    },
    makeToast(variant, title, bodyMessage) {
      this.$bvToast.toast(bodyMessage, {
        title: title,
        variant: variant,
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
