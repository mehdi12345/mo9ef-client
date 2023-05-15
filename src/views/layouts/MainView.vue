<script>
export default {
  name: "MainView",
  props: {
    home: String,
    favorte: String,
    add: String,
    contact: String,
  },
  components: {},
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    };
  },

  methods: {},
};
</script>

<template>
  <div class="container position-relative p-0">
    <nav class="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
      <router-link to="/" class="navbar-brand p-0">
        <div style="background-color: #fff; border-radius: 2000px">
          <img
            class="img-fluid animated zoomIn"
            src="../../assets/logo.png"
            alt=""
            style="width: 58px; height: 58px"
          />
        </div>
        <!-- <img src="img/logo.png" alt="Logo"> -->
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span class="fa fa-bars"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav mx-auto py-0">
          <router-link to="/" :class="`nav-item nav-link ${home}`">{{
            $t("home")
          }}</router-link>
          <router-link
            :class="`nav-item nav-link ${favorte}`"
            to="/favourites"
            >{{ $t("saved_ads") }}</router-link
          >

          <router-link :class="`nav-item nav-link ${add}`" to="/add-annonce">{{
            $t("add_ad")
          }}</router-link>
          <!-- <a href="" :class="`nav-item nav-link ${home}`">Service</a>
          <a href="" :class="`nav-item nav-link ${home}`">Project</a>
          <div class="nav-item dropdown">
            <a
              href=""
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              >Pages</a
            >
            <div class="dropdown-menu m-0">
              <a href="" class="dropdown-item">Our Team</a>
              <a href="" class="dropdown-item">Testimonial</a>
              <a href="" class="dropdown-item">404 Page</a>
            </div> -->
          <!-- </div> -->
          <!-- <a href="" :class="`nav-item nav-link ${contact}`">Contact</a> -->
        </div>
        <router-link
          v-if="!user"
          to="/register"
          class="btn nav-item nav-link rounded-pill py-2 px-4 ms-3 d-lg-block"
          >{{ $t("signup") }}</router-link
        >
        <router-link
          v-if="!user"
          to="/login"
          class="btn nav-item nav-link rounded-pill py-2 px-4 ms-3 d-lg-block"
          >{{ $t("login") }}</router-link
        >
        <router-link v-if="user" to="/profile" class="nav-item">
          <div>
            <img
              :src="user.imageUrl"
              alt="imgPro"
              width="48"
              height="48"
              style="border-radius: 24px"
            />
          </div>
        </router-link>
      </div>
    </nav>
  </div>
</template>
