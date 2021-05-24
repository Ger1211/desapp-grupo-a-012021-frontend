<template>
  <b-container>
    <b-col align="center">
      <b-card
        title="Sign Up"
        style="max-width: 20rem"
        align="center"
        class="mt-5"
      >
        <b-form-input
          id="username"
          type="text"
          placeholder="Username"
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
          placeholder="Password"
          required
          v-model="password"
          :state="passValid"
          class="mt-4"
        ></b-form-input>
        <b-form-input
          id="confirmation"
          type="password"
          placeholder="Confirmation"
          required
          v-model="confirmation"
          :state="confirmValid"
          class="mt-4"
        ></b-form-input>
        <b-container class="mt-4">
          <b-row align-h="between">
            <b-button variant="outline-primary" @click="login"
              >Sign In</b-button
            >
            <b-button variant="primary" @click="register">Register</b-button>
          </b-row>
        </b-container>
      </b-card>
    </b-col>
  </b-container>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      confirmation: "",
      focus: true,
    };
  },
  computed: {
    passValid() {
      if (this.password.length >= 8) {
        let regex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
        return regex.test(this.password);
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
      if (!this.focus && this.username.length < 3) {
        return false;
      } else {
        return null;
      }
    },
  },
  methods: {
    register() {
      (async () => {
        const rawResponse = await fetch(
          "http://localhost:8989/api/users/registration",
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
      })()
        .then(() => this.$router.push("/login"))
        .then(() =>
          this.makeToast("success", "Awesome", "Registration success")
        )
        .catch(() => this.makeToast("danger", "Sorry", "Registration fail"));
    },
    makeToast(variant, title, bodyMessage) {
      this.$bvToast.toast(bodyMessage, {
        title: title,
        variant: variant,
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