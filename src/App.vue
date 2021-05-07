<template>
  <div id="app">
    <div class="grid grid-cols-3">
      <div></div>
      <div class="flex justify-center space-x-4">
        <router-link to="/" class="hover:text-green-600 hover:underline"
          >Dashboard</router-link
        >
        <router-link to="/notes" class="hover:text-green-600 hover:underline"
          >Notes</router-link
        >
      </div>
      <div class="flex justify-end">
        <router-link
          to="/auth/login"
          class="font-bold text-indigo-600 hover:underline hover:text-indigo-400"
          >Login</router-link
        >
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss"></style>
