<template>
  <div class="">
    <div class="row">
      <!-- <div class="col-lg-1">
        <img :src="image" alt="" style="width: 24px; height: 24px" />
      </div> -->
      <div>
        <h4>{{ label }}</h4>
      </div>
    </div>
    <div>
      <Select2
        :placeholder="label"
        v-model="city"
        :options="option"
        :settings="{ settingOption: value, settingOption: value }"
        @change="myChangeCity($event)"
        @select="mySelectCity($event)"
      />
    </div>
  </div>
</template>

<script>
import Select2 from "vue3-select2-component";

export default {
  props: {
    image: String,
    option: Array,
    label: String,
  },
  components: {
    Select2,
  },
};
</script>

<style></style>
