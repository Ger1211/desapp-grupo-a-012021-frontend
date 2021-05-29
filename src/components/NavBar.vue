<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-brand href="#">
      <b-icon icon="camera-reels-fill"></b-icon>
      Re-seña!
    </b-navbar-brand>

    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown :text="lang" class="resena-decoration-none mr-3">
        <b-dropdown-item @click="setEn">EN</b-dropdown-item>
        <b-dropdown-item @click="setEs">ES</b-dropdown-item>
      </b-nav-item-dropdown>
      <template v-if="this.$store.getters.token">
        <b-avatar variant="primary"></b-avatar>
        <span class="mr-2 mt-2 ml-2 resena-color-platform">{{
          this.$store.getters.platform
        }}</span>
        <b-nav-item class="resena-decoration-none" @click="logout"
          >{{$t('log-out', this.$store.getters.language)}}</b-nav-item
        >
      </template>
      <template v-else>
        <b-nav-item class="resena-decoration-none" @click="login"
          >{{$t('sign-in', this.$store.getters.language)}}</b-nav-item
        >
        <b-nav-item class="resena-decoration-none" @click="register"
          >{{$t('sign-up', this.$store.getters.language)}}</b-nav-item
        >
      </template>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      lang: "EN"
    }
  },
  name: "NavBar",
  methods: {
    logout() {
      this.$store.commit("updateToken", null);
      this.$router.push("/login");
    },
    login() {
      if (this.$route.name !== "Login") {
        this.$router.push("/login");
      }
    },
    register() {
      if (this.$route.name !== "Register") {
        this.$router.push("/register");
      }
    },
    setEn() {
      this.lang = 'EN';
      this.$store.commit('updateLanguage', 'en');
    },
    setEs() {
      this.lang = 'ES';
      this.$store.commit('updateLanguage', 'es');
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

.resena-color-platform {
  color: #fff;
}
</style>
