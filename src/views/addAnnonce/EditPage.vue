<template>
  <main-view />
  <div v-if="rel">
    <br />
    <br /><br />
    <form class="container" @submit.prevent="validation">
      <div class="row">
        <div class="col-lg-2 col-md-1"></div>
        <div
          class="col-lg-8 col-md-10"
          style="
            border-radius: 20px;
            padding: 20px;
            box-shadow: 1px 1px 1.5px rgb(221, 221, 221),
              0em 0em 1em rgb(221, 221, 221);
          "
        >
          <div class="row">
            <div class="col-lg-6 col-md-12">
              <div class="row">
                <div class="col-lg-8">
                  <h5>{{ $t("category") }}</h5>
                </div>
              </div>
              <div :class="errCatigory ? 'err' : ''">
                <Select2
                  :placeholder="$t('choose_category')"
                  v-model="catigore"
                  :options="this.$store.state.Listcatigores"
                  :settings="{
                    width: 'resolve',
                  }"
                />
              </div>
            </div>
            <div class="col-lg-6 col-md-12">
              <div class="row">
                <div class="col-lg-8">
                  <h5>{{ $t("ville") }}</h5>
                </div>
              </div>
              <div :class="errVille ? 'err' : ''">
                <Select2
                  :placeholder="$t('choose_ville')"
                  v-model="city"
                  :options="citys"
                  :settings="{
                    settingOption: value,
                    settingOption: value,
                  }"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <!-- *************************************************************************************** -->

            <div
              class="col-lg-6 col-md-12"
              v-if="
                catigore == 'CBgR4EvCtyodV2EqLeKg' ||
                catigore == 'a3S74jwragQi3pUMwcte'
              "
            >
              <label for=""
                ><h5>{{ $t("machine_model") }}</h5></label
              >
              <input
                required
                type="text"
                class="inputText"
                :placeholder="$t('machine_model')"
                v-model="modelMachine"
              />
            </div>
            <div
              class="col-lg-6 col-md-12"
              v-if="
                catigore == 'CBgR4EvCtyodV2EqLeKg' ||
                catigore == 'a3S74jwragQi3pUMwcte'
              "
            >
              <h5>{{ $t("machine_category") }}</h5>

              <div :class="errMaciCat ? 'err' : ''">
                <Select2
                  :placeholder="$t('machine_category')"
                  v-model="Machine_categorie"
                  :options="this.$store.state.ListMachine_categories"
                  :settings="{
                    settingOption: value,
                    settingOption: value,
                  }"
                  @change="myChangeEvent($event)"
                  @select="mySelectEvent($event)"
                />
              </div>
            </div>

            <!-- *************************************************************************************** -->
            <div
              class="col-lg-6 col-md-12"
              v-if="catigore == 'rwAAHojffDZP9U4URtvN'"
            >
              <div class="row">
                <div class="col">
                  <div class="row">
                    <div class="col">
                      <h6>{{ $t("ville_de_depart") }}</h6>
                    </div>
                  </div>
                  <div :class="errVilleD ? 'err' : ''">
                    <Select2
                      :placeholder="$t('ville_de_depart')"
                      v-model="cityD"
                      :options="citys"
                      :settings="{
                        settingOption: value,
                        settingOption: value,
                      }"
                      @change="myChangeEvent($event)"
                      @select="mySelectEvent($event)"
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="row">
                    <div class="col">
                      <h6>{{ $t("ville_de_arrivee") }}</h6>
                    </div>
                  </div>
                  <div :class="errVilleA ? 'err' : ''">
                    <Select2
                      :placeholder="$t('ville_de_arrivee')"
                      v-model="cityA"
                      :options="citys"
                      :settings="{
                        settingOption: value,
                        settingOption: value,
                      }"
                      @change="myChangeEvent($event)"
                      @select="mySelectEvent($event)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- *************************************************************************************** -->

            <div class="col-lg-6 col-md-12">
              <label for=""
                ><h5>{{ $t("prix") }}</h5></label
              >
              <input
                required
                class="inputText"
                type="number"
                v-model="prix"
                :placeholder="$t('prix')"
              />
            </div>

            <div
              class="col-lg-6 col-md-12"
              v-if="catigore == 'rwAAHojffDZP9U4URtvN'"
            >
              <label for=""
                ><h5>{{ $t("longueur_machine") }}</h5></label
              >
              <input
                required
                class="inputText"
                type="number"
                v-model="longeur"
                :placeholder="$t('longueur_machine')"
              />
            </div>

            <div
              class="col-lg-6 col-md-12"
              v-if="catigore == 'CBgR4EvCtyodV2EqLeKg'"
            >
              <h5>{{ $t("type_of_annonce") }}</h5>

              <div :class="errType ? 'err' : ''">
                <Select2
                  theme="classic"
                  :placeholder="$t('type_of_annonce')"
                  v-model="type"
                  :options="ListType"
                  :settings="{
                    settingOption: value,
                    settingOption: value,
                  }"
                  @change="myChangeEvent($event)"
                  @select="mySelectEvent($event)"
                />
              </div>
            </div>

            <!-- *************************************************************************************** -->

            <!-- *************************************************************************************** -->

            <div
              class="col-lg-6 col-md-12"
              v-if="catigore != 'a3S74jwragQi3pUMwcte'"
            >
              <label for=""
                ><h6>{{ $t("weight") }}</h6></label
              >
              <input
                required
                class="inputText"
                type="number"
                v-model="poids"
                :placeholder="$t('weight')"
              />
            </div>

            <!-- *************************************************************************************** -->

            <div class="col-lg-6 col-md-12">
              <label for=""
                ><h5>{{ $t("name") }}</h5></label
              >
              <input
                required
                class="inputText"
                type="text"
                :placeholder="$t('name')"
                v-model="fullname"
              />
            </div>
            <div class="col-lg-6 col-md-12">
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

            <div
              class="col-lg-6 col-md-12"
              v-if="catigore == 'WHoFjiJf8T126Cy0F99n'"
            >
              <label for=""
                ><h5>{{ $t("litre") }}</h5></label
              >
              <input
                required
                class="inputText"
                type="number"
                v-model="litre"
                :placeholder="$t('litre')"
              />
            </div>

            <div class="col-lg-6 col-md-12">
              <label for=""
                ><h5>{{ $t("title") }}</h5></label
              >
              <input
                required
                class="inputText"
                type="text"
                v-model="titre"
                :placeholder="$t('title')"
              />
            </div>
            <div class="col-lg-6 col-md-12">
              <label for=""
                ><h5>{{ $t("description") }}</h5></label
              >
              <textarea
                required
                class="inputText"
                type="text"
                v-model="descreption"
                :placeholder="$t('description')"
              />
            </div>

            <!-- *************************************************************************************** -->
          </div>
          <br />
          <br />
          <br />
          <div class="col-lg-12 col-md-12">
            <center>
              <div
                class="row"
                style="
                  background-color: rgba(230, 230, 230, 0.6);
                  padding: 10px;
                  border-radius: 10px;
                "
                v-if="previewImage.length > 0"
              >
                <div
                  v-for="img in previewImage"
                  :key="img"
                  class="col-lg-3 col-md-4 col-sm-4"
                >
                  <div
                    style="
                      background-color: #fff;
                      padding: 8px;
                      border-radius: 10px;
                      margin: 4px;
                    "
                  >
                    <img
                      :src="img.img"
                      alt=""
                      style="width: 110px; height: 100px; object-fit: cover"
                    />
                    <button
                      style="
                        background-color: #fff;
                        border-radius: 10px;
                        border: none;
                      "
                      @click="removeImg(img)"
                    >
                      <img
                        src="../../assets/delete.png"
                        alt=""
                        width="24"
                        height="24"
                        style="object-fit: cover"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div class="image-margin" style="margin-top: 20px">
                <div :class="errImages ? 'err' : ''">
                  <label for="images-upload" class="images-upload">
                    <svg
                      class="custum-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none">
                        <path
                          d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1zm1 15a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8a1 1 0 1 1 2 0v3h3a1 1 0 1 1 0 2h-3v3z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                  </label>
                  <input
                    @input="pickFile"
                    id="images-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    ref="fileInput"
                  />
                </div>
              </div>
            </center>
          </div>
          <center>
            <div style="margin-top: 20px" class="col-lg-6 col-md-12">
              <button
                class="btn"
                style="
                  width: 68%;
                  background-color: rgb(255, 174, 0);
                  color: #fff;
                  font-size: 20px;
                "
                v-if="!send"
              >
                {{ $t("edit") }}
              </button>
              <div
                v-if="send"
                class="btn"
                style="
                  width: 68%;
                  background-color: rgb(255, 174, 0);
                  color: #fff;
                  font-size: 20px;
                "
              >
                <img
                  src="../../assets/loading-balls.svg"
                  alt=""
                  width="24"
                  height="24"
                />
              </div>
            </div>
          </center>
        </div>
      </div>
    </form>
    <app-store-component />
    <footer-component />
  </div>
