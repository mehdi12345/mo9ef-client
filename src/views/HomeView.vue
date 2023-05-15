<template>
  <div class="imagBack">
    <layouts home="active" add="" contact="" favorte="" />
    <slider />
  </div>
  <div class="imagBack"></div>
  <div class="container">
    <div v-if="this.$store.state.loading">
      <categore-items
        v-if="this.$store.state.machine_categories[0].length > 0"
        :machine_categories="this.$store.state.machine_categories[0]"
      />
      <slider-item
        v-if="this.$store.state.soldMachines[0].length > 0"
        :ads="this.$store.state.soldMachines[0]"
        :title="$t('machine_vendre')"
      />
      <slider-item
        v-if="this.$store.state.rentedMachines[0].length > 0"
        :ads="this.$store.state.rentedMachines[0]"
        :title="$t('machine_louer')"
      />
      <slider-item
        v-if="this.$store.state.equipments[0].length > 0"
        :ads="this.$store.state.equipments[0]"
        :title="$t('pieces')"
      />
      <slider-item
        v-if="this.$store.state.transport[0].length > 0"
        :ads="this.$store.state.transport[0]"
        :title="$t('transport')"
      />
      <slider-item
        v-if="this.$store.state.huilles[0].length > 0"
        :ads="this.$store.state.huilles[0]"
        :title="$t('huile_equipement')"
      />
    </div>

    <div v-if="!this.$store.state.loading">
      <center>
        <img
          src="../assets/loading-balls.svg"
          alt=""
          width="100"
          height="100"
        />
      </center>
    </div>
  </div>
  <app-store-component />
  <footer-component />
</template>

<script>
// @ is an alias to /src

import layouts from "@/views/layouts/MainView.vue";
import slider from "@/components/SliderCompenent.vue";
import sliderItem from "@/components/SliderItem.vue";
import categoreItems from "@/components/CatigoreComponent.vue";
// import Loding from "@/components/LodingComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import AppStoreComponent from "@/components/AppStoreComponent.vue";

export default {
  name: "HomeView",
  components: {
    layouts,
    slider,
    sliderItem,
    categoreItems,
    // Loding,
    FooterComponent,
    AppStoreComponent,
  },
};
</script>
<style>
.imagBack {
  background-image: url("../assets/hero-bg.png");
  background-size: cover;
}
</style>
