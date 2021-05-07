<template>
  <div class="px-4 py-6 max-w-screen-sm mx-auto">
    <form @submit.prevent="submit">
      <input
        type="text"
        id="wikiSearch"
        name="wikiSearch"
        autocomplete="wikiSearch"
        required
        class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
        placeholder="Type in your wiki search"
        v-model="wikisearch"
      />
      <button type="submit">submit</button>
    </form>
    <Loadingspinner v-if="loading" />
    <div v-if="!loading">{{ wikiPage }}</div>
  </div>
</template>

<script>
import Vue from "vue";
import wiki from "wikipedia";
import Loadingspinner from "../components/Loadingspinner.vue";

export default Vue.extend({
  name: "Notes",
  data() {
    return {
      wikiPage: [],
      wikisearch: "",
      loading: false,
    };
  },
  methods: {
    async submit() {
      try {
        this.loading = true;
        const page = await wiki.summary(this.wikisearch);
        this.wikiPage = page;
        console.log(this.wikiPage);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }

      // this.$router.push(this.page.cannonicalurl);
    },
  },
  components: {
    Loadingspinner,
  },
});
</script>

<style scoped>
</style>