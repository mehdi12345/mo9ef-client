<template>
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
          width: 360px;
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

    <div class="row d-flex align-items-center bg-light p-4">
      <div class="col">
        <p style="">
          {{ item.title }}
        </p>

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
            @click="deleteAds()"
          >
            delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Array,
  },
  methods: {
    detail(item) {
      console.log(item);
    },
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
