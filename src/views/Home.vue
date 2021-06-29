<template>
  <b-container>
    <b-col >
      <b-card class="mt-5 resena-card-mobile">
        <b-container>
          <b-row>
            <b-col>
              <b-input-group
                :prepend="$t('api-key', this.$store.getters.language)"
                class="mt-3"
              >
                <b-form-input
                  class="resena-ellipsis"
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
            <b-col cols="5" sm="3" md="2">
              <label for="resena-credits">
                <h4>
                  <b-badge variant="primary"
                    >{{ $t("credit", this.$store.getters.language) }}:</b-badge
                  >
                </h4>
              </label>
            </b-col>
            <b-col cols="7" sm="9" md="10">
              <b-input-group
                size="md"
                :prepend="$t('money', this.$store.getters.language)"
              >
                <b-form-input
                  id="resena-credits"
                  class="resena-credits"
                  :disabled="true"
                  v-model="this.$store.getters.credits"
                ></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>
        </b-container>
        <b-container>
          <b-row class="mt-4">
            <b-col cols="5" sm="3" md="2">
              <label for="resena-request">
                <h4>
                  <b-badge variant="primary"
                    >{{
                      $t("requests", this.$store.getters.language)
                    }}:</b-badge
                  >
                </h4>
              </label>
            </b-col>
            <b-col cols="7" sm="3" md="4">
              <b-form-input
                id="resena-requests"
                class="resena-requests"
                :disabled="true"
                v-model="this.$store.getters.requests"
              ></b-form-input>
            </b-col>
            <b-col cols="5" sm="2" md="2" class="resena-mt-mobile" id="resena-ppr">
              <label for="resena-price-requests">
                <h4>
                  <b-badge variant="primary"
                    >{{ $t("ppr", this.$store.getters.language) }}:</b-badge
                  >
                </h4>
              </label>
            </b-col>
            <b-col cols="7" sm="4" md="4" class="resena-mt-mobile">
              <b-input-group
                size="md"
                :prepend="$t('money', this.$store.getters.language)"
              >
                <b-form-input
                  id="resena-price-requests"
                  class="resena-price-requests"
                  :disabled="true"
                  v-model="this.$store.getters.priceRequest"
                ></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>
        </b-container>
      </b-card>
    </b-col>
    <b-tooltip target="resena-ppr" triggers="hover">
      {{ $t("price-requests", this.$store.getters.language) }}
    </b-tooltip>
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
          .then((response) => {
            this.$store.commit("updateApiKey", response.data.apiKey);
            this.$store.commit("updateCredits", response.data.credits);
            this.$store.commit(
              "updateRequests",
              response.data.processedRequests
            );
            this.$store.commit(
              "updatePriceRequest",
              response.data.pricePerRequest
            );
          })
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
.resena-credits,
.resena-requests,
.resena-price-requests {
  text-align: right;
}
@media only screen and (max-width: 575px) {
  .resena-mt-mobile {
    margin-top:8%;
  }
  .resena-card-mobile .card-body{
    padding: 0.01rem;
  }
}
@media only screen and (max-width: 483px) {
  .resena-ellipsis {
    text-overflow: ellipsis;
  }
}
</style>