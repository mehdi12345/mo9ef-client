<template>
  <div>
    <layouts />
    <div v-if="!show" class="carousel-item active align-self-center">
      <loding />
    </div>
    <div>
      <div class="fadeInUp">
        <h1 class="text-center mb-5">{{ this.$route.params.name }}</h1>
      </div>
    <div v-if="ads.length == 0 && show">
      <vide-component />
    </div>
      <!-- Projects Start -->
      <div class="container-xxl" v-if="show && ads.length > 0">
        <div class="container">
          <div class="row g-4 portfolio-container">
            <div
              v-for="item in ads"
              v-bind:key="item"
              class="col-lg-4 col-md-6"
            >
              <div
                style="
                  border-radius: 20px;
                  margin: 8px;
                  box-shadow: 1px 1px 1.5px rgb(221, 221, 221),
                    0em 0em 1em rgb(221, 221, 221);
                "
                @click="detail(item)"
              >
                <div class="rounded">
                  <div class="position-relative" style="padding: 10px">
                    <img
                      class="img-fluid w-100"
                      :src="item.image[0]"
                      alt=""
                      style="width: 200px; height: 200px; border-radius: 10px"
                    />
                    <!-- <div class="portfolio-overlay">
                      <a
                        class="btn btn-square btn-outline-light mx-1"
                        :href="item.image[0]"
                        data-lightbox="portfolio"
                        ><i class="fa fa-eye"></i
                      ></a>
                    </div> -->
                  </div>
                  <div style="padding: 16px">
                    <div class="">
                      <p class="fw-medium mb-2">
                        {{ item.title }}
                      </p>
                    </div>
                    <div style="" class="d-flex justify-content-between">
                  <div class="d-flex">
                    <i class="fa-sharp fa-solid fa-location-dot mt-1" style="color: #fbc609;"></i> <div class="mx-2">{{ item.city }}</div>
                  </div>
                    <h5>{{ item.price }} DH</h5>
                </div>
                    <!-- <div class="row">
                      <div class="col">
                        <h5 class="lh-base mb-0">{{ item.price }} DH</h5>
                      </div>
                      <div class="col">
                        <button
                          class="btn py-2 px-4 ms-3"
                          style="
                            background-color: #fbc609;
                            color: #fff;
                            width: 80%;
                            border-radius: 10px;
                          "
                        >
                          Appler
                        </button>
                      </div>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-component />
  </div>
</template>

<script>
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore/lite";
import loding from "@/components/LodingComponent.vue";
import layouts from "@/views/layouts/MainView.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import VideComponent from "@/components/VidComponent.vue";

export default {
  components: {
    loding,
    layouts,
    FooterComponent,
    VideComponent,
  },
  props: {
    title: String,
  },
  data() {
    return {
      show: false,
      ads: [],
    };
  },
  methods: {
    async detail(item) {
      await this.$store.dispatch("detail", item);
      this.$router.push({ name: "Detail", params: { uid: item.uid } });
    },

    async getData() {
      console.log(this.ads.length);
      let Machincategory;

      const ads = query(
        collection(db, "ads"),
        where("status", "==", 1),
        where(this.$route.query.name, "==", this.$route.query.uid)
      );

      const adsSnapshot = await getDocs(ads);
      const adsList = adsSnapshot.docs.map((doc) => doc.data());

      // get users de annonse
      adsList.forEach(async (e) => {
        // cleint
        const userDoc = doc(db, "users", e.client);
        const user = await getDoc(userDoc);
        // categore
        const categoryDoc = doc(db, "categories", e.category);
        const category = await getDoc(categoryDoc);
        // machin catigore
        try {
          const MachincategoryDoc = doc(
            db,
            "machine_categories",
            e.machineCategory
          );
          Machincategory = await (await getDoc(MachincategoryDoc)).data();
        } catch (e) {
          console.log("err");
        }

        // data

        let item = {
          uid: e.uid,
          title: e.title,
          image: e.images,
          city: e.city,
          description: e.description,
          price: e.price,
          type: e.type,
          client: user.data(),
          category: category.data(),
          Machincategory: Machincategory,
          createdAt: new Date(e.createdAt).toLocaleDateString("fr-FR"),
          status: e.status,
        };

        this.ads.push(item);
        console.log("data", this.ads.length);
      });
      if (adsList) {
        this.show = true;
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style></style>
