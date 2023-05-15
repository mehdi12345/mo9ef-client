<template>
  <center v-if="!user">
    <div class="container">
      <form class="container-login" @submit.prevent="loginUser">
        <div>
          <h3>{{ $t("signup") }}</h3>

          <div class="social-container">
            <div @click="socialLogin('facebook')"><img src="../../assets/facebook.png" class="img" /></div>
            <div @click="socialLogin('google')"><img src="../../assets/google.png" class="img" /></div>
            <div><img src="../../assets/apple.png" class="img" /></div>
          </div>
          <input
            type="text"
            :placeholder="$t('name')"
            v-model="name"
            required
          />
          <br />
          <input
            type="email"
            :placeholder="$t('email')"
            v-model="email"
            required
          />
          <br />
          <input
            type="text"
            :placeholder="$t('phone')"
            v-model="phone"
            required
          />
          <br />
          <input
            type="password"
            :placeholder="$t('password')"
            v-model="password"
            required
          />
          <br />

          <!-- <button @click="loginUser()">Sign In</button> -->
          <button
            type="submit"
            class="but"
            style="width: 80%; background-color: #fbc009; color: #fff"
          >
            {{ $t("signup") }}
          </button>
          <br />
          <p>
            {{ $t("have_acc") }}
            <router-link to="/login" style="color: #fbc009; font-size: 18px"
              >{{ $t("signIn") }}
            </router-link>
          </p>
          <p>
            <router-link to="/"
              ><img
                src="../../assets/home.png"
                alt="home"
                width="24"
                height="24"
            /></router-link>
          </p>
        </div>
        <div
          class="alert alert-danger"
          role="alert"
          v-if="this.$store.state.errAuth"
        >
          {{ $t("error") }}
        </div>
      </form>
    </div>
  </center>
</template>

<script>
// import { useRoute, useRouter } from "vue-router";
// const route = useRoute();
// const router = useRouter();
export default {
  name: "LoginView",
  components: {},
  data() {
    return {
      user: localStorage.getItem("user"),
      email: "",
      password: "",
      phone: "",
      name: "",
      ValideEmail: false,
      ValiderPassword: false,
    };
  },
  methods: {
    
    async socialLogin(service) {
      console.log(service);
      if (service == "google") {
        await this.$store.dispatch("loginWithGoogle");
      } else if (service == "facebook") {
        await this.$store.dispatch("loginWithFacebook");
      } else {
        await this.$store.dispatch("loginWithApple");
      }
    },
    async loginUser() {
      let data = {
        email: this.email,
        password: this.password,
        phone: this.phone,
        name: this.name,
      };
      await this.$store.dispatch("register", data).catch((error) => {
        console.log("err", error);
      });
    },
  },
  mounted() {
    if (localStorage.getItem("user")) {
      console.log(localStorage.getItem("user"));
      this.$router.push({ name: "dashboard" });
    }
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@100;500&display=swap");

.img {
  width: 24px;
  height: 24px;
}
.logo {
  width: 98px;
  height: 98px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #fbc009;
  background-color: #e6c152;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  text-transform: uppercase;
  cursor: pointer;
  margin: 10px;
}

.but {
  border-radius: 20px;
  border: 1px solid #fbc009;
  background-color: #fff;
  color: #000;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  text-transform: uppercase;
  cursor: pointer;
  margin: 10px;
}

button:hover {
  transform: scale(1.05);
}

button.signup_btn {
  background-color: transparent;
  border-color: #ffffff;
}

input {
  background-color: #ededee;
  border: none;
  border-radius: 10px;
  outline: #e6c152;
  padding: 12px 15px;
  margin: 8px 0;
  width: 80%;
}

.container-login {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 1px 1px 1.5px rgb(221, 221, 221), 0em 0em 1em rgb(221, 221, 221);
  margin-top: 40px;
  width: 500px;
  max-width: 100%;
  min-height: 650px;
  max-height: 700px;
  padding: 10px;
}

.sign-in-container {
  left: 0;
  width: 50%;
}

.social-container {
  margin: 20px 0;
}

.social-container div {
  border: 1px solid #fbc009;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}
.social-container a:hover {
  transform: scale(1.08);
}
</style>