</template>

<script>
import MainView from "../layouts/MainView.vue";
import Select2 from "vue3-select2-component";
import Listcitys from "../../assets/ma.json";

import FooterComponent from "@/components/FooterComponent.vue";
import AppStoreComponent from "@/components/AppStoreComponent.vue";

import { db, storage } from "../../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore/lite";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
export default {
  components: {
    MainView,
    Select2,
    FooterComponent,
    AppStoreComponent,
  },
  data() {
    return {
      errImages: false,
      rel: false,
      errVille: false,
      errCatigory: false,
      errVilleD: false,
      errVilleA: false,
      errType: false,
      errMaciCat: false,
      send: false,

      catigore: null,
      city: null,
      cityD: null,
      cityA: null,
      longeur: null,
      modelMachine: null,
      Machine_categorie: null,
      descreption: null,
      litre: null,
      titre: null,
      phone: JSON.parse(localStorage.getItem("user")).phone,
      fullname: JSON.parse(localStorage.getItem("user")).fullname,
      poids: null,
      prix: null,
      type: null,
      citys: Listcitys,
      previewImage: [],
      upImage: [],
      UrlImage: [],
      ListType: ["À vendre", "À louer"],
      ad: null,
    };
  },
  methods: {
    async validation() {
      if (this.city && this.catigore && this.previewImage.length > 0) {
        this.errImages = false;
        this.errVille = false;
        this.errCatigory = false;

        if (this.catigore == "CBgR4EvCtyodV2EqLeKg") {
          if (this.type && this.Machine_categorie) {
            this.errMaciCat = false;
            this.errType = false;
            this.send = true;

            // send data
            this.uploudImages();
          } else {
            if (this.type == null) {
              this.errType = true;
            } else {
              this.errType = false;
            }
            if (this.Machine_categorie == null) {
              this.errMaciCat = true;
            } else {
              this.errMaciCat = false;
            }
          }
        } else if (this.catigore == "a3S74jwragQi3pUMwcte") {
          if (this.Machine_categorie) {
            this.errMaciCat = false;
            this.send = true;
            // send data
            this.uploudImages();
          } else {
            if (this.Machine_categorie == null) {
              this.errMaciCat = true;
            } else {
              this.errMaciCat = false;
            }
          }
        } else if (this.catigore == "rwAAHojffDZP9U4URtvN") {
          if (this.cityD && this.cityA) {
            this.errVilleA = false;
            this.errVilleD = false;
            this.send = true;

            // send data
            this.uploudImages();
          } else {
            if (this.cityD == null) {
              this.errVilleD = true;
            } else {
              this.errVilleD = false;
            }
            if (this.cityA == null) {
              this.errVilleA = true;
            } else {
              this.errVilleA = false;
            }
          }
        } else {
          this.send = true;
          // send data
          this.uploudImages();
        }
      } else {
        if (this.previewImage.length == 0) {
          this.errImages = true;
        } else {
          this.errImages = false;
        }
        if (this.city == null) {
          this.errVille = true;
        } else {
          this.errVille = false;
        }
        if (this.catigore == null) {
          this.errCatigory = true;
        } else {
          this.errCatigory = false;
        }
      }
    },

    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      console.log("ok");
      let input = this.$refs.fileInput;
      let file = input.files;
      for (let i = 0; i < file.length; i++) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage.push({
            img: e.target.result,
            index: i,
            imUp: file[i],
          });
        };
        this.upImage.push(file[i]);
        reader.readAsDataURL(file[i]);
        this.$emit("input", file[i]);
      }
    },
    removeImg(img) {
      this.previewImage.splice(this.previewImage.indexOf(img), 1);
      console.log(img);
      const item = this.upImage[img.index];
      this.upImage.splice(this.upImage.indexOf(item), 1);
    },

    async uploudImages() {
      const imagesUrl = [];
      for (let i = 0; i < this.previewImage.length; i++) {
        if (this.previewImage[i].imUp != null) {
          const storageRef = ref(
            storage,
            `web/${this.previewImage[i].imUp.name + "-" + Date.now()}`
          );
          const uploadTask = uploadBytesResumable(
            storageRef,
            this.previewImage[i].imUp
          );

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
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log(downloadURL);
                imagesUrl[i] = downloadURL;
                if (imagesUrl.length == this.previewImage.length) {
                  console.log("images", imagesUrl);
                  this.createDocs(imagesUrl);
                }
              });
            }
          );
        } else {
          imagesUrl[i] = this.previewImage[i].img;
          if (imagesUrl.length == this.previewImage.length) {
            console.log("images", imagesUrl);
            this.createDocs(imagesUrl);
          }
        }

        console.log(i);
      }
    },
    async createDocs(imagesUrl) {
      let adsInfo = {
        uid: this.$route.params.uid,
        title: this.titre,
        description: this.descreption,
        thambnail: imagesUrl[0],
        weight: this.poids,
        images: imagesUrl,
        price: this.prix,
        city: this.city,
        category: this.catigore,
        make: this.modelMachine,
        departure: this.cityD,
        arrival: this.cityA,
        status: 1,
        litre: this.litre,
        client: JSON.parse(localStorage.getItem("user")).uid,
        createdAt: Date.now(),
        machineCategory: this.Machine_categorie,
        type: this.type,
        length: this.longeur,
      };
      console.log(adsInfo);
      const adDoc = doc(db, "ads", this.$route.params.uid);
      await updateDoc(adDoc, adsInfo).then(async () => {
        const userDoc = doc(
          db,
          "users",
          JSON.parse(localStorage.getItem("user")).uid
        );
        await updateDoc(userDoc, {
          phone: this.phone,
          fullname: this.fullname,
        }).then(() => {
          location.reload();
        });
      });
    },

    async getData() {
      console.log(this.$route.params.uid);

      // ad
      const adDoc = doc(db, "ads", this.$route.params.uid);
      const ad = await (await getDoc(adDoc)).data();

      // cleint
      const userDoc = doc(db, "users", ad.client);
      const user = await getDoc(userDoc);
      // categore
      const categoryDoc = doc(db, "categories", ad.category);
      const category = await getDoc(categoryDoc);
      // machin catigore

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
        Machincategory: ad.machineCategory,
        createdAt: new Date(ad.createdAt).toLocaleDateString("fr-FR"),
        status: ad.status,
        length: ad.length,
        make: ad.make,
        weight: ad.weight,
        litre: ad.litre,
      };
      console.log(item);

      console.log(ad.machineCategory);
      this.ad = item;

      this.catigore = category.data().uid;
      this.city = item.city;
      this.cityD = ad.departure;
      this.cityA = ad.arrival;
      this.longeur = item.length;
      this.modelMachine = item.make;
      this.Machine_categorie = ad.machineCategory;
      this.descreption = item.description;
      this.litre = item.litre;
      this.titre = item.title;
      this.phone = item.client.phone;
      this.fullname = item.client.fullname;
      this.poids = item.weight;
      this.prix = item.price;
      this.type = item.type;
      this.UrlImage = item.images;
      console.log(ad);
      for (let i = 0; i < ad.images.length; i++) {
        this.previewImage.push({
          img: ad.images[i],
          index: i,
          imUp: null,
        });
      }
    },
  },
  mounted() {
    this.getData();
    setTimeout(() => {
      this.rel = true;
    }, 100);
  },
};
</script>

