<template>
  <div class="container">
    <h1>{{ $t("machine_category") }}</h1>
    <br />

    <carousel
      :items-to-show="windowWidth < 1000 ? 1 : windowWidth < 1400 ? 3 : 4"
    >
      <slide v-for="item in machine_categories" :key="item">
        <div class="g-4 portfolio-container">
          <button class="btnStle" @click="resultPage(item)">
            <div>
              <div class="rounded overflow-hidden">
                <div class="position-relative overflow-hidden">
                  <img
                    :src="item.image"
                    alt=""
                    style="width: 300px; height: 200px"
                  />
                </div>
                <h5>{{ item.name }}</h5>
              </div>
            </div>
          </button>
        </div>
      </slide>
      <template #addons>
        <navigation />
        <!-- <pagination /> -->
      </template>
    </carousel>
  </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";

export default {
  props: {
    machine_categories: Array,
  },
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },

  methods: {
    resultPage(item) {
      // await this.$store.dispatch("findByCategore", item.uid);
      this.$router.push({
        name: "Resultat",
        params: { name: item.name },
        query: { uid: item.uid, name: "machineCategory" },
      });
    },
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
    };
  },
};
</script>

<style>
.btnStle {
  border: none;
  border-radius: 16px;
  margin-bottom: 10px;
  margin-top: 14px;
  /* box-shadow: 1px 1px 1px 1px rgb(202, 202, 202); */
  background-color: #fff;
  /* box-shadow: 1px 1px rgb(221, 221, 221), -0.1em 0 1em rgb(221, 221, 221); */
  background: #fff;
  box-shadow: 1px 1px 1.5px rgb(221, 221, 221), 0em 0em 1em rgb(221, 221, 221);
}
</style>
