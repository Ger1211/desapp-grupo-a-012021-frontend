<template>
  <b-container>
    <b-col align="center">
      <b-card class="mt-5">
        <b-input-group prepend="API Key" class="mt-3">
          <b-form-input
            id="api-key"
            v-model="this.$store.getters.apiKey"
            :disabled="true"
          ></b-form-input>
          <b-input-group-append id="tooltip-copy">
            <b-button
              :variant="color"
              v-clipboard="this.$store.getters.apiKey"
              v-clipboard:success="copySucces"
              v-clipboard:error="copyError"
            >
              <template v-if="doCopy">
                <b-icon icon="clipboard-check"></b-icon>
              </template>
              <template v-else>
                <b-icon icon="clipboard"></b-icon>
              </template>
            </b-button>
          </b-input-group-append>
        </b-input-group>

        <b-tooltip
          :disabled.sync="disabled"
          :show.sync="show"
          ref="tooltip"
          target="tooltip-copy"
        >
          Copy to clipboard!
        </b-tooltip>
      </b-card>
    </b-col>
  </b-container>
</template>

<script>
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
    copySucces() {
      this.color = "success";
      this.doCopy = true;
      this.disabled = false;
      this.show = true;
    },
    copyError() {
      this.color = "danger";
      this.doCopy = false;
      this.disabled = true;
      this.show = false;
    },
    findApiKey() {
      if (this.$store.getters.token) {
        (async () => {
          const rawResponse = await fetch(
            `http://localhost:8989/api/platforms/${this.$store.getters.platform}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.$store.getters.token}`,
              },
            }
          );
          const data = await rawResponse.json();
          this.$store.commit("updateApiKey", data.apiKey);
        })();
      }
    },
  },
};
</script>
