<template>
  <main-view />
  <center>
    <div v-if="!showD" class="carousel-item active align-self-center">
      <loding />
    </div>
    <div v-if="showD && ad">
      <div class="container text-center" style="box-shadow: rgb(221, 221, 221) 1px 1px 1.5px, rgb(221, 221, 221) 0em 0em 1em;">
        <div class="row tobPage" v-if="showD && ad">
          <div class="sliderDitaile col-lg-8 col-md-12 col-sm-12">
            <carousel v-model="currentSlide" :wrap-around="true">
              <slide v-for="item in ad.image" :key="item">
                <img
                  :src="item"
                  alt=""
                  style="width: 90%; height: 380px; border-radius: 20px"
                />
                <button
                  v-if="user"
                  @click="addToFavoret(ad.uid)"
                  class="btn"
                  style="
                    width: 10%;
                    border-radius: 10px;
                    margin: 6px;
                    position: absolute;
                    top: 8px;
                    right: 50px;
                  "
                >
                  <img
                    v-if="!isFavoret"
                    src="../../assets/sa1.png"
                    alt="img"
                    width="44"
                    height="44"
                  />
                  <img
                    v-if="isFavoret"
                    src="../../assets/sa2.png"
                    alt="img"
                    width="38"
                    height="38"
                  />
                </button>
              </slide>
              <template #addons>
                <Navigation />
                <Pagination />
              </template>
            </carousel>
          </div>
          <div class="col">
            <div class="">
              <div class="team-item rounded">
                <div class="text-center border-bottom p-4">
                  <img
                    class="img-fluid rounded-circle mb-4"
                    :src="ad.client.imageUrl"
                    alt=""
                    style="width: 68px; height: 68px"
                  />
                  <router-link :to="'/annonces-page/'+ad.client.uid" style="color: black;text-decoration: none; font-size: 18px"
              >   <h5>{{ ad.client.fullname }}</h5>
            </router-link>
                  <a :href="'tel:'+ad.client.phone">
                    <div class="btn btn-primary mx-2" style="color:white;background-color: #f60;border:1px solid #f60">
                    {{ad.client.phone}}
                  </div></a>
                  <a :href="'https://wa.me/+212'+ad.client.phone" target="_blank">
                    <div class="btn btn-primary" style="color:white;background-color: #2ca67a;border:1px solid #2ca67a">
                    Whatsapp
                  </div>
                </a>
                  
                  <!-- <span>{{ ad.client.phone }} </span><br /> -->
                  <span>{{ ad.client.email }} </span>
                </div>
                <div class="text-center border-bottom p-4">
                  <h5>Description</h5>
                  <span>{{ ad.description }}</span>
                </div>
              </div>
            </div>

            <div class="team-item rounded">
              <div class="text-center border-bottom p-4">
                <img
                  class="img-fluid rounded-circle mb-4"
                  src="img/team-3.jpg"
                  alt=""
                />
                <h5>{{ ad.city }}</h5>
                <span>{{ ad.type }}</span>
              </div>
              <div class="d-flex justify-content-center p-4">
                <h5>{{ ad.price }} DH</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <app-store-component />
      <footer-component />
    </div>
  </center>
</template>
<script>
import loding from "@/components/LodingComponent.vue";

import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { db } from "../../firebase";
import {
  getDoc,
  doc,
  getDocs,
  addDoc,
  where,
  query,
  collection,
  deleteDoc,
} from "firebase/firestore/lite";
import "vue3-carousel/dist/carousel.css";
import AppStoreComponent from "@/components/AppStoreComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import MainView from "../layouts/MainView.vue";
export default {
  components: {
    loding,
    Carousel,
    Slide,
    Pagination,
    Navigation,
    AppStoreComponent,
    FooterComponent,
    MainView,
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      showD: false,
      currentSlide: null,
      ad: null,
      user: null,
      isFavoret: null,
    };
  },
  methods: {
    async addToFavoret(uid) {
      if (JSON.parse(localStorage.getItem("user"))) {
        const col = query(
          collection(
            db,
            "users",
            JSON.parse(localStorage.getItem("user")).uid,
            "savedAds"
          ),
          where("uid", "==", this.$route.params.uid)
        );
        const Snapshot = await getDocs(col);
        const ListSuv = Snapshot.docs.map((doc) => doc.data());

        if (ListSuv.length >= 1) {
          Snapshot.docs.forEach(async (e) => {
            await deleteDoc(
              doc(
                db,
                "users",
                JSON.parse(localStorage.getItem("user")).uid,
                "savedAds",
                e.id
              )
            ).then(() => {
              this.isFavoret = false;
            });
          });
        } else {
          const coll = collection(
            db,
            "users",
            JSON.parse(localStorage.getItem("user")).uid,
            "savedAds"
          );
          await addDoc(coll, {
            uid: uid,
          }).then(() => {
            this.isFavoret = true;
          });
        }
      }
    },

    slideTo(val) {
      this.currentSlide = val;
    },

    async getData() {
      let Machincategory;
      const adDoc = doc(db, "ads", this.$route.params.uid);
      const ad = await (await getDoc(adDoc)).data();
      // cleint
      const userDoc = doc(db, "users", ad.client);
      const user = await getDoc(userDoc);
      // categore
      const categoryDoc = doc(db, "categories", ad.category);
      const category = await getDoc(categoryDoc);
      // machin catigore
      try {
        const MachincategoryDoc = doc(
          db,
          "machine_categories",
          ad.machineCategory
        );
        Machincategory = await (await getDoc(MachincategoryDoc)).data();
      } catch (e) {
        console.log("err");
      }

      if (JSON.parse(localStorage.getItem("user"))) {
        const col = query(
          collection(
            db,
            "users",
            JSON.parse(localStorage.getItem("user")).uid,
            "savedAds"
          ),
          where("uid", "==", this.$route.params.uid)
        );
        const Snapshot = await getDocs(col);
        const ListSuv = Snapshot.docs.map((doc) => doc.data());

        console.log("data de favoret", ListSuv.length);
        if (ListSuv.length >= 1) {
          this.isFavoret = true;
        } else {
          this.isFavoret = false;
        }
      }

      // data

      let item = {
        uid: ad.uid,
        title: ad.title,
        image: ad.images,
        city: ad.city,
        description: ad.description,
        price: ad.price,
        type: ad.type,
        client: user.data(),
        category: category.data(),
        Machincategory: Machincategory,
        createdAt: new Date(ad.createdAt).toLocaleDateString("fr-FR"),
        status: ad.status,
      };
      console.log("===========================", item);
      this.ad = item;
      this.showD = true;

      // this.ads.push(item);
      // console.log(this.ads.length);
      // if (adsList.length == this.ads.length) {
      //   this.show = true;
      // }

      // if (adsList.length == this.ads.length) {
      //   this.show = true;
      // }
    },
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
    };
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.user = user;
    }
    this.getData();
  },
};
</script>

<style>
.sliderDitaile {
  background-color: #fff;
  padding: 20px;
  width: 800px;
  height: 60;
  border-radius: 30px;
  /* box-shadow: 1px 1px rgb(221, 221, 221), -0.1em -0.1em 0.1em rgb(221, 221, 221); */
}
.tobPage {
  margin-top: 3em;
}
</style>
