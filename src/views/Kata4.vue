<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h1 class="mx-auto text-6xl font-extrabold text-indigo-600 text-center">
          Spark
        </h1>

        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p class="text-center">
          Already have an account?
          <router-link
            to="/auth/login"
            class="underline text-indigo-600 hover:text-indigo-400"
            >Login here</router-link
          >
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="submit">
        <div class="space-y-4">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="text"
              autocomplete="email"
              required
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              placeholder="Email address"
              v-model="email"
              @blur="emailTouched = true"
            />
            <p class="px-2 mt-1 text-xs text-red-600" v-if="emailError != ''">
              {{ emailError }}
            </p>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              placeholder="Password"
              v-model="password"
              @blur="passwordTouched = true"
            />
            <p
              class="px-2 mt-1 text-xs text-red-600"
              v-if="passwordError != ''"
            >
              {{ passwordError }}
            </p>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Heroicon name: solid/lock-closed -->
              <svg
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            Sign up
          </button>
          <p class="px-2 mt-1 text-xs text-red-600" v-if="submitError">
            {{ submitError }}
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default Vue.extend({
  data() {
    return {
      email: "",
      password: "",
      emailTouched: false,
      passwordTouched: false,
      submitError: "",
    };
  },
  computed: {
    emailError() {
      if (!this.emailTouched) return "";
      if (!emailRegex.test(this.email)) {
        console.log("Your current email is: " + this.email);
        return `'${this.email}' is not a valid email address. Please enter a valid email address.`;
      }
      return "";
    },
    passwordError() {
      if (!this.passwordTouched) return "";
      if (this.password.length < 12) {
        console.log("Your current password is: " + this.password);
        return "Please enter a password with at least 12 characters.";
      }
      return "";
    },
    entireFormIsValid() {
      return (
        this.passwordTouched == true &&
        this.emailTouched == true &&
        this.emailError == "" &&
        this.passwordError == ""
      );
    },
  },
  methods: {
    async submit() {
      if (!this.entireFormIsValid) return;
      console.log("Email:", this.email, "Password:", this.password);

      try {
        const response = await axios({
          method: "post",
          url: "http://gabriel.devhausleipzig.de:9011/api/user/registration",
          headers: {
            Authorization:
              "D_2vQNpsCVDqv1IZuRDvs9ElFBDTgXu4U81nlzHmzg2R-NodQrZokLhz",
            "Content-Type": "application/json",
          },
          data: {
            registration: {
              applicationId: "f970ca10-e9be-4ca5-b540-e24a4b7ba0f1",
            },
            user: {
              email: this.email,
              password: this.password,
            },
          },
        });
        console.log("Token", response.data.token);
        console.log("user", response.data.user);

        const payload = {
          user: response.data.user,
          token: response.data.token,
        };

        this.$store.commit("SET_USER_AND_TOKEN", payload);

        this.$router.push("/"); // this.$router.push({name: "Dashboard"})
      } catch (error) {
        console.error(error.data);
        this.submitError = "Oopsi, something went terribly wrong: " + error;
      }
    },
  },
});
</script>

<style scoped></style>
