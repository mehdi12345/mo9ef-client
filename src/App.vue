<script>
export default {
  components: {},

  data() {
    return {
      ads: [],
      categories: [],
      machine_categories: [],
    };
  },
  methods: {
    async getData() {
      await this.$store.dispatch("getAds");
      await this.$store.dispatch("getCatigores");
      await this.$store.dispatch("getMachine_categories");
      await this.$store.dispatch("setLoading", true);
    },
  },
  mounted() {
    this.getData();
    this.$i18n.locale =
      localStorage.getItem("lang") == null
        ? "fr"
        : localStorage.getItem("lang");
    // Get a list of cities from your database
  },
};
</script>
<template>
  <div>
    <!-- <model-detail /> -->
    <router-view />
  </div>
</template>
<style></style>
