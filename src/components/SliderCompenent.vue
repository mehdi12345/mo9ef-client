<template>
  <div class="container" style="padding-bottom: 80px;">
    <div class="container px-lg-5">
      <div class="row g-5 align-items-center">
        <div class="col-lg-8 text-center text-lg-start">
          <h1 class="mb-4 animated slideInDown">
            {{ $t("bienvenu") }}
          </h1>
          <p class="pb-3 animated slideInDown">
            {{ $t("desc_app_footer") }}
          </p>
        </div>
        <div class="col-lg-4 text-center text-lg-start">
          <div style="background-color: #fff; border-radius: 2000px">
            <img
              class="img-fluid animated zoomIn"
              src="../assets/logo.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div class="container col-12" style="padding-top: 30px">
      <div class="filterForma row align-items-center">
        <div class="col">
          <div class="row">
            <div class="col-lg-1">
              <img
                src="../assets/icons/loupe.png"
                alt=""
                style="width: 24px; height: 24px"
              />
            </div>
            <div class="col-lg-8">
              <h5> {{ $t("category") }}</h5>
            </div>
          </div>
          <div>
            <Select2
              theme="classic"
              :placeholder="$t('category')"
              v-model="catigore"
              :options="this.$store.state.Listcatigores"
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
            <div class="col-lg-1">
              <img
                src="../assets/icons/placeholder.png"
                alt=""
                style="width: 24px; height: 24px"
              />
            </div>
            <div class="col-lg-5">
              <h5> {{ $t("ville") }}</h5>
            </div>
          </div>

          <div>
            <Select2
              :placeholder="$t('ville')"
              v-model="city"
              :options="listcitys"
              :settings="{ settingOption: value, settingOption: value }"
              @change="myChangeCity($event)"
              @select="mySelectCity($event)"
            />
          </div>
        </div>
        <div class="col">
          <div class="row">
            <div class="col-lg-1">
              <!-- <img
                src="../assets/icons/placeholder.png"
                alt=""
                style="width: 24px; height: 24px"
              /> -->
            </div>
            <div class="col">
              <h5>{{ $t("type_of_annonce") }}</h5>
            </div>
          </div>

          <div>
            <Select2
              :placeholder="$t('type_of_annonce')"
              v-model="type"
              :options="myOptions"
              :settings="{ settingOption: value, settingOption: value }"
              @change="myChangeCity($event)"
              @select="mySelectCity($event)"
            />
          </div>
        </div>
        <div class="col">
          <div class="row">
            <div class="col-lg-1">
              <!-- <img
                src="../assets/icons/placeholder.png"
                alt=""
                style="width: 24px; height: 24px"
              /> -->
            </div>
            <div class="col">
              <h5>Machine</h5>
            </div>
          </div>

          <div>
            <Select2
              placeholder="Machine categorie"
              v-model="machine_categorie"
              :options="this.$store.state.ListMachine_categories"
              :settings="{ settingOption: value, settingOption: value }"
              @change="myChangeCity($event)"
              @select="mySelectCity($event)"
            />
          </div>
        </div>
        <div class="col text-center text-lg-center mt-4">
          <router-link
            :to="`sherch/${catigore}?city=${city}&type=${type}&machine=${machine_categorie}`"
            class="btn py-2 px-4 ms-3"
            style="
              background-color: #fbc609;
              color: #000;
              width: 80%;
              margin-top: 10px;
            "
          >
            {{ $t("chercher") }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="select2/dist/css/select2.min.css"></style>
//
<style src="select2-bootstrap-theme/dist/select2-bootstrap.min.css"></style>
<script>
import Select2 from "vue3-select2-component";
import Listcitys from "../assets/ma.json";

export default {
  // declare Select2Component
  components: { Select2 },
  data() {
    return {
      listcitys: Listcitys,
      catigore: null,
      city: null,
      type: null,
      machine_categorie: null,
      myOptions: ["À vendre", "À louer"], // or [{id: key, text: value}, {id: key, text: value}]
    };
  },
  methods: {
    myChangeEvent(val) {
      console.log(val);
    },
    mySelectEvent({ id, text }) {
      console.log({ id, text });
    },
    myChangeCity(val) {
      console.log(val);
    },
    mySelectCity({ id, text }) {
      console.log({ id, text });
    },
  },
};
</script>

<style>
.filterForma {
  background-color: white;
  border-radius: 20px;
  border-color: rgb(255, 174, 0);
  border-width: 1px;
  border-style: solid;
  padding: 20px;
}
.select2-container--default
  .select2-selection--single
  .select2-selection__arrow
  b {
  margin-top: 2px;
}
.select2-container--default .select2-selection--single {
  background-color: #fff;
  border: none;
  border-radius: 8px;
}
.select2-container .select2-selection--single {
  height: 38px !important;
  padding: 4px 0 8px !important;
  background-color: rgba(230, 230, 230, 0.6);
}
</style>
