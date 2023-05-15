import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/auth/RegisterPage.vue"),
    },
    {
      path: "/",
      name: "dashboard",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/resultat/:name",
      name: "Resultat",
      component: () => import("../views/find/ResultatView.vue"),
      props: true,
    },
    {
      path: "/detail/:uid",
      name: "Detail",
      component: () => import("../views/details/DetailPage.vue"),
      props: true,
    },
    {
      path: "/favourites",
      name: "Favourite",
      component: () => import("../views/favourites/FavouritePage.vue"),
    },
    {
      path: "/add-annonce",
      name: "add-annonce",
      component: () => import("../views/addAnnonce/AddPage.vue"),
    },
    {
      path: "/sherch/:category",
      name: "sherch",
      component: () => import("../views/find/SherchPage.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/profile/ProfilePage.vue"),
    },
    {
      path: "/annonces-page/:uid",
      name: "annonces-page",
      component: () => import("../views/profile/AnnoncesPage.vue"),
    },
    {
      path: "/edit-ad/:uid",
      name: "edit-ad",
      component: () => import("../views/addAnnonce/EditPage.vue"),
      props: true,
    },
  ],
});

export default router;
