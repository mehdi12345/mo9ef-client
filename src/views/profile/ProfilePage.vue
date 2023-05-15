<template>
  <layouts home="active" add="" contact="" favorte="" />

  <loding-component v-if="!show" />
  <div class="container" v-if="user && show">
    <div class="row" style="margin-top: 50px">
      <div class="col-lg-3 col-md-6">
        <center>
          <label for="images-upload" class="images-upload">
            <img
              :src="previewImage"
              alt="img"
              width="100"
              height="100"
              style="border-radius: 50px"
            />
          </label>
          <input
            @input="pickFile"
            id="images-upload"
            type="file"
            accept="image/*"
            hidden
            ref="fileInput"
          />
          <!-- <div class="portfolio-overlay">
                  <a
                    class="btn btn-square btn-outline-light mx-1"
                    :href="item.image[0]"
                    data-lightbox="portfolio"
                    ><i class="fa fa-eye"></i
                  ></a>
                </div> -->
          <br />
          <br />

          <h5>{{ user.fullname }}</h5>
          <h5>{{ user.email }}</h5>
          <h5>{{ user.phole }}</h5>
          <div class="row">
            <div class="col-5">
              <button
                class="btn"
                style="width: 100%; border-color: #fbc609; color: #fbc609"
                @click="valueChoix = false"
              >
                {{ $t("parametres") }}
              </button>
            </div>
            <div class="col">
              <button
                class="btn"
                style="
                  width: 100%;
                  background-color: #fbc609;
                  color: #fff;
                  font-size: 14px;
                "
                @click="valueChoix = true"
              >
                {{ $t("modifier_profile") }}
              </button>
            </div>
          </div>
        </center>
        <form
          style="padding: 10px"
          v-if="valueChoix"
          @submit.prevent="EditUser"
        >
          <div>
            <label for=""
              ><h5>{{ $t("name") }}</h5></label
            >
            <input
              required
              class="inputText"
              type="text"
              v-model="nom"
              :placeholder="$t('name')"
            />
          </div>
          <div>
            <label for=""
              ><h5>{{ $t("email") }}</h5></label
            >
            <input
              required
              class="inputText"
              type="email"
              v-model="email"
              :placeholder="$t('email')"
            />
          </div>
          <div>
            <label for=""
              ><h5>{{ $t("phone") }}</h5></label
            >
            <input
              required
              class="inputText"
              type="text"
              v-model="phone"
              :placeholder="$t('phone')"
            />
          </div>
          <div class="col">
            <button
              class="btn"
              style="width: 100%; background-color: #fbc609; color: #fff"
            >
              {{ $t("edit") }}
            </button>
          </div>
        </form>

        <div v-if="!valueChoix" style="padding: 10px">
          <div style="margin-top: 30px">
            <h5>{{ $t("language") }}</h5>

            <div>
              <Select2
                :placeholder="$t('language')"
                v-model="type"
                :options="langueList"
                @change="myChangeEvent($event)"
                @select="mySelectEvent($event)"
              />
            </div>
            <button
              class="d-flex justify-content-between"
              style="
                margin-top: 20px;
                margin-left: 0px;
                width: 100%;
                border: 2px solid rgba(0, 0, 0, 0);
                outline: none;
                background-color: rgba(230, 230, 230, 0.6);
                padding: 0.5rem 1rem;
                color: red;
                border-radius: 8px;
              "
              @click="LogOut()"
            >
              <div>{{ $t("logout") }}</div>
              <img
                src="../../assets/log-out.png"
                alt="icon"
                width="24"
                height="24"
              />
            </button>
            <!-- <div
              class="d-flex justify-content-between"
              style="
                margin-top: 20px;
                margin-left: 0px;
                width: 100%;
                border: 2px solid rgba(0, 0, 0, 0);
                outline: none;
                background-color: rgba(230, 230, 230, 0.6);
                padding: 0.5rem 1rem;
                color: red;
                border-radius: 8px;
              "
            >
              <div>Delete Accunt</div>
              <div>
                <img
                  src="../../assets/delete.png"
                  alt="icon"
                  width="24"
                  height="24"
                />
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <div class="col-lg-9 col-md-6">
        <div v-if="ads.length > 0" style="margin-top: 20px">
          <div class="row g-4">
            <div
              v-for="item in ads"
              v-bind:key="item"
              class="col-lg-6 col-md-12 item"
            >
              <!-- //portfolio-item -->
              <div class="col">
                <div
                  class="position-relative overflow-hidden"
                  style="margin-top: 10px"
                  @click="detail(item)"
                >
                  <img
                    class="img-fluid w-100"
                    :src="item.image[0]"
                    alt=""
                    style="
                      width: 100%;
                      height: 200px;

                      border-radius: 30px;
                    "
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
                  <p style="">
                    {{ item.title }}
                  </p>
                  <div class="row d-flex align-items-center">
                    <div class="col">
                      <h5 class="lh-base mb-0">{{ item.price }} DH</h5>
                    </div>
                    <div class="d-flex align-items-center col">
                      <div class="col">
                        <button
                          class="btn py-2 px-4 ms-3"
                          style="
                            background-color: rgb(252, 210, 72);
                            color: #fff;
                            width: 80%;
                            border-radius: 10px;
                          "
                          @click="update(item)"
                        >
                          update
                        </button>
                      </div>
                      <div class="col">
                        <button
                          class="btn py-2 px-4 ms-3"
                          style="
                            background-color: red;
                            color: #fff;
                            width: 80%;
                            border-radius: 10px;
                          "
                          @click="deleteAds(item)"
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="ads.length == 0">
          <vide-component />
        </div>
      </div>
    </div>
  </div>
  <footer-component />
