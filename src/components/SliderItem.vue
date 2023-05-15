<template>
  <div class="d-flex bd-highlight">
    <div class="me-auto bd-highlight">
      <h3>{{ title }}</h3>
    </div>
    <button
      @click="resultPage()"
      style="border: none; background-color: none; border-radius: 20px"
    >
      <div class="p-2 bd-highlight" style="color: #fbc009">
        {{ $t("voir_plus") }}
      </div>
    </button>
  </div>
  <!-- //ads.length > 2 ? 4 : 2 -->

  <carousel
    :items-to-show="windowWidth < 1000 ? 1 : windowWidth < 1400 ? 3 : 3.5" 
    wrap-around="true"
  >
    <slide v-for="item in ads" :key="item">
      <div style="padding: 10px">
        <div class="g-4 containerItem">
          <div @click="detail(item)">
            <div class="rounded overflow-hidden">
              <div class="position-relative overflow-hidden">
                <img
                  :src="item.image[0]"
                  alt=""
                  style="
                    width: 100%;
                    height: 200px;
                    padding: 10px;
                    border-radius: 20px;
                  "
                />
              </div>
              <div style="padding-left: 16px; padding-right: 16px">
                <div style="" class="d-flex align-items-start mb-2">
                  {{ item.title }}
                </div>
                <div style="" class="d-flex justify-content-between">
                  <div class="d-flex">
                    <i class="fa-sharp fa-solid fa-location-dot mt-1" style="color: #fbc609;"></i> <div class="mx-2">{{ item.city }}</div>
                  </div>
                    <h5>{{ item.price }} DH</h5>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="">
                  </div>
                  <!-- <div class="">
                    <button
                      class="btn py-2 px-4 ms-3"
                      style="
                        background-color: #fbc609;
                        color: #fff;
                        width: 80%;
                        border-radius: 10px;
                      "
                    >
                      Voir
                    </button>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </slide>

    <template #addons>
      <navigation />
      <!-- <pagination /> -->
    </template>
  </carousel>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";

export default {
  props: {
    ads: Array,
    title: String,
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
    async resultPage() {
      await this.$store.dispatch("voirPlus", this.ads);
      this.$router.push({
        name: "Resultat",
        params: { name: this.title },
        query: { uid: this.ads[0].category.uid, name: "category" },
      });
    },
    async detail(item) {
      await this.$store.dispatch("detail", item);
      this.$router.push({ name: "Detail", params: { uid: item.uid } });
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
.containerItem {
  border-radius: 18px;
  padding-bottom: 20px;
  cursor: pointer;
  width: 320px;
  box-shadow: 1px 1px 1.5px rgb(221, 221, 221), 0em 0em 1em rgb(221, 221, 221);
}
.voirPlus {
  padding: 30px;
}
</style>
