<template>
  <div class="px-lg-5 container" style="padding-top: 50px">
    <div class="row g-5 align-items-center">
      <div class="col-lg-8 text-center text-lg-center">
        <h1 class="mb-4 animated slideInDown">
          {{ $t("dawland_app") }}
        </h1>
        <p class="pb-3 animated slideInDown">
          {{ $t("desc_app") }}
        </p>
        <a
          href="https://apps.apple.com/sn/app/mo9ef-ma/id1627483484"
          class="btn"
          style="
            box-shadow: 1px 1px 1.5px rgb(221, 221, 221),
              0em 0em 1em rgb(221, 221, 221);
            margin: 20px;
          "
        >
          <img
            src="../assets/app-store.svg"
            alt=""
            style="width: 200px; height: 50px"
          />
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.tingisweb.moqefapp1"
          class="btn"
          style="
            box-shadow: 1px 1px 1.5px rgb(221, 221, 221),
              0em 0em 1em rgb(221, 221, 221);
          "
        >
          <img
            src="../assets/google-play.svg"
            alt=""
            style="width: 200px; height: 50px"
          />
        </a>
      </div>
      <div class="col-lg-4 text-center text-lg-start">
        <img
          class="img-fluid animated zoomIn"
          src="../assets/appIcon.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