<style>
.err {
  border-style: solid;
  border-color: red;
  border-radius: 10px;
  border-width: 1px;
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
.select2-container--default
  .select2-selection--single
  .select2-selection__arrow
  b {
  margin-top: 8px;
}
.select2-container--default .select2-selection--single {
  background-color: #fff;
  border: none;
  border-radius: 8px;
}
.inputText:focus {
  border: 1px solid rgb(238, 196, 106);
  background-color: rgba(230, 230, 230, 0.6);
}
.bt {
  background-color: rgb(240, 236, 236);
  border: none;
  width: 100%;
  height: 48px !important;
}
.vs__dropdown-toggle {
  padding: 8px 0 10px !important;
  align-items: center !important;
}
.select2-container .select2-selection--single {
  height: 48px !important;
  padding: 8px 0 10px !important;
  background-color: rgba(230, 230, 230, 0.6);
}
.images-upload {
  background-color: #ffffff !important;
  border-radius: 5px !important;
  border: 1px dashed #ccc !important;
  display: inline-block !important;
  cursor: pointer !important;
  width: 165px !important;
  height: 88px !important;
}
.images-upload:hover {
  background-color: #f1f1f1 !important;
}
.image-container {
  display: inline-table !important;
  height: 90px !important;
  width: 140px !important;
  display: flex !important;
}
.images-preview {
  border-radius: 5px !important;
  border: 1px solid rgba(230, 230, 230, 0.6) !important;
  display: inline-block !important;
  width: 140px !important;
  height: 88px !important;
  padding-top: -14px !important;
  transition: filter 0.1s linear;
}
.images-preview:hover {
  filter: brightness(90%);
}
.button-container {
  display: inline-flex !important;
  height: 90px !important;
  width: 140px !important;
  margin-right: 0.25rem !important;
  margin-left: 0.25rem !important;
}
.close-btn {
  background: none !important;
  color: white !important;
  border: none !important;
  padding: 0px !important;
  margin: 0px !important;
  font: inherit !important;
  cursor: pointer !important;
  outline: inherit !important;
  position: relative !important;
  right: 34px !important;
  top: -27px !important;
  width: 0px !important;
}
.times-icon {
  font-size: 3rem !important;
  padding: 0px !important;
  margin: 0px !important;
  filter: drop-shadow(0px 0px 1px black);
}
.custum-icon {
  color: #00afca !important;
  font-size: 3rem !important;
  margin-top: 24px !important;
}
.custum-icon:hover {
  color: #29818f !important;
}
</style>
