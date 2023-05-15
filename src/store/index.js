import { createStore } from "vuex";
import { db, auth } from "../firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  // OAuthProvider,
  // sendPasswordResetEmail,
  // onAuthStateChanged,
  // updatePassword,
} from "firebase/auth";

import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  setDoc,
  where,
} from "firebase/firestore/lite";

export default createStore({
  state: {
    loading: false,
    equipments: [],
    transport: [],
    soldMachines: [],
    rentedMachines: [],
    huilles: [],
    ads: [],
    categories: [],
    machine_categories: [],
    resultaFindByCategore: [],
    detileItem: {},
    errAuth: false,
    user: {},
    Listcatigores: [],
    sharchData: [],
    ListMachine_categories: [],
  },
  getters: {},
  mutations: {
    addAllAds(
      state,
      { ListAds, equipments, transport, huilles, soldMachines, rentedMachines }
    ) {
      console.log("equipments", equipments);
      console.log("transport", transport);
      console.log("huilles", huilles);
      console.log("soldMachines", soldMachines);
      console.log("rentedMachines", rentedMachines);

      state.equipments.push(equipments);
      state.transport.push(transport);
      state.huilles.push(huilles);
      state.soldMachines.push(soldMachines);
      state.rentedMachines.push(rentedMachines);
      state.ads.push(ListAds);
    },
    addAllCategories(state, categoriesList) {
      state.categories.push(categoriesList);
    },
    VideUser(state) {
      state.user = null;
    },
    addAllmachine_categories(state, machine_categories) {
      state.machine_categories.push(machine_categories);
    },
    Chamge_Loding(state, type) {
      state.loading = type;
    },
  },
  actions: {
    // ==================================================================================

    async getAds() {
      let ListAds = [];
      let equipments = [];
      let transport = [];
      let soldMachines = [];
      let rentedMachines = [];
      let huilles = [];
      let Machincategory;
      // const ads = collection(db, "ads").where("state", "==", 1);
      const ads = query(collection(db, "ads"), where("status", "==", 1));
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
        ListAds.push(item);
        // equipments
        if (item.category.uid == "a3S74jwragQi3pUMwcte") {
          equipments.push(item);
        }
        // transport
        if (item.category.uid == "rwAAHojffDZP9U4URtvN") {
          transport.push(item);
        }
        // huilles
        if (item.category.uid == "WHoFjiJf8T126Cy0F99n") {
          huilles.push(item);
        }

        // atuer
        if (item.category.uid == "CBgR4EvCtyodV2EqLeKg") {
          if (e.type == "À vendre") {
            soldMachines.push(item);
          }
          if (e.type == "À louer") {
            rentedMachines.push(item);
          }
        }
      });
      this.commit("addAllAds", {
        ListAds,
        equipments,
        transport,
        huilles,
        soldMachines,
        rentedMachines,
      });
    },
    // ==================================================================================
    async getCatigores() {
      const categories = collection(db, "categories");
      // const categories = query(collection(db, "categories"), where("status", "==", 1));
      const categoriesSnapshot = await getDocs(categories);
      const categoriesList = categoriesSnapshot.docs.map((doc) => doc.data());
      this.commit("addAllCategories", categoriesList);
      categoriesList.map((e) => {
        this.state.Listcatigores.push({ id: e.uid, text: e.name });
        console.log(this.state.Listcatigores);
      });
    },
    // ==================================================================================
    async getMachine_categories() {
      const machine_categories = collection(db, "machine_categories");
      // const machine_categories = query(collection(db, "machine_categories"), where("status", "==", 1));
      const machine_categoriesSnapshot = await getDocs(machine_categories);
      const machine_categoriesList = machine_categoriesSnapshot.docs.map(
        (doc) => doc.data()
      );
      this.commit("addAllmachine_categories", machine_categoriesList);
      machine_categoriesList.map((e) => {
        this.state.ListMachine_categories.push({ id: e.uid, text: e.name });
        console.log(this.state.ListMachine_categories);
      });
    },

    // ==================================================================================
    async setLoading({ commit }, type) {
      commit("Chamge_Loding", type);
    },
    // ==================================================================================

    // ==================================================================================
    async findByCategore({ state }, uid) {
      state.resultaFindByCategore = [];
      let ListAds = [];
      let Machincategory;
      const ads = query(
        collection(db, "ads"),
        where("status", "==", 1),
        where("machineCategory", "==", uid)
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
        ListAds.push(item);
      });

      state.resultaFindByCategore.push(ListAds);
    },
    // ==================================================================================
    async voirPlus({ state }, ads) {
      state.resultaFindByCategore = [];
      state.resultaFindByCategore.push(ads);
    },
    // ==================================================================================
    async detail({ state }, ad) {
      state.detileItem = null;
      state.detileItem = ad;
    },
    // ==================================================================================

    // async findbyId({ state }, uid) {
    //   state.resultaFindByCategore = [];
    //   state.resultaFindByCategore.push(ads);
    // },
    // ==================================================================================

    // ==================================================================================
    async login({ state }, data) {
      await signInWithEmailAndPassword(auth, data.email, data.password)
        .then(async (res) => {
          const userDoc = doc(db, "users", res.user.uid);
          const user = await getDoc(userDoc);

          if (user.exists()) {
            localStorage.setItem("user", JSON.stringify(user.data()));
            console.log(user.data());
            state.user = user.data();
            location.reload();
          } else {
            console.log("count sup");
            state.errAuth = true;
            setTimeout(() => {
              state.errAuth = false;
            }, 2000);
          }
        })
        .catch((e) => {
          console.log(e);
          state.errAuth = true;
          setTimeout(() => {
            state.errAuth = false;
          }, 2000);
        });
    },
    // =======================================loginWithGoogle===========================================
    async loginWithGoogle({ state }) {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider)
        .then(async (res) => {
          const userDoc = doc(db, "users", res.user.uid);
          const user = await getDoc(userDoc);

          if (user.exists()) {
            localStorage.setItem("user", JSON.stringify(user.data()));
            console.log(user.data());
            state.user = user.data();
            location.reload();
          } else {
            console.log(res.user.email);
            console.log(res.user.displayName);
            console.log(res.user.uid);
            console.log(res.user.phoneNumber);

            await setDoc(doc(db, "users", res.user.uid), {
              fullname: res.user.displayName,
              uid: res.user.uid,
              email: res.user.email,
              imageUrl:
                "https://firebasestorage.googleapis.com/v0/b/mo9ef/o/avatar.png?alt=media&token=4fe982e6-37b4-4fe7-b036-d5dfa11f56a3",
              phone: res.user.phoneNumber,
            });

            const userDoc = doc(db, "users", res.user.uid);
            const user = await getDoc(userDoc);
            console.log(user)
            localStorage.setItem("user", JSON.stringify(user.data()));
            console.log(user.data());
            state.user = user.data();
            location.reload();
          }
        })
        .catch((e) => {
          console.log(e);
          state.errAuth = true;
          setTimeout(() => {
            state.errAuth = false;
          }, 2000);
        });
    },
    // =======================================loginWithFacebook===========================================
    async loginWithFacebook() {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider).then(async (res) => {
        console.log(res);
      });
    },
    // =======================================loginWithApple===========================================
    async loginWithApple() {},
    // =======================================loginWithApple===========================================

    async register({ state }, data) {
      await createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (res) => {
          await setDoc(doc(db, "users", res.user.uid), {
            fullname: data.name,
            uid: res.user.uid,
            email: data.email,
            imageUrl:
              "https://firebasestorage.googleapis.com/v0/b/mo9ef/o/avatar.png?alt=media&token=4fe982e6-37b4-4fe7-b036-d5dfa11f56a3",
            phone: data.phone,
          });

          const userDoc = doc(db, "users", res.user.uid);
          const user = await getDoc(userDoc);

          if (user.exists()) {
            localStorage.setItem("user", JSON.stringify(user.data()));
            console.log(user.data());
            state.user = user.data();
            location.reload();
          } else {
            console.log("count sup");
            state.errAuth = true;
            setTimeout(() => {
              state.errAuth = false;
            }, 2000);
          }
        })
        .catch((e) => {
          console.log(e);
          state.errAuth = true;
          setTimeout(() => {
            state.errAuth = false;
          }, 2000);
        });
    },
    // =======================================getdata cherch===========================================
  },
  modules: {},
});

{
  /* <button
                  @click="addToFavoret(item.uid)"
                  class="btn"
                  style="
                    background-color: #fff;
                    color: #fbc609;
                    border-color: #fbc609;
                    width: 16%;
                    border-radius: 10px;
                    margin: 6px;
                    position: absolute;
                    top: 10px;
                    left: 18px;
                  "
                >
                  <span class="material-symbols-outlined"> favorite </span>
                </button>




async addToFavoret(uid) {
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user.uid, uid);

  
  const coll = collection(db, "users", user.uid, "savedAds");
  await addDoc(coll, {
    uid: uid,
  });
}, */
}
