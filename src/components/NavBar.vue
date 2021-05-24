<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-brand href="#">
      <b-icon icon="camera-reels-fill"></b-icon>
      Re-seña!
    </b-navbar-brand>

    <b-navbar-nav class="ml-auto">
      <template v-if="this.$store.getters.token">
        <b-nav-item class="resena-decoration-none" @click="logout"
          >Log Out</b-nav-item
        >
      </template>
      <template v-else>
        <b-nav-item class="resena-decoration-none" @click="login"
          >Sign In</b-nav-item
        >
        <b-nav-item class="resena-decoration-none" @click="register"
          >Sign Up</b-nav-item
        >
      </template>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    logout() {
      this.$store.commit("updateToken", null);
      this.$router.push("/login");
    },
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/register");
    }
  },
};
</script>

<style scoped>
.resena-decoration-none a,
.resena-decoration-none a:hover,
.resena-decoration-none a:link,
.resena-decoration-none a:visited,
.resena-decoration-none a:active {
  color: #fff;
  text-decoration: none;
}
</style>
