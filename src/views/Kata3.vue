<template>
  <div class="flex-col justify-center">
    <!--     <div>{{ $route.params }}</div>
    <div>{{ $route.name }}</div>
    <div>{{ $route.fullPath }}</div> -->
    <Loadingspinner v-if="loading" />
    <div v-if="!loading">
      <div class="my-6 p-4">
        <div class="border-solid border-t-2 border-b-2 border-gray-800">
          <div class="flex justify-between">
            <span class="text-gray-600">#{{ note.collection }}</span>
          </div>
          <div
            class="text-xl border-b-1 border-solid border-gray-400 font-bold text-center"
          >
            {{ note.title }}
          </div>
          <p>{{ note.content }}</p>
          <div class="flex justify-end text-gray-600">
            {{ new Date(note.createdAt).toLocaleDateString() }}
          </div>
        </div>
        <router-link
          to="/notes"
          class="text-indigo-600 underline hover:text-indigo-400"
          >Back to notes overview</router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import Loadingspinner from "../components/Loadingspinner.vue";

export default Vue.extend({
  name: "Note",
  data() {
    return {
      note: {},
      loading: false,
    };
  },
  async mounted() {
    try {
      this.loading = true;
      const id = this.$route.params.id;
      const getNote = await axios.get(`http://localhost:3000/notes/${id}`);
      this.note = getNote.data;
      console.log(this.note);
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  },
  components: {
    Loadingspinner,
  },
});
</script>

<style scoped>
</style>