</template>

<script>
import { db, auth, storage } from "../../firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore/lite";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { signOut } from "firebase/auth";
import Select2 from "vue3-select2-component";
import "vue-select/dist/vue-select.css";

import layouts from "@/views/layouts/MainView.vue";
import VideComponent from "@/components/VidComponent.vue";
import LodingComponent from "@/components/LodingComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
export default {
  components: {  
    layouts,VideComponent, Select2, LodingComponent,FooterComponent },
  data() {
    return {
      user: null,
      ads: [],
      nom: "",
      email: "",
      phone: "",
      show: false,
      previewImage: "",
      valueChoix: false,
      langueList: [
        { text: "Français", id: "fr" },
        { text: "العربية", id: "ar" },
      ],
    };
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      console.log(file[0]);
      this.uploudImage(file[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file[0]);
      this.$emit("input", file[0]);
    },

    async uploudImage(file) {
      console.log("ok");
      const storageRef = ref(
        storage,
        `web-profile/${file.name + "-" + Date.now()}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // setProgresspercent(progress);
          console.log(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            this.previewImage = downloadURL;

            console.log("edit Image");
            const userDoc = doc(
              db,
              "users",
              JSON.parse(localStorage.getItem("user")).uid
            );
            await updateDoc(userDoc, {
              imageUrl: downloadURL,
            }).then(async () => {
              const userDoc = doc(
                db,
                "users",
                JSON.parse(localStorage.getItem("user")).uid
              );
              await getDoc(userDoc).then((res) => {
                console.log(res.data());
                localStorage.removeItem("user");
                localStorage.setItem("user", JSON.stringify(res.data()));
              });

              // // JSON.parse(localStorage.removeItem("user"));
              // JSON.parse(localStorage.setItem("user", user));
            });
          });
        }
      );
    },

    myChangeEvent(e) {
      console.log("============================", e);
    },
    mySelectEvent(e) {
      console.log("=====>", e.id);
      localStorage.setItem("lang", e.id);
      location.reload();
    },
    LogOut() {
      signOut(auth)
        .then(() => {
          localStorage.removeItem("user");
          location.reload();
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },
    async EditUser() {
      console.log("edit");
      const userDoc = doc(
        db,
        "users",
        JSON.parse(localStorage.getItem("user")).uid
      );
      await updateDoc(userDoc, {
        phone: this.phone,
        fullname: this.nom,
        email: this.email,
      }).then(async () => {
        const userDoc = doc(
          db,
          "users",
          JSON.parse(localStorage.getItem("user")).uid
        );
        await getDoc(userDoc).then((res) => {
          console.log(res.data());
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(res.data()));
          location.reload();
        });

        // // JSON.parse(localStorage.removeItem("user"));
        // JSON.parse(localStorage.setItem("user", user));
      });
    },
    async deleteAds(item) {
      await deleteDoc(doc(db, "ads", item.uid)).then(() => {
        location.reload();
      });
    },
    update(item) {
      this.$router.push({
        name: "edit-ad",
        params: { uid: item.uid },
      });
    },

    detail() {},

    async getData(uid) {
      let Machincategory;
      const ads = query(
        collection(db, "ads"),
        // where("status", "==", 1),
        where("client", "==", uid)
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
        if (adsList.length == this.ads.length) {
          this.show = true;
        }
      });
      if (adsList.length == this.ads.length) {
        this.show = true;
      }
    },
  },

  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("user"));

    if (userInfo) {
      this.user = userInfo;
      this.nom = userInfo.fullname;
      this.email = userInfo.email;
      this.phone = userInfo.phone;
      this.previewImage = userInfo.imageUrl;

      this.getData(userInfo.uid);
    } else {
      this.$router.push({ name: "login" });
    }
  },
};
</script>

<style>
.select2-container .select2-selection--single {
  height: 48px !important;
  /* width: 100%; */
  padding: 8px 0 10px !important;
  background-color: rgba(230, 230, 230, 0.6);
}
.select2-container--default
  .select2-selection--single
  .select2-selection__arrow
  b {
  margin-top: 8px;
}
.select2-container--default .select2-selection--single {
  background-color: rgba(230, 230, 230, 0.6);
  border: none;
  border-radius: 8px;
}
.item {
  border-radius: 20px;
  height: 360px;
  width: 400px;
  margin: 8px;
  box-shadow: 1px 1px 1.5px rgb(221, 221, 221), 0em 0em 1em rgb(221, 221, 221);
}
.inputText:focus {
  border: 1px solid rgb(238, 196, 106);
  background-color: rgba(230, 230, 230, 0.6);
}
.inputText {
  width: 100%;
  border: 2px solid rgba(0, 0, 0, 0);
  outline: none;
  background-color: rgba(230, 230, 230, 0.6);
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  margin-bottom: 22px;
  transition: 0.3s;
  border-radius: 8px;
}

.inputText:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
