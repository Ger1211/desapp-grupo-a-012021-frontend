<template>
  <b-container>
    <b-col align="center">
      <b-card class="mt-5">
        <b-container>
          <b-row>
            <b-col>
              <b-input-group
                :prepend="$t('api-key', this.$store.getters.language)"
                class="mt-3"
              >
                <b-form-input
                  id="api-key"
                  v-model="this.$store.getters.apiKey"
                  :disabled="true"
                ></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>
        </b-container>
        <b-container>
          <b-row class="mt-4">
            <b-col>
              <label for="resena-bill">
                <h4>
                  <b-badge href="#" variant="primary"
                    >{{ $t("bill", this.$store.getters.language) }}:</b-badge
                  >
                </h4>
              </label>
            </b-col>
            <b-col cols="10">
              <b-input-group
                size="md"
                :prepend="$t('money', this.$store.getters.language)"
                append=".00"
              >
                <b-form-input
                  id="resena-bill"
                  class="resena-bill"
                  :disabled="true"
                  v-model="bill"
                ></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>
        </b-container>
      </b-card>
    </b-col>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      color: "secondary",
      doCopy: false,
      disabled: true,
      show: false,
      bill: 0,
    };
  },
  mounted() {
    this.findApiKey();
  },
  methods: {
    findApiKey() {
      if (this.$store.getters.token) {
        const headers = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.getters.token}`,
          },
        };
        axios
          .get(`platforms/${this.$store.getters.platform}`, headers)
          .then((response) =>
            this.$store.commit("updateApiKey", response.data.apiKey)
          )
          .catch(() =>
            this.makeToast(
              "danger",
              this.$i18n.t("sorry", this.$store.getters.language),
              this.$i18n.t("api-key-fail", this.$store.getters.language)
            )
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
  },
};
</script>
<style>
.resena-bill {
  text-align: right;
}
</style>