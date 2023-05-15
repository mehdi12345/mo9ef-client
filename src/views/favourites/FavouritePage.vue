<template>
  <main-view home="" add="" contact="" favorte="active" />
  <loding-component v-if="!show" />
  <div v-if="show">
    <div v-if="ads.length == 0 && show">
      <vide-component />
    </div>
    <div class="container" style="margin-top: 20px" v-if="ads.length > 0">
      <div class="row g-4">
        <div v-for="item in ads" v-bind:key="item" class="col-lg-4 col-md-6">
          <div
            style="
              border-radius: 20px;

              width: 400px;
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
                <div class="row">
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
                </div>
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
  // query,
  // where,
} from "firebase/firestore/lite";
import LodingComponent from "@/components/LodingComponent.vue";
import MainView from "../layouts/MainView.vue";
import AppStoreComponent from "@/components/AppStoreComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import VideComponent from "@/components/VidComponent.vue";
export default {
  components: {
    LodingComponent,
    MainView,
    AppStoreComponent,
    FooterComponent,
    VideComponent,
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
    async getData(uid) {
      let Machincategory;
      const col = collection(db, "users", uid, "savedAds");
      const Snapshot = await getDocs(col);
      const ListSuv = Snapshot.docs.map((doc) => doc.data());

      if (this.ads.length == ListSuv.length) {
        this.show = true;
      }
      ListSuv.forEach(async (element) => {
        const ad = doc(db, "ads", element.uid);
        const ad_res = await getDoc(ad);
        console.log(ad_res.data());
        // cleint
        const userDoc = doc(db, "users", ad_res.data().client);
        const user = await getDoc(userDoc);
        // categore
        const categoryDoc = doc(db, "categories", ad_res.data().category);
        const category = await getDoc(categoryDoc);
        // machin catigore
        try {
          const MachincategoryDoc = doc(
            db,
            "machine_categories",
            ad_res.data().machineCategory
          );
          Machincategory = await (await getDoc(MachincategoryDoc)).data();
        } catch (e) {
          console.log("err");
        }

        // data

        let item = {
          uid: ad_res.data().uid,
          title: ad_res.data().title,
          image: ad_res.data().images,
          city: ad_res.data().city,
          description: ad_res.data().description,
          price: ad_res.data().price,
          type: ad_res.data().type,
          client: user.data(),
          category: category.data(),
          Machincategory: Machincategory,
          createdAt: new Date(ad_res.data().createdAt).toLocaleDateString(
            "fr-FR"
          ),
          status: ad_res.data().status,
        };
        this.ads.push(item);
        console.log(this.ads);
        if (this.ads.length == ListSuv.length) {
          this.show = true;
        }
      });

      //   // get users de annonse
      //   adsList.forEach(async (e) => {
      //     // cleint
      //     const userDoc = doc(db, "users", e.client);
      //     const user = await getDoc(userDoc);
      //     // categore
      //     const categoryDoc = doc(db, "categories", e.category);
      //     const category = await getDoc(categoryDoc);
      //     // machin catigore
      //     try {
      //       const MachincategoryDoc = doc(
      //         db,
      //         "machine_categories",
      //         e.machineCategory
      //       );
      //       Machincategory = await (await getDoc(MachincategoryDoc)).data();
      //     } catch (e) {
      //       console.log("err");
      //     }

      //     // data

      //     let item = {
      //       uid: e.uid,
      //       title: e.title,
      //       image: e.images,
      //       city: e.city,
      //       description: e.description,
      //       price: e.price,
      //       type: e.type,
      //       client: user.data(),
      //       category: category.data(),
      //       Machincategory: Machincategory,
      //       createdAt: new Date(e.createdAt).toLocaleDateString("fr-FR"),
      //       status: e.status,
      //     };

      //     this.ads.push(item);
      //     console.log(this.ads.length);
      //   });
      //   if (adsList) {
      //     this.show = true;
      //   }
    },
  },

  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.getData(user.uid);
    } else {
      this.$router.push({ name: "login" });
    }
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
