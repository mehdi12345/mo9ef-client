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
            <br />
            <br />
  
            <h5>{{ user.fullname }}</h5>
            <h5>{{ user.email }}</h5>
            <h5>{{ user.phole }}</h5>
          </center>
        </div>
        <div class="col-lg-9 col-md-6">
          <div v-if="ads.length > 0" style="margin-top: 20px">
            <div class="row g-4">
              <!-- <div
                v-for="item in ads"
                v-bind:key="item"
                class="col-lg-6 col-md-12 item"
              >
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
                  </div>
                  <div style="padding: 16px">
                    <p style="">
                      {{ item.title }}
                    </p>
                    <div class="row d-flex align-items-center">
                      <div class="col">
                        <h5 class="lh-base mb-0">{{ item.price }} DH</h5>
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div> -->
              <div class="row">
              <slide v-for="item in ads" :key="item" class="col-lg-6 col-md-12" >
      <div style="padding: 10px;">
        <div class="containerItem" style="box-shadow: rgb(221, 221, 221) 1px 1px 1.5px, rgb(221, 221, 221) 0em 0em 1em;border-radius: 20px;">
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
  import { db, storage } from "../../firebase";
  import {
    collection,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    query,
    where,
  } from "firebase/firestore/lite";
  import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
  
  import "vue-select/dist/vue-select.css";
  
  import layouts from "@/views/layouts/MainView.vue";
  import VideComponent from "@/components/VidComponent.vue";
  import LodingComponent from "@/components/LodingComponent.vue";
  import FooterComponent from "@/components/FooterComponent.vue";
  export default {
    components: {  
      layouts,VideComponent, LodingComponent,FooterComponent },
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
      async detail(item) {
      await this.$store.dispatch("detail", item);
      this.$router.push({ name: "Detail", params: { uid: item.uid } });
    },
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
  
  
      async getData() {
        let Machincategory;
        const user = query(
          collection(db, "users"),
          where("uid", "==", this.$route.params.uid)
        );
        const adsSnapshot1 = await getDocs(user);
        const adsList1 = adsSnapshot1.docs.map((doc) => doc.data());
    if (adsList1) {
      
      adsList1.forEach(async (e) => {
        this.user=e;
        this.nom = e.fullname;
      this.email = e.email;
      this.phone = e.phone;
      this.previewImage = e.imageUrl;
      });
    }
        const ads = query(
          collection(db, "ads"),
          where("status", "==", 1),
          where("client", "==", this.$route.params.uid)
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
        this.getData();
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
  