<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h1 class="mx-auto text-6xl font-extrabold text-indigo-600 text-center">
          Some math questions
        </h1>

        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          All levels
        </h2>
        <Loadingspinner v-if="isLoading" />
        <p
          class="text-center"
          v-for="(result, index) in trivia.results"
          :key="index"
        >
          {{ result.question }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  data() {
    return {
      trivia: [],
      isLoading: false,
    };
  },
  async mounted() {
    {
      try {
        this.loading = true;
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=10&category=19"
        );
        this.trivia = response.data;
        console.log(this.trivia);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  },
});
</script>

<style scoped></style>
