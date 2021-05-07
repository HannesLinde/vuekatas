<template>
  <div class="px-4 py-6 max-w-screen-sm mx-auto">
    <Loadingspinner v-if="loading" />
    <div v-if="!loading">
      <div v-for="note in notes" :key="note.id" class="bg-indigo-300 my-4 p-4">
        <router-link :to="'/notes/' + note.id" class="block">
          <div class="flex justify-between">
            <div
              class="text-xl border-b-1 border-solid border-gray-400 font-bold text-center"
            >
              {{ note.title }}
            </div>

            <span class="text-gray-600">#{{ note.collection }}</span>
          </div>
          <div class="flex justify-start text-gray-600">
            <span>{{ new Date(note.createdAt).toLocaleDateString() }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import Loadingspinner from "../components/Loadingspinner.vue";

export default Vue.extend({
  name: "Notes",
  data() {
    return {
      notes: [],
      loading: false,
    };
  },
  async mounted() {
    try {
      this.loading = true;
      const getNotes = await axios("http://localhost:3000/notes");
      this.notes = getNotes.data;
      console.log(this.notes);
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