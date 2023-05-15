<template>
  <main-view />
  <loding-component v-if="ads.length == 0 && !show" />
  <div v-if="show">
    <div v-if="show && ads.length == 0">
      <vid-component />
    </div>
    <div class="container" style="margin-top: 20px" v-if="ads.length > 0">
      <div class="row g-4">
        <div v-for="item in ads" v-bind:key="item" class="col-lg-4 col-md-6">
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
                      Voir
                    </button>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-store-component />
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
import LodingComponent from "@/components/LodingComponent.vue";
import MainView from "../layouts/MainView.vue";
import AppStoreComponent from "@/components/AppStoreComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import VidComponent from "@/components/VidComponent.vue";
export default {
  components: {
    LodingComponent,
    MainView,
    AppStoreComponent,
    FooterComponent,
    VidComponent,
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
      let Machincategory;
      let ads = [];
      if (
        this.$route.params.category != "null" &&
        this.$route.query.city == "null" &&
        this.$route.query.type == "null"
      ) {
        ads = query(
          collection(db, "ads"),
          where("status", "==", 1),
          where("category", "==", this.$route.params.category),
          this.$route.query.machine!="null"?where("machineCategory", "==", this.$route.query.machine):
          where("status", "==", 1)
        );
      }
      if (
        this.$route.params.category == "null" &&
        this.$route.query.city != "null" &&
        this.$route.query.type == "null"
      ) {
        ads = query(
          collection(db, "ads"),
          where("status", "==", 1),
          where("city", "==", this.$route.query.city),
          this.$route.query.machine!="null"?where("machineCategory", "==", this.$route.query.machine):
          where("status", "==", 1)
        );
      }
      if (
        this.$route.params.category == "null" &&
        this.$route.query.city == "null" &&
        this.$route.query.type != "null"
      ) {
        ads = query(
          collection(db, "ads"),
          where("status", "==", 1),
          where("type", "==", this.$route.query.type),
          this.$route.query.machine!="null"?where("machineCategory", "==", this.$route.query.machine):
          where("status", "==", 1)
        );
      }

      if (
        this.$route.params.category != "null" &&
        this.$route.query.city != "null" &&
        this.$route.query.type == "null"
      ) {
        ads = query(
          collection(db, "ads"),
          where("status", "==", 1),
          where("category", "==", this.$route.params.category),
          where("city", "==", this.$route.query.city),
          this.$route.query.machine!="null"?where("machineCategory", "==", this.$route.query.machine):
          where("status", "==", 1)
        );
      }
      if (
        this.$route.params.category != "null" &&
        this.$route.query.city == "null" &&
        this.$route.query.type != "null"
      ) {
        ads = query(
          collection(db, "ads"),
          where("status", "==", 1),
          where("category", "==", this.$route.params.category),
          where("type", "==", this.$route.query.type),
          this.$route.query.machine!="null"?where("machineCategory", "==", this.$route.query.machine):
          where("status", "==", 1)
        );
      }
      if (
        this.$route.params.category == "null" &&
        this.$route.query.city != "null" &&
        this.$route.query.type != "null"
      ) {
        ads = query(
          collection(db, "ads"),
          where("status", "==", 1),
          where("city", "==", this.$route.query.city),
          where("type", "==", this.$route.query.type),
          this.$route.query.machine!="null"?where("machineCategory", "==", this.$route.query.machine):
          where("status", "==", 1)
        );
      }
      if (
        this.$route.params.category != "null" &&
        this.$route.query.city != "null" &&
        this.$route.query.type != "null"
      ) {
        ads = query(
          collection(db, "ads"),
          where("status", "==", 1),
          where("category", "==", this.$route.params.category),
          where("city", "==", this.$route.query.city),
          where("type", "==", this.$route.query.type),
          this.$route.query.machine!="null"?where("machineCategory", "==", this.$route.query.machine):
          where("status", "==", 1)
        );
      }
      if (
        this.$route.params.category == "null" &&
        this.$route.query.city == "null" &&
        this.$route.query.type == "null"
      ) {
        ads = query(collection(db, "ads"), 
        where("status", "==", 1),
          this.$route.query.machine!="null"?where("machineCategory", "==", this.$route.query.machine):
          where("status", "==", 1)
        );
      }
      const adsSnapshot = await getDocs(ads);
      const adsList = adsSnapshot.docs.map((doc) => doc.data());

      if(adsList.length>0){
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
        if (adsList.length == this.ads.length) {
          this.show = true;
        }
      });
      }else{
        this.show = true;
      }
    },
  },

  mounted() {
    setTimeout(() => {}, 3000);
    this.getData();

    //   if (!localStorage.getItem("user")) {
    //     console.log(localStorage.getItem("user"));
    //     this.$router.push({ name: "login" });
    //   }
  },
};
</script>

<style>
.item {
  border-radius: 20px;
  height: 360px;
  width: 400px;
  margin: 8px;
  box-shadow: 1px 1px 1.5px rgb(221, 221, 221), 0em 0em 1em rgb(221, 221, 221);
}
</style>
